const Database = require('better-sqlite3');
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, '..', 'data', 'lekki-stays.db');
const db = new Database(dbPath);

// Enable performance optimizations
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('cache_size = 1000');
db.pragma('temp_store = MEMORY');

// Create apartments table
const createApartmentsTable = `
  CREATE TABLE IF NOT EXISTS apartments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT,
    description TEXT,
    maxGuests INTEGER,
    bedrooms INTEGER,
    bathrooms INTEGER,
    pricePerNight INTEGER,
    amenities TEXT, -- JSON array string
    photos TEXT,    -- JSON array of image URLs
    location TEXT,
    isActive INTEGER DEFAULT 1,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  )
`;

// Create bookings table
const createBookingsTable = `
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    apartmentId INTEGER NOT NULL,
    guestName TEXT NOT NULL,
    guestPhone TEXT NOT NULL,
    guestEmail TEXT NOT NULL,
    checkIn TEXT NOT NULL,     -- "YYYY-MM-DD"
    checkOut TEXT NOT NULL,    -- "YYYY-MM-DD"
    numGuests INTEGER,
    totalPrice INTEGER,        -- in Naira
    status TEXT DEFAULT 'pending',
    token TEXT,               -- random 32-char hex for confirm/decline/cancel links
    paymentDeadline TEXT,     -- ISO string, set when status → confirmed
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (apartmentId) REFERENCES apartments (id)
  )
`;

// Create indexes for performance
const createIndexes = [
  'CREATE INDEX IF NOT EXISTS idx_bookings_apartment_id ON bookings(apartmentId)',
  'CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(checkIn, checkOut)',
  'CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)',
  'CREATE INDEX IF NOT EXISTS idx_bookings_token ON bookings(token)',
  'CREATE INDEX IF NOT EXISTS idx_bookings_apartment_status ON bookings(apartmentId, status)',
  'CREATE INDEX IF NOT EXISTS idx_bookings_date_range ON bookings(apartmentId, checkIn, checkOut, status)',
  'CREATE INDEX IF NOT EXISTS idx_apartments_active ON apartments(isActive)',
  'CREATE INDEX IF NOT EXISTS idx_apartments_guests ON apartments(maxGuests, isActive)'
];

// Initialize database
function initialize() {
  return new Promise((resolve, reject) => {
    try {
      console.log('🗄️  Initializing database...');
      
      // Create tables
      db.exec(createApartmentsTable);
      db.exec(createBookingsTable);
      
      // Create indexes
      createIndexes.forEach(indexSQL => {
        db.exec(indexSQL);
      });
      
      console.log('✅ Database initialized successfully');
      resolve();
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      reject(error);
    }
  });
}

// Prepared statements for common operations
const statements = {
  // Apartments
  getAllApartments: db.prepare('SELECT * FROM apartments WHERE isActive = 1'),
  getApartmentById: db.prepare('SELECT * FROM apartments WHERE id = ? AND isActive = 1'),
  
  // Bookings
  createBooking: db.prepare(`
    INSERT INTO bookings (
      id, apartmentId, guestName, guestPhone, guestEmail, 
      checkIn, checkOut, numGuests, totalPrice, token
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),
  
  getBookingById: db.prepare('SELECT * FROM bookings WHERE id = ?'),
  getBookingByToken: db.prepare('SELECT * FROM bookings WHERE token = ?'),
  
  updateBookingStatus: db.prepare(`
    UPDATE bookings 
    SET status = ?, updatedAt = datetime('now'), paymentDeadline = ?
    WHERE id = ?
  `),
  
  // Availability checking
  checkAvailability: db.prepare(`
    SELECT COUNT(*) as count FROM bookings 
    WHERE apartmentId = ? 
    AND status IN ('pending', 'confirmed') 
    AND checkIn < ? AND checkOut > ?
  `),
  
  getBookedDates: db.prepare(`
    SELECT checkIn, checkOut FROM bookings 
    WHERE apartmentId = ? AND status != 'cancelled'
    ORDER BY checkIn
  `)
};

// Helper functions
function parseJSONField(field) {
  try {
    return field ? JSON.parse(field) : [];
  } catch (error) {
    console.error('Error parsing JSON field:', error);
    return [];
  }
}

function formatApartment(apartment) {
  if (!apartment) return null;
  
  return {
    ...apartment,
    amenities: parseJSONField(apartment.amenities),
    photos: parseJSONField(apartment.photos),
    isActive: Boolean(apartment.isActive)
  };
}

// Database operations
const operations = {
  // Get all apartments
  getAllApartments() {
    const apartments = statements.getAllApartments.all();
    return apartments.map(formatApartment);
  },
  
  // Get apartment by ID
  getApartmentById(id) {
    const apartment = statements.getApartmentById.get(id);
    return formatApartment(apartment);
  },
  
  // Create booking
  createBooking(bookingData) {
    const result = statements.createBooking.run(
      bookingData.id,
      bookingData.apartmentId,
      bookingData.guestName,
      bookingData.guestPhone,
      bookingData.guestEmail,
      bookingData.checkIn,
      bookingData.checkOut,
      bookingData.numGuests,
      bookingData.totalPrice,
      bookingData.token
    );
    
    return result.changes > 0;
  },
  
  // Get booking by ID
  getBookingById(id) {
    return statements.getBookingById.get(id);
  },
  
  // Get booking by token
  getBookingByToken(token) {
    return statements.getBookingByToken.get(token);
  },
  
  // Update booking status
  updateBookingStatus(id, status, paymentDeadline = null) {
    const result = statements.updateBookingStatus.run(status, paymentDeadline, id);
    return result.changes > 0;
  },
  
  // Check availability
  checkAvailability(apartmentId, checkIn, checkOut) {
    const result = statements.checkAvailability.get(apartmentId, checkOut, checkIn);
    return result.count === 0;
  },
  
  // Get booked dates for apartment
  getBookedDates(apartmentId) {
    return statements.getBookedDates.all(apartmentId);
  }
};

// Export database instance and operations
module.exports = {
  db,
  initialize,
  operations,
  statements
};