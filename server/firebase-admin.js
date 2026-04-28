// Firebase Admin SDK for Server-Side Operations
require('dotenv').config();
const admin = require('firebase-admin');

// Initialize Firebase Admin with environment variables
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}

const db = admin.firestore();

// ==================== APARTMENTS ====================

async function getAllApartments() {
  try {
    const snapshot = await db.collection('apartments')
      .where('available', '==', true)
      .get();
    
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

async function getApartmentById(apartmentId) {
  try {
    const doc = await db.collection('apartments').doc(apartmentId).get();
    
    if (!doc.exists) {
      throw new Error('Apartment not found');
    }
    
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error getting apartment:', error);
    throw error;
  }
}

async function searchApartments(filters = {}) {
  try {
    let query = db.collection('apartments').where('available', '==', true);
    
    if (filters.location) {
      query = query.where('location', '==', filters.location);
    }
    
    if (filters.maxPrice) {
      query = query.where('price', '<=', filters.maxPrice);
    }
    
    if (filters.minGuests) {
      query = query.where('maxGuests', '>=', filters.minGuests);
    }
    
    const snapshot = await query.get();
    
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

async function createBooking(bookingData) {
  try {
    // Validate required fields
    const required = ['apartmentId', 'guestName', 'guestEmail', 'guestPhone', 'checkIn', 'checkOut', 'guests', 'totalPrice'];
    for (const field of required) {
      if (!bookingData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Convert date strings to Date objects
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
    
    // Generate booking reference
    const bookingRef = `BK${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    // Create booking document
    const booking = {
      bookingReference: bookingRef,
      apartmentId: bookingData.apartmentId,
      guestName: bookingData.guestName,
      guestEmail: bookingData.guestEmail,
      guestPhone: bookingData.guestPhone,
      checkIn: admin.firestore.Timestamp.fromDate(checkInDate),
      checkOut: admin.firestore.Timestamp.fromDate(checkOutDate),
      guests: parseInt(bookingData.guests),
      totalPrice: parseFloat(bookingData.totalPrice),
      paymentMethod: bookingData.paymentMethod || 'bank_transfer',
      specialRequests: bookingData.specialRequests || '',
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('bookings').add(booking);
    
    console.log('Booking created:', docRef.id);
    return {
      id: docRef.id,
      bookingReference: bookingRef,
      ...booking
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

async function checkBookingOverlap(apartmentId, checkIn, checkOut) {
  try {
    const snapshot = await db.collection('bookings')
      .where('apartmentId', '==', apartmentId)
      .where('status', 'in', ['pending', 'confirmed', 'paid'])
      .get();
    
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

async function getAllBookings() {
  try {
    const snapshot = await db.collection('bookings')
      .orderBy('createdAt', 'desc')
      .get();
    
    const bookings = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        ...data,
        checkIn: data.checkIn?.toDate().toISOString(),
        checkOut: data.checkOut?.toDate().toISOString(),
        createdAt: data.createdAt?.toDate().toISOString()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error getting bookings:', error);
    throw error;
  }
}

async function getBookingById(bookingId) {
  try {
    const doc = await db.collection('bookings').doc(bookingId).get();
    
    if (!doc.exists) {
      throw new Error('Booking not found');
    }
    
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      checkIn: data.checkIn?.toDate().toISOString(),
      checkOut: data.checkOut?.toDate().toISOString(),
      createdAt: data.createdAt?.toDate().toISOString()
    };
  } catch (error) {
    console.error('Error getting booking:', error);
    throw error;
  }
}

async function updateBookingStatus(bookingId, status) {
  try {
    await db.collection('bookings').doc(bookingId).update({
      status: status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return { success: true, bookingId, status };
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
}

async function getApartmentBookings(apartmentId) {
  try {
    const snapshot = await db.collection('bookings')
      .where('apartmentId', '==', apartmentId)
      .where('status', 'in', ['pending', 'confirmed', 'paid'])
      .orderBy('checkIn', 'asc')
      .get();
    
    const bookings = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        checkIn: data.checkIn?.toDate().toISOString(),
        checkOut: data.checkOut?.toDate().toISOString()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error getting apartment bookings:', error);
    throw error;
  }
}

// ==================== AVAILABILITY ====================

async function checkAvailability(apartmentId, checkIn, checkOut) {
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

module.exports = {
  admin,
  db,
  // Apartments
  getAllApartments,
  getApartmentById,
  searchApartments,
  // Bookings
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  getApartmentBookings,
  checkBookingOverlap,
  // Availability
  checkAvailability
};
