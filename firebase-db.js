// Firebase Database Service
// This file contains all database operations for apartments and bookings

import { db, collection, addDoc, getDocs, query, where, orderBy, Timestamp } from './firebase-init.js';

// ==================== APARTMENTS ====================

/**
 * Get all apartments
 * @returns {Promise<Array>} Array of apartment objects
 */
export async function getAllApartments() {
  try {
    const apartmentsRef = collection(db, 'apartments');
    const q = query(apartmentsRef, where('available', '==', true));
    const snapshot = await getDocs(q);
    
    const apartments = [];
    snapshot.forEach(doc => {
      apartments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return apartments;
  } catch (error) {
    console.error('Error getting apartments:', error);
    throw error;
  }
}

/**
 * Get apartment by ID
 * @param {string} apartmentId - The apartment ID
 * @returns {Promise<Object>} Apartment object
 */
export async function getApartmentById(apartmentId) {
  try {
    const apartmentsRef = collection(db, 'apartments');
    const q = query(apartmentsRef, where('__name__', '==', apartmentId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      throw new Error('Apartment not found');
    }
    
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error getting apartment:', error);
    throw error;
  }
}

/**
 * Search apartments by location, price, guests
 * @param {Object} filters - Search filters
 * @returns {Promise<Array>} Array of matching apartments
 */
export async function searchApartments(filters = {}) {
  try {
    const apartmentsRef = collection(db, 'apartments');
    let q = query(apartmentsRef, where('available', '==', true));
    
    // Add filters
    if (filters.location) {
      q = query(q, where('location', '==', filters.location));
    }
    
    if (filters.maxPrice) {
      q = query(q, where('price', '<=', filters.maxPrice));
    }
    
    if (filters.minGuests) {
      q = query(q, where('maxGuests', '>=', filters.minGuests));
    }
    
    const snapshot = await getDocs(q);
    
    const apartments = [];
    snapshot.forEach(doc => {
      apartments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return apartments;
  } catch (error) {
    console.error('Error searching apartments:', error);
    throw error;
  }
}

// ==================== BOOKINGS ====================

/**
 * Create a new booking
 * @param {Object} bookingData - Booking information
 * @returns {Promise<string>} Booking ID
 */
export async function createBooking(bookingData) {
  try {
    // Validate required fields
    const required = ['apartmentId', 'guestName', 'guestEmail', 'guestPhone', 'checkIn', 'checkOut', 'guests', 'totalPrice'];
    for (const field of required) {
      if (!bookingData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Convert date strings to Firestore Timestamps
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    
    // Validate dates
    if (checkInDate >= checkOutDate) {
      throw new Error('Check-out date must be after check-in date');
    }
    
    if (checkInDate < new Date()) {
      throw new Error('Check-in date cannot be in the past');
    }
    
    // Check for overlapping bookings
    const hasOverlap = await checkBookingOverlap(
      bookingData.apartmentId,
      checkInDate,
      checkOutDate
    );
    
    if (hasOverlap) {
      throw new Error('This apartment is already booked for the selected dates');
    }
    
    // Create booking document
    const booking = {
      apartmentId: bookingData.apartmentId,
      guestName: bookingData.guestName,
      guestEmail: bookingData.guestEmail,
      guestPhone: bookingData.guestPhone,
      checkIn: Timestamp.fromDate(checkInDate),
      checkOut: Timestamp.fromDate(checkOutDate),
      guests: parseInt(bookingData.guests),
      totalPrice: parseFloat(bookingData.totalPrice),
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const bookingsRef = collection(db, 'bookings');
    const docRef = await addDoc(bookingsRef, booking);
    
    console.log('Booking created:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

/**
 * Check if there are overlapping bookings
 * @param {string} apartmentId - Apartment ID
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 * @returns {Promise<boolean>} True if overlap exists
 */
export async function checkBookingOverlap(apartmentId, checkIn, checkOut) {
  try {
    const bookingsRef = collection(db, 'bookings');
    const q = query(
      bookingsRef,
      where('apartmentId', '==', apartmentId),
      where('status', '!=', 'cancelled')
    );
    
    const snapshot = await getDocs(q);
    
    // Check each booking for overlap
    for (const doc of snapshot.docs) {
      const booking = doc.data();
      const existingCheckIn = booking.checkIn.toDate();
      const existingCheckOut = booking.checkOut.toDate();
      
      // Check if dates overlap
      const hasOverlap = (
        (checkIn >= existingCheckIn && checkIn < existingCheckOut) ||
        (checkOut > existingCheckIn && checkOut <= existingCheckOut) ||
        (checkIn <= existingCheckIn && checkOut >= existingCheckOut)
      );
      
      if (hasOverlap) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking booking overlap:', error);
    throw error;
  }
}

/**
 * Get all bookings (admin only)
 * @returns {Promise<Array>} Array of booking objects
 */
export async function getAllBookings() {
  try {
    const bookingsRef = collection(db, 'bookings');
    const q = query(bookingsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const bookings = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        ...data,
        checkIn: data.checkIn.toDate().toISOString(),
        checkOut: data.checkOut.toDate().toISOString(),
        createdAt: data.createdAt.toDate().toISOString()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error getting bookings:', error);
    throw error;
  }
}

/**
 * Get bookings for a specific apartment
 * @param {string} apartmentId - Apartment ID
 * @returns {Promise<Array>} Array of booking objects
 */
export async function getApartmentBookings(apartmentId) {
  try {
    const bookingsRef = collection(db, 'bookings');
    const q = query(
      bookingsRef,
      where('apartmentId', '==', apartmentId),
      where('status', '!=', 'cancelled'),
      orderBy('checkIn', 'asc')
    );
    
    const snapshot = await getDocs(q);
    
    const bookings = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        checkIn: data.checkIn.toDate().toISOString(),
        checkOut: data.checkOut.toDate().toISOString()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error getting apartment bookings:', error);
    throw error;
  }
}

// ==================== AVAILABILITY ====================

/**
 * Check if apartment is available for dates
 * @param {string} apartmentId - Apartment ID
 * @param {string} checkIn - Check-in date (ISO string)
 * @param {string} checkOut - Check-out date (ISO string)
 * @returns {Promise<boolean>} True if available
 */
export async function checkAvailability(apartmentId, checkIn, checkOut) {
  try {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    const hasOverlap = await checkBookingOverlap(apartmentId, checkInDate, checkOutDate);
    return !hasOverlap;
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
}
