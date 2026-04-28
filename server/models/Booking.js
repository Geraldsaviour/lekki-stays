const { operations } = require('../db-simple');
const crypto = require('crypto');

class Booking {
  constructor(data) {
    this.id = data.id;
    this.apartmentId = data.apartmentId;
    this.guestName = data.guestName;
    this.guestPhone = data.guestPhone;
    this.guestEmail = data.guestEmail;
    this.checkIn = data.checkIn;
    this.checkOut = data.checkOut;
    this.numGuests = data.numGuests;
    this.totalPrice = data.totalPrice;
    this.status = data.status;
    this.token = data.token;
    this.paymentDeadline = data.paymentDeadline;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Static methods for database operations with enhanced security
  static create(bookingData) {
    // Sanitize input data
    const sanitizedData = {
      ...bookingData,
      guestName: Booking.sanitizeGuestName(bookingData.guestName),
      guestPhone: Booking.formatPhoneNumber(bookingData.guestPhone),
      guestEmail: bookingData.guestEmail ? bookingData.guestEmail.toLowerCase().trim() : ''
    };
    
    // Validate sanitized data
    const validation = Booking.validate(sanitizedData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    // Generate unique booking ID and secure token
    const id = sanitizedData.id || Booking.generateBookingId();
    const token = Booking.generateToken();
    
    const booking = {
      id: id,
      token: token,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...sanitizedData
    };
    
    console.log('💾 Saving booking to database:', booking);
    
    const success = operations.createBooking(booking);
    
    if (!success) {
      throw new Error('Failed to save booking to database');
    }
    
    console.log('✅ Booking saved successfully, retrieving from database...');
    
    const savedBooking = Booking.getById(id);
    
    if (!savedBooking) {
      console.error('❌ Failed to retrieve booking after save:', id);
      throw new Error('Failed to retrieve booking after creation');
    }
    
    console.log('✅ Booking retrieved successfully:', savedBooking.id);
    return savedBooking;
  }

  static getById(id) {
    const data = operations.getBookingById(id);
    return data ? new Booking(data) : null;
  }

  static getByToken(token) {
    // For simple database, we need to search through all bookings
    const { operations } = require('../db-simple');
    const allBookings = operations.db.bookings;
    const data = allBookings.find(booking => booking.token === token);
    return data ? new Booking(data) : null;
  }

  // Generate unique booking ID
  static generateBookingId() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `LUX${timestamp}${random}`;
  }

  // Generate secure token for booking operations
  static generateToken() {
    return crypto.randomBytes(16).toString('hex');
  }

  // Instance methods
  updateStatus(newStatus) {
    let paymentDeadline = null;
    
    // Set payment deadline when confirming booking
    if (newStatus === 'confirmed') {
      const deadline = new Date();
      deadline.setHours(deadline.getHours() + 24);
      paymentDeadline = deadline.toISOString();
    }
    
    const success = operations.updateBookingStatus(this.id, newStatus, paymentDeadline);
    
    if (success) {
      this.status = newStatus;
      this.paymentDeadline = paymentDeadline;
      this.updatedAt = new Date().toISOString();
    }
    
    return success;
  }

  // Calculate nights
  getNights() {
    const checkInDate = new Date(this.checkIn);
    const checkOutDate = new Date(this.checkOut);
    return Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  }

  // Check if booking is refundable (48+ hours before check-in)
  isRefundable() {
    const checkInDate = new Date(this.checkIn);
    const now = new Date();
    const hoursUntilCheckIn = (checkInDate - now) / (1000 * 60 * 60);
    
    return hoursUntilCheckIn >= 48;
  }

  // Calculate refund amount
  getRefundAmount() {
    if (!this.isRefundable()) {
      return 0;
    }
    
    // Full refund minus service fee
    const serviceFee = 10000;
    return Math.max(0, this.totalPrice - serviceFee);
  }

  // Enhanced validation methods with security focus
  static validate(data) {
    const errors = [];
    
    // Required fields validation
    if (!data.apartmentId || !Number.isInteger(data.apartmentId)) {
      errors.push('Valid apartment ID is required');
    }
    
    if (!data.guestName || typeof data.guestName !== 'string') {
      errors.push('Guest name is required');
    } else {
      const trimmedName = data.guestName.trim();
      if (trimmedName.length < 2) {
        errors.push('Guest name must be at least 2 characters long');
      } else if (trimmedName.length > 100) {
        errors.push('Guest name must be less than 100 characters');
      } else if (!/^[a-zA-Z\s\-'\.]+$/.test(trimmedName)) {
        errors.push('Guest name contains invalid characters');
      }
    }
    
    if (!data.guestPhone || !Booking.isValidPhone(data.guestPhone)) {
      errors.push('Valid Nigerian phone number is required');
    }
    
    if (!data.guestEmail || !Booking.isValidEmail(data.guestEmail)) {
      errors.push('Valid email address is required');
    } else if (data.guestEmail.length > 254) {
      errors.push('Email address is too long');
    }
    
    if (!data.checkIn || !Booking.isValidDate(data.checkIn)) {
      errors.push('Valid check-in date is required');
    }
    
    if (!data.checkOut || !Booking.isValidDate(data.checkOut)) {
      errors.push('Valid check-out date is required');
    }
    
    // Date validation with security checks
    if (data.checkIn && data.checkOut) {
      const checkInDate = new Date(data.checkIn);
      const checkOutDate = new Date(data.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Prevent past dates
      if (checkInDate < today) {
        errors.push('Check-in date cannot be in the past');
      }
      
      // Ensure logical date order
      if (checkOutDate <= checkInDate) {
        errors.push('Check-out date must be after check-in date');
      }
      
      // Prevent extremely long stays (security measure)
      const maxStayDays = 365; // 1 year maximum
      const stayDuration = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
      if (stayDuration > maxStayDays) {
        errors.push(`Maximum stay duration is ${maxStayDays} days`);
      }
      
      // Prevent extremely short stays
      if (stayDuration < 1) {
        errors.push('Minimum stay is 1 night');
      }
      
      // Prevent bookings too far in the future (2 years max)
      const maxAdvanceBookingDays = 730;
      const advanceBookingDays = (checkInDate - today) / (1000 * 60 * 60 * 24);
      if (advanceBookingDays > maxAdvanceBookingDays) {
        errors.push('Bookings cannot be made more than 2 years in advance');
      }
    }
    
    // Guest count validation with security limits
    if (!Number.isInteger(data.numGuests) || data.numGuests < 1) {
      errors.push('Number of guests must be at least 1');
    } else if (data.numGuests > 50) { // Reasonable upper limit
      errors.push('Maximum 50 guests allowed');
    }
    
    // Price validation with security checks
    if (!Number.isFinite(data.totalPrice) || data.totalPrice <= 0) {
      errors.push('Total price must be a positive number');
    } else if (data.totalPrice > 100000000) { // 100M Naira max (security limit)
      errors.push('Total price exceeds maximum allowed amount');
    } else if (data.totalPrice < 1000) { // Minimum price check
      errors.push('Total price is below minimum allowed amount');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Enhanced helper validation methods
  static isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    
    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    // Length check
    if (email.length > 254) return false;
    
    // Local part length check (before @)
    const localPart = email.split('@')[0];
    if (localPart.length > 64) return false;
    
    // Prevent dangerous characters
    const dangerousChars = /[<>'"&]/;
    if (dangerousChars.test(email)) return false;
    
    return true;
  }

  static isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    
    // Nigerian phone number validation (supports +234, 234, or 0 prefix)
    const phoneRegex = /^(\+?234|0)[789][01]\d{8}$/;
    const cleanPhone = phone.replace(/[\s\-()]/g, ''); // Allow common formatting chars
    
    // Length check for security
    if (cleanPhone.length > 20) return false;
    
    return phoneRegex.test(cleanPhone);
  }

  static isValidDate(dateString) {
    if (!dateString || typeof dateString !== 'string') return false;
    
    // Check ISO 8601 format
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
    if (!isoRegex.test(dateString)) {
      // Also accept simple date format YYYY-MM-DD
      const simpleDateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!simpleDateRegex.test(dateString)) return false;
    }
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return false;
    
    // Prevent unreasonable dates (year 1900-2100)
    const year = date.getFullYear();
    if (year < 1900 || year > 2100) return false;
    
    return true;
  }

  // Sanitize guest name to prevent XSS
  static sanitizeGuestName(name) {
    if (!name || typeof name !== 'string') return '';
    
    return name
      .trim()
      .replace(/[<>'"&]/g, '') // Remove dangerous characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .substring(0, 100); // Limit length
  }

  // Format and validate phone number
  static formatPhoneNumber(phone) {
    if (!phone || typeof phone !== 'string') return '';
    
    // Remove all non-digit characters except +
    let cleaned = phone.replace(/[^\d+]/g, '');
    
    // Convert to international format
    if (cleaned.startsWith('0')) {
      cleaned = '+234' + cleaned.substring(1);
    } else if (cleaned.startsWith('234')) {
      cleaned = '+' + cleaned;
    } else if (!cleaned.startsWith('+234')) {
      // Assume it's a local number without country code
      if (cleaned.length === 10 && /^[789]/.test(cleaned)) {
        cleaned = '+234' + cleaned;
      }
    }
    
    return cleaned;
  }

  // Format phone number for WhatsApp (remove + and spaces)
  getFormattedPhone() {
    return this.guestPhone.replace(/[^0-9]/g, '');
  }

  // Format for API response
  toJSON() {
    return {
      id: this.id,
      apartmentId: this.apartmentId,
      guestName: this.guestName,
      guestPhone: this.guestPhone,
      guestEmail: this.guestEmail,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      numGuests: this.numGuests,
      totalPrice: this.totalPrice,
      status: this.status,
      token: this.token,
      paymentDeadline: this.paymentDeadline,
      nights: this.getNights(),
      isRefundable: this.isRefundable(),
      refundAmount: this.getRefundAmount(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Format for public API response (without sensitive data)
  toPublicJSON() {
    return {
      id: this.id,
      apartmentId: this.apartmentId,
      guestName: this.guestName,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      numGuests: this.numGuests,
      totalPrice: this.totalPrice,
      status: this.status,
      nights: this.getNights(),
      createdAt: this.createdAt
    };
  }
}

module.exports = Booking;