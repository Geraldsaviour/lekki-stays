require('dotenv').config();
const Database = require('better-sqlite3');
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, 'lekki-stays.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Luxury apartment data matching the existing frontend listings
const apartments = [
  {
    name: "Lekki Stays — Studio",
    type: "Studio",
    description: "A serene studio in central Lekki Phase 1. Modern interior, fully equipped kitchenette, plush king-sized bed. Large windows fill the space with natural light. Pool access included.",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 45000,
    amenities: JSON.stringify(["Pool", "Kitchen", "AC", "WiFi"]),
    photos: JSON.stringify([
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ]),
    location: "Lekki Phase 1"
  },
  {
    name: "Lekki Stays — Deluxe Studio",
    type: "Studio",
    description: "An elevated studio experience with premium finishes, smart TV, and panoramic city views. Steps from the best of Lekki.",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 55000,
    amenities: JSON.stringify(["Pool", "AC", "Washer", "WiFi", "Smart TV"]),
    photos: JSON.stringify([
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800"
    ]),
    location: "Lekki Phase 1"
  },
  {
    name: "Lekki Stays — 1 Bedroom",
    type: "1 Bedroom",
    description: "Spacious 1-bedroom apartment with a fully equipped kitchen, living room, and dedicated workspace. Ideal for business travelers and couples.",
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 65000,
    amenities: JSON.stringify(["Pool", "Kitchen", "AC", "WiFi", "Washer"]),
    photos: JSON.stringify([
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"
    ]),
    location: "Lekki Phase 1"
  },
  {
    name: "Lekki Stays — Luxury 1 Bedroom",
    type: "1 Bedroom",
    description: "A luxury retreat with designer interiors, walk-in closet, soaking tub, and private balcony. For guests who want nothing but the best.",
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 85000,
    amenities: JSON.stringify(["Pool", "Kitchen", "AC", "WiFi", "Washer", "Balcony", "Bathtub"]),
    photos: JSON.stringify([
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800"
    ]),
    location: "Lekki Phase 2"
  },
  {
    name: "Lekki Stays — Aparthotel Suite",
    type: "2 Bedroom",
    description: "A full 2-bedroom aparthotel suite with hotel-grade furnishings, two bathrooms, and a full kitchen. Perfect for families or groups of up to 5.",
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 110000,
    amenities: JSON.stringify(["Pool", "Kitchen", "AC", "WiFi", "Washer", "Smart TV"]),
    photos: JSON.stringify([
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800"
    ]),
    location: "Lekki Phase 1"
  },
  {
    name: "Lekki Stays — Penthouse",
    type: "2 Bedroom",
    description: "The crown jewel of Lekki Stays. A full penthouse with floor-to-ceiling windows, rooftop access, premium kitchen, and panoramic Lagos views.",
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 150000,
    amenities: JSON.stringify(["Pool", "Kitchen", "AC", "WiFi", "Washer", "Balcony", "Rooftop", "Smart TV"]),
    photos: JSON.stringify([
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?w=800"
    ]),
    location: "VI"
  }
];

// Seed function
function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Check if apartments already exist
    const existingApartments = db.prepare('SELECT COUNT(*) as count FROM apartments').get();
    
    if (existingApartments.count > 0) {
      console.log('📋 Database already contains apartments. Skipping seed.');
      return;
    }
    
    // Prepare insert statement
    const insertApartment = db.prepare(`
      INSERT INTO apartments (
        name, type, description, maxGuests, bedrooms, bathrooms, 
        pricePerNight, amenities, photos, location
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    // Insert all apartments in a transaction
    const insertMany = db.transaction((apartments) => {
      for (const apartment of apartments) {
        insertApartment.run(
          apartment.name,
          apartment.type,
          apartment.description,
          apartment.maxGuests,
          apartment.bedrooms,
          apartment.bathrooms,
          apartment.pricePerNight,
          apartment.amenities,
          apartment.photos,
          apartment.location
        );
      }
    });
    
    insertMany(apartments);
    
    console.log(`✅ Successfully seeded ${apartments.length} luxury apartments`);
    
    // Display seeded apartments
    const seededApartments = db.prepare('SELECT id, name, type, pricePerNight, location FROM apartments').all();
    console.log('\n🏨 Seeded Apartments:');
    seededApartments.forEach(apt => {
      console.log(`   ${apt.id}. ${apt.name} (${apt.type}) - ₦${apt.pricePerNight.toLocaleString()}/night - ${apt.location}`);
    });
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    db.close();
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, apartments };