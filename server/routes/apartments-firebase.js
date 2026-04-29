const express = require('express');
const router = express.Router();
const {
  getAllApartments,
  getApartmentById,
  searchApartments,
  getApartmentBookings,
  checkAvailability
} = require('../firebase-admin');

// GET /api/apartments - List all available properties
router.get('/', async (req, res) => {
  try {
    const { location, maxPrice, minGuests } = req.query;
    
    let apartments;
    
    // If filters provided, use search
    if (location || maxPrice || minGuests) {
      const filters = {};
      if (location) filters.location = location;
      if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
      if (minGuests) filters.minGuests = parseInt(minGuests);
      
      apartments = await searchApartments(filters);
    } else {
      apartments = await getAllApartments();
    }
    
    res.json({
      success: true,
      count: apartments.length,
      apartments: apartments
    });
    
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch apartments',
      message: error.message
    });
  }
});

// GET /api/apartments/:id - Get specific property details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const apartment = await getApartmentById(id);
    
    res.json({
      success: true,
      apartment: apartment
    });
    
  } catch (error) {
    console.error('Error fetching apartment:', error);
    
    if (error.message === 'Apartment not found') {
      return res.status(404).json({
        success: false,
        error: 'Apartment not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch apartment',
      message: error.message
    });
  }
});

// GET /api/apartments/:id/availability - Check availability for specific dates
router.get('/:id/availability', async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut } = req.query;
    
    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        error: 'Check-in and check-out dates are required'
      });
    }
    
    // Verify apartment exists
    const apartment = await getApartmentById(id);
    
    // Check availability
    const isAvailable = await checkAvailability(id, checkIn, checkOut);
    
    // Calculate pricing if available
    let pricing = null;
    if (isAvailable) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      
      const subtotal = apartment.price * nights;
      const cautionFee = 10000;
      const total = subtotal + cautionFee;
      
      pricing = {
        pricePerNight: apartment.price,
        nights: nights,
        subtotal: subtotal,
        cautionFee: cautionFee,
        total: total
      };
    }
    
    res.json({
      success: true,
      available: isAvailable,
      apartmentId: id,
      checkIn: checkIn,
      checkOut: checkOut,
      pricing: pricing
    });
    
  } catch (error) {
    console.error('Error checking availability:', error);
    
    if (error.message === 'Apartment not found') {
      return res.status(404).json({
        success: false,
        error: 'Apartment not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to check availability',
      message: error.message
    });
  }
});

// GET /api/apartments/:id/booked-dates - Get booked dates for calendar
router.get('/:id/booked-dates', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verify apartment exists
    await getApartmentById(id);
    
    // Get bookings for this apartment
    const bookings = await getApartmentBookings(id);
    
    res.json({
      success: true,
      apartmentId: id,
      bookedDates: bookings
    });
    
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    
    if (error.message === 'Apartment not found') {
      return res.status(404).json({
        success: false,
        error: 'Apartment not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch booked dates',
      message: error.message
    });
  }
});

module.exports = router;
