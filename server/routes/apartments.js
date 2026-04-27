const express = require('express');
const router = express.Router();
const Apartment = require('../models/Apartment');
const AvailabilityChecker = require('../utils/availability');

// POST /api/apartments/availability - Check availability for multiple properties
router.post('/availability', async (req, res) => {
  try {
    const { checkin, checkout, guests, apartmentIds } = req.body;
    
    if (!checkin || !checkout) {
      return res.status(400).json({
        success: false,
        error: 'Check-in and check-out dates are required'
      });
    }
    
    // Validate date range
    const validation = AvailabilityChecker.validateDateRange(checkin, checkout);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.error
      });
    }
    
    let results;
    
    if (apartmentIds && Array.isArray(apartmentIds)) {
      // Check specific apartments
      results = AvailabilityChecker.checkMultipleAvailability(apartmentIds, checkin, checkout);
    } else {
      // Get all available properties
      const availableProperties = AvailabilityChecker.getAvailableProperties(checkin, checkout, guests);
      results = {
        available: availableProperties,
        count: availableProperties.length,
        checkin: checkin,
        checkout: checkout,
        nights: AvailabilityChecker.calculateNights(checkin, checkout)
      };
    }
    
    res.json({
      success: true,
      ...results
    });
    
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check availability',
      message: error.message
    });
  }
});

// GET /api/apartments - List all available properties
router.get('/', async (req, res) => {
  try {
    const { limit, checkin, checkout, guests } = req.query;
    
    let apartments;
    
    // If date range is provided, filter by availability
    if (checkin && checkout) {
      apartments = Apartment.getAvailable(checkin, checkout, guests ? parseInt(guests) : null);
    } else {
      apartments = Apartment.getAll();
      
      // Filter by guest capacity if provided
      if (guests) {
        const guestCount = parseInt(guests);
        apartments = apartments.filter(apt => apt.maxGuests >= guestCount);
      }
    }
    
    // Apply limit if provided
    if (limit) {
      const limitNum = parseInt(limit);
      apartments = apartments.slice(0, limitNum);
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
    const apartmentId = parseInt(id);
    
    if (isNaN(apartmentId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid apartment ID'
      });
    }
    
    const apartment = Apartment.getById(apartmentId);
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        error: 'Apartment not found'
      });
    }
    
    res.json({
      success: true,
      apartment: apartment
    });
    
  } catch (error) {
    console.error('Error fetching apartment:', error);
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
    const { checkin, checkout } = req.query;
    const apartmentId = parseInt(id);
    
    if (isNaN(apartmentId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid apartment ID'
      });
    }
    
    if (!checkin || !checkout) {
      return res.status(400).json({
        success: false,
        error: 'Check-in and check-out dates are required'
      });
    }
    
    const apartment = Apartment.getById(apartmentId);
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        error: 'Apartment not found'
      });
    }
    
    const isAvailable = apartment.isAvailable(checkin, checkout);
    
    let pricing = null;
    if (isAvailable) {
      try {
        pricing = apartment.calculatePricing(checkin, checkout);
      } catch (pricingError) {
        return res.status(400).json({
          success: false,
          error: 'Invalid date range for pricing calculation'
        });
      }
    }
    
    res.json({
      success: true,
      available: isAvailable,
      apartmentId: apartmentId,
      checkin: checkin,
      checkout: checkout,
      pricing: pricing
    });
    
  } catch (error) {
    console.error('Error checking availability:', error);
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
    const apartmentId = parseInt(id);
    
    if (isNaN(apartmentId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid apartment ID'
      });
    }
    
    const apartment = Apartment.getById(apartmentId);
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        error: 'Apartment not found'
      });
    }
    
    const bookedDates = apartment.getBookedDates();
    
    res.json({
      success: true,
      apartmentId: apartmentId,
      bookedDates: bookedDates
    });
    
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch booked dates',
      message: error.message
    });
  }
});

module.exports = router;