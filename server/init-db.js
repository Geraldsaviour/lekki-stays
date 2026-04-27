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

console.log('🗄️  Initializing database...');

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

try {
  // Create tables
  db.exec(createApartmentsTable);
  db.exec(createBookingsTable);
  
  // Create indexes
  createIndexes.forEach(indexSQL => {
    db.exec(indexSQL);
  });
  
  console.log('✅ Database initialized successfully');
  
  // Check if we need to seed data
  const count = db.prepare('SELECT COUNT(*) as count FROM apartments').get();
  if (count.count === 0) {
    console.log('📋 Database is empty, running seed...');
    // Run seed script
    require('../data/seed.js');
  } else {
    console.log(`📋 Database already contains ${count.count} apartments`);
  }
  
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
} finally {
  db.close();
}