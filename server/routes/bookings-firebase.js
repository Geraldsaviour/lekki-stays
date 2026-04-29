const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus
} = require('../firebase-admin');

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Validate required fields
    const required = ['apartmentId', 'guestName', 'guestEmail', 'guestPhone', 'checkIn', 'checkOut', 'guests', 'totalPrice'];
    const missing = required.filter(field => !bookingData[field]);
    
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missing.join(', ')}`
      });
    }
    
    // Create booking
    const booking = await createBooking(bookingData);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: booking
    });
    
  } catch (error) {
    console.error('Error creating booking:', error);
    
    if (error.message.includes('already booked')) {
      return res.status(409).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create booking',
      message: error.message
    });
  }
});

// GET /api/bookings - Get all bookings (admin only)
router.get('/', async (req, res) => {
  try {
    const bookings = await getAllBookings();
    
    res.json({
      success: true,
      count: bookings.length,
      bookings: bookings
    });
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookings',
      message: error.message
    });
  }
});

// GET /api/bookings/:id - Get specific booking
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await getBookingById(id);
    
    res.json({
      success: true,
      booking: booking
    });
    
  } catch (error) {
    console.error('Error fetching booking:', error);
    
    if (error.message === 'Booking not found') {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
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
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }
    
    const validStatuses = ['pending', 'confirmed', 'paid', 'cancelled', 'declined'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    const result = await updateBookingStatus(id, status);
    
    res.json({
      success: true,
      message: 'Booking status updated',
      ...result
    });
    
  } catch (error) {
    console.error('Error updating booking status:', error);
    
    if (error.message === 'Booking not found') {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update booking status',
      message: error.message
    });
  }
});

module.exports = router;
