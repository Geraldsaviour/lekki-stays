const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Apartment = require('../models/Apartment');
const AvailabilityChecker = require('../utils/availability');
const WhatsAppNotifier = require('../utils/whatsapp');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
const xss = require('xss');

// Admin authentication middleware
function requireAdmin(req, res, next) {
  const adminKey = req.query.admin;
  const expectedKey = process.env.ADMIN_KEY;
  
  if (!adminKey || adminKey !== expectedKey) {
    return res.status(403).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Access Denied</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: #0a0a0a; color: #F5F0E8;
            font-family: 'DM Sans', sans-serif;
            min-height: 100vh; display: flex;
            align-items: center; justify-content: center;
            padding: 20px;
          }
          .card {
            background: #111;
            border: 1px solid #E53935;
            border-radius: 16px;
            padding: 48px 40px;
            max-width: 420px;
            width: 100%;
            text-align: center;
          }
          .icon { font-size: 52px; margin-bottom: 16px; }
          h1 { color: #E53935; font-size: 28px; margin-bottom: 12px; }
          p { color: #888; font-size: 15px; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">🔒</div>
          <h1>Access Denied</h1>
          <p>You do not have permission to perform this action.</p>
          <p style="margin-top: 12px; font-size: 13px;">
            This link is only accessible by the property administrator.
          </p>
        </div>
      </body>
      </html>
    `);
  }
  
  next();
}

// Rate limiting for booking creation
const bookingRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 booking attempts per windowMs
  message: {
    success: false,
    error: 'Too many booking attempts. Please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Input sanitization middleware
const sanitizeBookingInput = (req, res, next) => {
  if (req.body) {
    // Sanitize string inputs to prevent XSS
    if (req.body.guestName) {
      req.body.guestName = xss(req.body.guestName.trim());
    }
    if (req.body.guestEmail) {
      req.body.guestEmail = validator.normalizeEmail(req.body.guestEmail) || req.body.guestEmail;
    }
    if (req.body.guestPhone) {
      req.body.guestPhone = req.body.guestPhone.replace(/[^\d+\-\s()]/g, '');
    }
    
    // Ensure numeric fields are properly typed
    if (req.body.numGuests) {
      req.body.numGuests = parseInt(req.body.numGuests, 10);
    }
    if (req.body.totalPrice) {
      req.body.totalPrice = parseFloat(req.body.totalPrice);
    }
    if (req.body.apartmentId) {
      req.body.apartmentId = parseInt(req.body.apartmentId, 10);
    }
  }
  next();
};

// Enhanced validation function
const validateBookingData = (bookingData) => {
  const errors = [];
  
  // Enhanced name validation
  if (!bookingData.guestName || bookingData.guestName.trim().length < 2) {
    errors.push('Guest name must be at least 2 characters long');
  } else if (bookingData.guestName.length > 100) {
    errors.push('Guest name must be less than 100 characters');
  } else if (!/^[a-zA-Z\s\-'\.]+$/.test(bookingData.guestName)) {
    errors.push('Guest name contains invalid characters');
  }
  
  // Enhanced email validation
  if (!bookingData.guestEmail) {
    errors.push('Email address is required');
  } else if (!validator.isEmail(bookingData.guestEmail)) {
    errors.push('Valid email address is required');
  } else if (bookingData.guestEmail.length > 254) {
    errors.push('Email address is too long');
  }
  
  // Enhanced phone validation
  if (!bookingData.guestPhone) {
    errors.push('Phone number is required');
  } else {
    const cleanPhone = bookingData.guestPhone.replace(/\s+/g, '');
    if (!Booking.isValidPhone(cleanPhone)) {
      errors.push('Valid Nigerian phone number is required (+234XXXXXXXXXX or 0XXXXXXXXXX)');
    }
  }
  
  // Enhanced date validation
  if (!bookingData.checkIn || !validator.isISO8601(bookingData.checkIn)) {
    errors.push('Valid check-in date is required (ISO 8601 format)');
  }
  
  if (!bookingData.checkOut || !validator.isISO8601(bookingData.checkOut)) {
    errors.push('Valid check-out date is required (ISO 8601 format)');
  }
  
  // Date range validation
  if (bookingData.checkIn && bookingData.checkOut) {
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      errors.push('Check-in date cannot be in the past');
    }
    
    if (checkOutDate <= checkInDate) {
      errors.push('Check-out date must be after check-in date');
    }
    
    // Maximum stay validation (e.g., 30 days)
    const maxStayDays = 30;
    const stayDuration = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    if (stayDuration > maxStayDays) {
      errors.push(`Maximum stay duration is ${maxStayDays} days`);
    }
    
    // Minimum stay validation (e.g., 1 night)
    if (stayDuration < 1) {
      errors.push('Minimum stay is 1 night');
    }
  }
  
  // Guest count validation
  if (!Number.isInteger(bookingData.numGuests) || bookingData.numGuests < 1) {
    errors.push('Number of guests must be at least 1');
  } else if (bookingData.numGuests > 20) {
    errors.push('Maximum 20 guests allowed');
  }
  
  // Price validation
  if (!Number.isFinite(bookingData.totalPrice) || bookingData.totalPrice <= 0) {
    errors.push('Total price must be a positive number');
  } else if (bookingData.totalPrice > 10000000) { // 10M Naira max
    errors.push('Total price exceeds maximum allowed amount');
  }
  
  // Apartment ID validation
  if (!Number.isInteger(bookingData.apartmentId) || bookingData.apartmentId < 1) {
    errors.push('Valid apartment ID is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

// Generate unique booking reference with collision detection
const generateUniqueBookingId = () => {
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    const id = Booking.generateBookingId();
    
    // Check if ID already exists
    const existingBooking = Booking.getById(id);
    if (!existingBooking) {
      return id;
    }
    
    attempts++;
  }
  
  throw new Error('Failed to generate unique booking ID after multiple attempts');
};

// Helper function to trigger notifications
const triggerNotification = (endpoint, data) => {
  // In a real application, you might use a queue system like Redis or RabbitMQ
  // For now, we'll just log the notification trigger
  console.log(`📱 Notification triggered: ${endpoint}`, data);
};

// POST /api/bookings - Create new booking with enhanced security
router.post('/', bookingRateLimit, sanitizeBookingInput, async (req, res) => {
  try {
    const bookingData = req.body;
    
    console.log('📝 Booking request received:', bookingData);
    
    // Enhanced validation
    const validation = validateBookingData(bookingData);
    if (!validation.isValid) {
      console.warn('❌ Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors
      });
    }
    
    // Check if apartment exists
    const apartment = await Apartment.getById(bookingData.apartmentId);
    if (!apartment) {
      console.warn(`❌ Apartment not found: ${bookingData.apartmentId}`);
      return res.status(404).json({
        success: false,
        error: 'Apartment not found'
      });
    }
    
    console.log(`✅ Apartment found: ${apartment.name}`);
    
    // Check guest capacity
    if (bookingData.numGuests > apartment.maxGuests) {
      console.warn(`❌ Guest capacity exceeded: ${bookingData.numGuests} > ${apartment.maxGuests}`);
      return res.status(400).json({
        success: false,
        error: `Maximum ${apartment.maxGuests} guests allowed for this property`
      });
    }
    
    // Check availability with race condition protection and atomic booking
    const bookingResult = await AvailabilityChecker.checkAndBook(
      bookingData.apartmentId,
      bookingData.checkIn,
      bookingData.checkOut,
      async () => {
        // This callback executes only if availability is confirmed and locked
        
        // Calculate and validate pricing with tolerance for floating point precision
        const pricing = apartment.calculatePricing(bookingData.checkIn, bookingData.checkOut);
        const priceTolerance = 1; // Allow 1 Naira difference for floating point precision
        
        if (Math.abs(bookingData.totalPrice - pricing.total) > priceTolerance) {
          throw new Error(`Price mismatch detected. Expected: ${pricing.total}, Provided: ${bookingData.totalPrice}`);
        }
        
        // Generate unique booking ID with collision detection
        const bookingId = generateUniqueBookingId();
        
        console.log(`🔄 Creating booking with ID: ${bookingId}`);
        
        // Create booking with atomic operation
        const newBooking = await Booking.create({
          id: bookingId,
          apartmentId: bookingData.apartmentId,
          guestName: bookingData.guestName,
          guestPhone: bookingData.guestPhone,
          guestEmail: bookingData.guestEmail,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          numGuests: bookingData.numGuests,
          totalPrice: pricing.total, // Use calculated price for security
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        
        if (!newBooking) {
          throw new Error('Failed to create booking - returned null');
        }
        
        console.log(`✅ Booking created successfully: ${newBooking.id}`);
        return newBooking;
      }
    );
    
    if (!bookingResult.success) {
      console.warn('❌ Booking availability check failed:', bookingResult.error);
      return res.status(409).json({
        success: false,
        error: bookingResult.error,
        conflicts: bookingResult.conflicts || []
      });
    }
    
    const booking = bookingResult.booking;
    
    if (!booking) {
      console.error('❌ Booking object is null after creation');
      return res.status(500).json({
        success: false,
        error: 'Failed to create booking',
        message: 'Booking creation returned null'
      });
    }
    
    // Send WhatsApp notification to host
    const whatsappLink = WhatsAppNotifier.generateHostNotification(booking, apartment);
    
    // Trigger notification
    triggerNotification('booking-created', { 
      bookingId: booking.id,
      apartmentId: booking.apartmentId,
      guestName: booking.guestName,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut
    });
    
    // Log successful booking creation for audit
    console.log(`✅ Booking created: ${booking.id} for apartment ${apartment.id} by ${booking.guestName}`);
    
    res.status(201).json({
      success: true,
      booking: booking.toPublicJSON(),
      whatsappLink: whatsappLink,
      message: 'Booking created successfully. Host will be notified via WhatsApp.'
    });
    
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    console.error('Stack trace:', error.stack);
    
    // Don't expose internal error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    res.status(500).json({
      success: false,
      error: 'Failed to create booking',
      message: isDevelopment ? error.message : 'An internal error occurred. Please try again.'
    });
  }
});

// GET /api/bookings/:id - Get booking details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.getById(id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    // Get apartment details
    const apartment = await Apartment.getById(booking.apartmentId);
    
    res.json({
      success: true,
      booking: booking.toJSON(),
      apartment: apartment ? apartment.toJSON() : null
    });
    
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch booking',
      message: error.message
    });
  }
});

// PUT /api/bookings/:id/status - Update booking status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, token } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }
    
    const booking = await Booking.getById(id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    // Verify token for security
    if (token && booking.token !== token) {
      return res.status(403).json({
        success: false,
        error: 'Invalid token'
      });
    }
    
    // Validate status transition
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'paid'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }
    
    // Update booking status
    const success = await booking.updateStatus(status);
    
    if (!success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to update booking status'
      });
    }
    
    // Trigger appropriate notifications based on status
    switch (status) {
      case 'confirmed':
        triggerNotification('booking-confirmed', { bookingId: booking.id });
        break;
      case 'cancelled':
        triggerNotification('booking-cancelled', { bookingId: booking.id });
        break;
      case 'paid':
        triggerNotification('payment-confirmed', { bookingId: booking.id });
        break;
    }
    
    res.json({
      success: true,
      booking: booking.toJSON(),
      message: `Booking status updated to ${status}`
    });
    
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update booking status',
      message: error.message
    });
  }
});

// GET /api/bookings/:id/confirm - Host confirmation endpoint
router.get('/:id/confirm', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).send(`
        <html>
          <head><title>Invalid Request</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Invalid Request</h1>
            <p>Missing authentication token.</p>
          </body>
        </html>
      `);
    }
    
    const booking = Booking.getById(id);
    
    if (!booking) {
      return res.status(404).send(`
        <html>
          <head><title>Booking Not Found</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Booking Not Found</h1>
            <p>The booking you're looking for doesn't exist.</p>
          </body>
        </html>
      `);
    }
    
    if (booking.token !== token) {
      return res.status(403).send(`
        <html>
          <head><title>Access Denied</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Access Denied</h1>
            <p>Invalid authentication token.</p>
          </body>
        </html>
      `);
    }
    
    // Check current status
    if (booking.status === 'confirmed') {
      return res.send(`
        <html>
          <head><title>Already Confirmed</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Booking Already Confirmed</h1>
            <p>Booking #${booking.id} is already confirmed.</p>
          </body>
        </html>
      `);
    }
    
    if (booking.status === 'cancelled') {
      return res.send(`
        <html>
          <head><title>Booking Cancelled</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Booking Was Cancelled</h1>
            <p>This booking was already declined.</p>
          </body>
        </html>
      `);
    }
    
    // Confirm booking
    booking.updateStatus('confirmed');
    
    // Get apartment details
    const apartment = Apartment.getById(booking.apartmentId);
    
    // Generate guest payment WhatsApp link
    const guestPaymentLink = WhatsAppNotifier.generateGuestPaymentLink(booking, apartment);
    
    // Trigger notification
    triggerNotification('booking-confirmed', { bookingId: booking.id });
    
    // Return confirmation page
    res.send(WhatsAppNotifier.generateConfirmationPage(booking, apartment, guestPaymentLink));
    
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).send(`
      <html>
        <head><title>Error</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1>Error</h1>
          <p>An error occurred while processing your request.</p>
        </body>
      </html>
    `);
  }
});

// GET /api/bookings/:id/decline - Host decline endpoint
router.get('/:id/decline', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).send(`
        <html>
          <head><title>Invalid Request</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Invalid Request</h1>
            <p>Missing authentication token.</p>
          </body>
        </html>
      `);
    }
    
    const booking = Booking.getById(id);
    
    if (!booking) {
      return res.status(404).send(`
        <html>
          <head><title>Booking Not Found</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Booking Not Found</h1>
            <p>The booking you're looking for doesn't exist.</p>
          </body>
        </html>
      `);
    }
    
    if (booking.token !== token) {
      return res.status(403).send(`
        <html>
          <head><title>Access Denied</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Access Denied</h1>
            <p>Invalid authentication token.</p>
          </body>
        </html>
      `);
    }
    
    // Check current status
    if (booking.status === 'cancelled') {
      return res.send(`
        <html>
          <head><title>Already Declined</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Already Declined</h1>
            <p>This booking was already declined.</p>
          </body>
        </html>
      `);
    }
    
    // Decline booking
    booking.updateStatus('cancelled');
    
    // Get apartment details
    const apartment = Apartment.getById(booking.apartmentId);
    
    // Generate guest decline WhatsApp link
    const guestDeclineLink = WhatsAppNotifier.generateGuestDeclineLink(booking, apartment);
    
    // Trigger notification
    triggerNotification('booking-declined', { bookingId: booking.id });
    
    // Return decline page
    res.send(WhatsAppNotifier.generateDeclinePage(booking, apartment, guestDeclineLink));
    
  } catch (error) {
    console.error('Error declining booking:', error);
    res.status(500).send(`
      <html>
        <head><title>Error</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1>Error</h1>
          <p>An error occurred while processing your request.</p>
        </body>
      </html>
    `);
  }
});

// GET /api/bookings/:id/cancel - Admin cancellation endpoint (host only)
router.get('/:id/cancel', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).send(`
        <html>
          <head><title>Invalid Request</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Invalid Request</h1>
            <p>Missing authentication token.</p>
          </body>
        </html>
      `);
    }
    
    const booking = Booking.getById(id);
    
    if (!booking) {
      return res.status(404).send(`
        <html>
          <head><title>Booking Not Found</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Booking Not Found</h1>
            <p>The booking you're looking for doesn't exist.</p>
          </body>
        </html>
      `);
    }
    
    if (booking.token !== token) {
      return res.status(403).send(`
        <html>
          <head><title>Access Denied</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Access Denied</h1>
            <p>Invalid authentication token.</p>
          </body>
        </html>
      `);
    }
    
    // Check current status
    if (booking.status === 'cancelled') {
      return res.send(`
        <html>
          <head><title>Already Cancelled</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Already Cancelled</h1>
            <p>This booking was already cancelled.</p>
          </body>
        </html>
      `);
    }
    
    if (booking.status === 'paid') {
      const hostWhatsApp = `https://wa.me/${process.env.HOST_WHATSAPP_NUMBER}`;
      return res.send(`
        <html>
          <head><title>Paid Booking</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Paid Booking</h1>
            <p>This booking has been paid. Please contact us on WhatsApp for cancellation.</p>
            <a href="${hostWhatsApp}" target="_blank" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #25D366; color: white; text-decoration: none; border-radius: 5px;">Contact Us on WhatsApp</a>
          </body>
        </html>
      `);
    }
    
    // Calculate refund eligibility
    const refundEligible = booking.isRefundable();
    const refundAmount = booking.getRefundAmount();
    
    // Cancel booking
    booking.updateStatus('cancelled');
    
    // Get apartment details
    const apartment = Apartment.getById(booking.apartmentId);
    
    // Generate host cancellation alert and guest contact links
    const hostCancellationAlert = WhatsAppNotifier.generateHostCancellationAlert(booking, apartment, refundEligible);
    const guestContactLink = WhatsAppNotifier.generateGuestCancelConfirmLink(booking);
    
    // Trigger notification
    triggerNotification('booking-cancelled', { bookingId: booking.id });
    
    // Return cancellation page
    res.send(WhatsAppNotifier.generateCancellationPage(booking, apartment, refundEligible, refundAmount, guestContactLink, hostCancellationAlert));
    
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).send(`
      <html>
        <head><title>Error</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1>Error</h1>
          <p>An error occurred while processing your request.</p>
        </body>
      </html>
    `);
  }
});

// GET /api/bookings/:id/guest-cancel - Guest self-cancellation endpoint (no admin key required)
router.get('/:id/guest-cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).send(`
        <html>
          <head><title>Invalid Request</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Invalid Request</h1>
            <p>Missing authentication token.</p>
          </body>
        </html>
      `);
    }
    
    const booking = Booking.getById(id);
    
    if (!booking) {
      return res.status(404).send(`
        <html>
          <head><title>Booking Not Found</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Booking Not Found</h1>
            <p>The booking you're looking for doesn't exist.</p>
          </body>
        </html>
      `);
    }
    
    if (booking.token !== token) {
      return res.status(403).send(`
        <html>
          <head><title>Access Denied</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Access Denied</h1>
            <p>Invalid authentication token.</p>
          </body>
        </html>
      `);
    }
    
    // Check current status
    if (booking.status === 'cancelled') {
      return res.send(`
        <html>
          <head><title>Already Cancelled</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Already Cancelled</h1>
            <p>This booking was already cancelled.</p>
          </body>
        </html>
      `);
    }
    
    if (booking.status === 'paid') {
      const hostWhatsApp = `https://wa.me/${process.env.HOST_WHATSAPP_NUMBER}`;
      return res.send(`
        <html>
          <head><title>Paid Booking</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Paid Booking</h1>
            <p>This booking has been paid. Please contact us on WhatsApp for cancellation.</p>
            <a href="${hostWhatsApp}" target="_blank" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #25D366; color: white; text-decoration: none; border-radius: 5px;">Contact Us on WhatsApp</a>
          </body>
        </html>
      `);
    }
    
    // Calculate refund eligibility
    const refundEligible = booking.isRefundable();
    const refundAmount = booking.getRefundAmount();
    
    // Cancel booking
    booking.updateStatus('cancelled');
    
    // Get apartment details
    const apartment = Apartment.getById(booking.apartmentId);
    
    // Generate host cancellation alert and guest contact links
    const hostCancellationAlert = WhatsAppNotifier.generateHostCancellationAlert(booking, apartment, refundEligible);
    const guestContactLink = WhatsAppNotifier.generateGuestCancelConfirmLink(booking);
    
    // Trigger notification
    triggerNotification('booking-cancelled', { bookingId: booking.id });
    
    // Return cancellation page
    res.send(WhatsAppNotifier.generateCancellationPage(booking, apartment, refundEligible, refundAmount, guestContactLink, hostCancellationAlert));
    
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).send(`
      <html>
        <head><title>Error</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1>Error</h1>
          <p>An error occurred while processing your request.</p>
        </body>
      </html>
    `);
  }
});

module.exports = router;