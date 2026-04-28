// Migrate Apartments Data from JSON to Firebase Firestore
require('dotenv').config();
const { db, admin } = require('./firebase-admin');
const fs = require('fs');
const path = require('path');

async function migrateApartments() {
  try {
    console.log('🚀 Starting apartment migration to Firestore...\n');
    
    // Read apartments from JSON file
    const apartmentsPath = path.join(__dirname, '..', 'data', 'apartments.json');
    const apartmentsData = JSON.parse(fs.readFileSync(apartmentsPath, 'utf8'));
    
    console.log(`📦 Found ${apartmentsData.length} apartments to migrate\n`);
    
    const batch = db.batch();
    let count = 0;
    
    for (const apartment of apartmentsData) {
      // Create Firestore document
      const docRef = db.collection('apartments').doc();
      
      const firestoreApartment = {
        name: apartment.name,
        type: apartment.type,
        description: apartment.description,
        maxGuests: apartment.maxGuests,
        bedrooms: apartment.bedrooms,
        bathrooms: apartment.bathrooms,
        price: apartment.pricePerNight, // Rename to 'price' for consistency
        amenities: apartment.amenities,
        images: apartment.photos, // Rename to 'images' for consistency
        location: apartment.location,
        available: apartment.isActive,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      batch.set(docRef, firestoreApartment);
      count++;
      
      console.log(`✅ Prepared: ${apartment.name}`);
    }
    
    // Commit the batch
    await batch.commit();
    
    console.log(`\n🎉 Successfully migrated ${count} apartments to Firestore!`);
    console.log('\n📊 Verifying migration...');
    
    // Verify migration
    const snapshot = await db.collection('apartments').get();
    console.log(`✅ Firestore now contains ${snapshot.size} apartments\n`);
    
    // Display sample data
    console.log('📋 Sample apartment data:');
    const firstDoc = snapshot.docs[0];
    if (firstDoc) {
      console.log(JSON.stringify({
        id: firstDoc.id,
        ...firstDoc.data()
      }, null, 2));
    }
    
    console.log('\n✨ Migration complete! Your apartments are now in Firestore.');
    console.log('🔗 View in Firebase Console: https://console.firebase.google.com/project/lekki-stays/firestore');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateApartments()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
