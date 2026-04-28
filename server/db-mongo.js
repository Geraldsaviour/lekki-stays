const { MongoClient } = require('mongodb');

// MongoDB connection
let client = null;
let db = null;

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lekki-stays';

class MongoDatabase {
  static async connect() {
    try {
      if (client && client.topology && client.topology.isConnected()) {
        console.log('✅ Already connected to MongoDB');
        return db;
      }

      console.log('🔌 Connecting to MongoDB...');
      client = new MongoClient(MONGO_URI, {
        maxPoolSize: 10,
        minPoolSize: 2,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      await client.connect();
      db = client.db('lekki-stays');

      console.log('✅ Connected to MongoDB successfully');

      // Create indexes
      await this.createIndexes();

      return db;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      throw error;
    }
  }

  static async createIndexes() {
    try {
      const bookingsCollection = db.collection('bookings');
      const apartmentsCollection = db.collection('apartments');

      // Bookings indexes
      await bookingsCollection.createIndex({ id: 1 }, { unique: true });
      await bookingsCollection.createIndex({ apartmentId: 1 });
      await bookingsCollection.createIndex({ status: 1 });
      await bookingsCollection.createIndex({ createdAt: 1 });
      await bookingsCollection.createIndex(
        { apartmentId: 1, checkIn: 1, checkOut: 1 },
        { name: 'availability_index' }
      );

      // Apartments indexes
      await apartmentsCollection.createIndex({ id: 1 }, { unique: true });
      await apartmentsCollection.createIndex({ isActive: 1 });

      console.log('✅ Database indexes created');
    } catch (error) {
      console.error('⚠️  Error creating indexes:', error.message);
    }
  }

  static async disconnect() {
    if (client) {
      await client.close();
      console.log('✅ Disconnected from MongoDB');
    }
  }

  static getDb() {
    if (!db) {
      throw new Error('Database not connected');
    }
    return db;
  }
}

// Database operations
const operations = {
  // Apartments
  getAllApartments: async () => {
    const collection = db.collection('apartments');
    return await collection.find({ isActive: { $ne: false } }).toArray();
  },

  getApartmentById: async (id) => {
    const collection = db.collection('apartments');
    return await collection.findOne({ id: parseInt(id), isActive: { $ne: false } });
  },

  // Bookings
  createBooking: async (bookingData) => {
    const collection = db.collection('bookings');
    const result = await collection.insertOne(bookingData);
    return result.acknowledged;
  },

  getBookingById: async (id) => {
    const collection = db.collection('bookings');
    return await collection.findOne({ id: id });
  },

  updateBookingStatus: async (id, status, paymentDeadline = null) => {
    const collection = db.collection('bookings');
    const updateData = {
      status: status,
      updatedAt: new Date().toISOString(),
    };

    if (paymentDeadline) {
      updateData.paymentDeadline = paymentDeadline;
    }

    const result = await collection.updateOne({ id: id }, { $set: updateData });
    return result.modifiedCount > 0;
  },

  // Availability
  checkAvailability: async (apartmentId, checkIn, checkOut) => {
    const collection = db.collection('bookings');
    const conflicts = await collection
      .find({
        apartmentId: parseInt(apartmentId),
        status: { $in: ['pending', 'confirmed'] },
        checkIn: { $lt: checkOut },
        checkOut: { $gt: checkIn },
      })
      .toArray();

    return conflicts.length === 0;
  },

  getBookedDates: async (apartmentId) => {
    const collection = db.collection('bookings');
    return await collection
      .find({
        apartmentId: parseInt(apartmentId),
        status: { $ne: 'cancelled' },
      })
      .project({ checkIn: 1, checkOut: 1 })
      .sort({ checkIn: 1 })
      .toArray();
  },

  // Seed apartments
  seedApartments: async () => {
    const collection = db.collection('apartments');
    const count = await collection.countDocuments();

    if (count === 0) {
      const apartments = [
        {
          id: 1,
          name: 'Haven Lekki - Studio',
          type: 'cozy homes',
          description:
            'A sleek modern studio in the heart of Lekki Phase 1. Perfect for business travelers and couples seeking luxury accommodation with easy access to Victoria Island and Ikoyi.',
          maxGuests: 2,
          bedrooms: 1,
          bathrooms: 1,
          pricePerNight: 45000,
          amenities: ['Swimming pool', 'Kitchen', 'Air conditioning', 'WiFi', 'Smart TV', 'Hot water', 'Security'],
          photos: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
          ],
          location: '15 Admiralty Way, Lekki Phase 1, Lagos',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'The Metropolis Lekki - Studio',
          type: 'luxury suites',
          description:
            'Luxurious two-bedroom suite in the prestigious Metropolis development. Features modern amenities and stunning city views, perfect for families and business groups.',
          maxGuests: 4,
          bedrooms: 2,
          bathrooms: 2,
          pricePerNight: 75000,
          amenities: ['Swimming pool', 'Gym', 'Kitchen', 'WiFi', 'Smart TV', 'Balcony', 'Concierge', 'Parking'],
          photos: [
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80',
            'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          ],
          location: 'Plot 1415, Adetokunbo Ademola Street, Victoria Island, Lagos',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'Victoria Island Penthouse',
          type: 'premium stays',
          description:
            'Stunning three-bedroom penthouse with panoramic views of Lagos lagoon. Features premium finishes, spacious living areas, and exclusive access to rooftop terrace.',
          maxGuests: 6,
          bedrooms: 3,
          bathrooms: 3,
          pricePerNight: 120000,
          amenities: [
            'Swimming pool',
            'Kitchen',
            'Air conditioning',
            'Balcony',
            'Rooftop terrace',
            'WiFi',
            'Smart TV',
            'Gym',
            'Concierge',
          ],
          photos: [
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
          ],
          location: '1161 Memorial Drive, Victoria Island, Lagos',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 4,
          name: 'Ikoyi Executive Suite',
          type: 'executive homes',
          description:
            'Executive two-bedroom suite in the prestigious Ikoyi district. Ideal for business executives and discerning travelers seeking sophistication and convenience.',
          maxGuests: 3,
          bedrooms: 2,
          bathrooms: 2,
          pricePerNight: 85000,
          amenities: ['Gym', 'Kitchen', 'WiFi', 'Parking', 'Air conditioning', 'Smart TV', 'Security', 'Workspace'],
          photos: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          ],
          location: '23 Kingsway Road, Ikoyi, Lagos',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      await collection.insertMany(apartments);
      console.log('✅ Seeded apartments data');
    }
  },
};

// Initialize database
async function initialize() {
  try {
    await MongoDatabase.connect();
    await operations.seedApartments();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

module.exports = {
  MongoDatabase,
  initialize,
  operations,
};
