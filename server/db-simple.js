const fs = require('fs');
const path = require('path');

// Simple JSON-based database for testing
class SimpleDB {
  constructor() {
    this.dataDir = path.join(__dirname, '..', 'data');
    this.apartmentsFile = path.join(this.dataDir, 'apartments.json');
    this.bookingsFile = path.join(this.dataDir, 'bookings.json');
    
    // Ensure data directory exists
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
    
    this.apartments = this.loadData(this.apartmentsFile, []);
    this.bookings = this.loadData(this.bookingsFile, []);
  }
  
  loadData(filePath, defaultValue) {
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
    }
    return defaultValue;
  }
  
  saveData(filePath, data) {
    try {
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        console.log(`📁 Creating directory: ${dir}`);
        fs.mkdirSync(dir, { recursive: true });
      }
      
      console.log(`💾 Writing to file: ${filePath}`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ File saved successfully: ${filePath}`);
      return true;
    } catch (error) {
      console.error(`❌ Error saving ${filePath}:`, error);
      console.error('Error details:', {
        code: error.code,
        errno: error.errno,
        syscall: error.syscall,
        path: error.path
      });
      return false;
    }
  }
  
  // Apartment operations
  getAllApartments() {
    return this.apartments.filter(apt => apt.isActive !== false);
  }
  
  getApartmentById(id) {
    return this.apartments.find(apt => apt.id === parseInt(id) && apt.isActive !== false);
  }
  
  // Booking operations
  createBooking(bookingData) {
    this.bookings.push(bookingData);
    return this.saveData(this.bookingsFile, this.bookings);
  }
  
  getBookingById(id) {
    return this.bookings.find(booking => booking.id === id);
  }
  
  updateBookingStatus(id, status, paymentDeadline = null) {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = status;
      booking.updatedAt = new Date().toISOString();
      if (paymentDeadline) {
        booking.paymentDeadline = paymentDeadline;
      }
      return this.saveData(this.bookingsFile, this.bookings);
    }
    return false;
  }
  
  // Availability checking
  checkAvailability(apartmentId, checkIn, checkOut) {
    const conflicts = this.bookings.filter(booking => 
      booking.apartmentId === parseInt(apartmentId) &&
      ['pending', 'confirmed'].includes(booking.status) &&
      booking.checkIn < checkOut &&
      booking.checkOut > checkIn
    );
    return conflicts.length === 0;
  }
  
  getBookedDates(apartmentId) {
    return this.bookings
      .filter(booking => 
        booking.apartmentId === parseInt(apartmentId) && 
        booking.status !== 'cancelled'
      )
      .map(booking => ({
        checkIn: booking.checkIn,
        checkOut: booking.checkOut
      }))
      .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
  }
}

// Initialize database
const db = new SimpleDB();

// Seed apartments if empty
if (db.apartments.length === 0) {
  const seedApartments = [
    {
      id: 1,
      name: "Haven Lekki - Studio",
      type: "cozy homes",
      description: "A sleek modern studio in the heart of Lekki Phase 1. Perfect for business travelers and couples seeking luxury accommodation with easy access to Victoria Island and Ikoyi.",
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      pricePerNight: 45000,
      amenities: ["Swimming pool", "Kitchen", "Air conditioning", "WiFi", "Smart TV", "Hot water", "Security"],
      photos: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      ],
      location: "15 Admiralty Way, Lekki Phase 1, Lagos",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "The Metropolis Lekki - Studio",
      type: "luxury suites",
      description: "Luxurious two-bedroom suite in the prestigious Metropolis development. Features modern amenities and stunning city views, perfect for families and business groups.",
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      pricePerNight: 75000,
      amenities: ["Swimming pool", "Gym", "Kitchen", "WiFi", "Smart TV", "Balcony", "Concierge", "Parking"],
      photos: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80",
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      ],
      location: "Plot 1415, Adetokunbo Ademola Street, Victoria Island, Lagos",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      name: "Victoria Island Penthouse",
      type: "premium stays",
      description: "Stunning three-bedroom penthouse with panoramic views of Lagos lagoon. Features premium finishes, spacious living areas, and exclusive access to rooftop terrace.",
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 3,
      pricePerNight: 120000,
      amenities: ["Swimming pool", "Kitchen", "Air conditioning", "Balcony", "Rooftop terrace", "WiFi", "Smart TV", "Gym", "Concierge"],
      photos: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80"
      ],
      location: "1161 Memorial Drive, Victoria Island, Lagos",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 4,
      name: "Ikoyi Executive Suite",
      type: "executive homes",
      description: "Executive two-bedroom suite in the prestigious Ikoyi district. Ideal for business executives and discerning travelers seeking sophistication and convenience.",
      maxGuests: 3,
      bedrooms: 2,
      bathrooms: 2,
      pricePerNight: 85000,
      amenities: ["Gym", "Kitchen", "WiFi", "Parking", "Air conditioning", "Smart TV", "Security", "Workspace"],
      photos: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      ],
      location: "23 Kingsway Road, Ikoyi, Lagos",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  
  db.apartments = seedApartments;
  db.saveData(db.apartmentsFile, db.apartments);
  console.log('✅ Seeded apartments data');
}

// Initialize function
function initialize() {
  return new Promise((resolve) => {
    console.log('🗄️  Initializing simple JSON database...');
    console.log('✅ Database initialized successfully');
    resolve();
  });
}

// Database operations
const operations = {
  getAllApartments: () => db.getAllApartments(),
  getApartmentById: (id) => db.getApartmentById(id),
  createBooking: (bookingData) => db.createBooking(bookingData),
  getBookingById: (id) => db.getBookingById(id),
  updateBookingStatus: (id, status, paymentDeadline) => db.updateBookingStatus(id, status, paymentDeadline),
  checkAvailability: (apartmentId, checkIn, checkOut) => db.checkAvailability(apartmentId, checkIn, checkOut),
  getBookedDates: (apartmentId) => db.getBookedDates(apartmentId)
};

module.exports = {
  db,
  initialize,
  operations
};