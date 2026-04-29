// Clear and Re-migrate All Apartments to Firestore
require('dotenv').config();
const { db, admin } = require('./firebase-admin');
const fs = require('fs');
const path = require('path');

async function remigrate() {
  try {
    console.log('🔄 Starting re-migration of all apartments...\n');
    
    // Step 1: Delete existing apartments
    console.log('🗑️  Deleting existing apartments from Firestore...');
    const existingSnapshot = await db.collection('apartments').get();
    
    if (!existingSnapshot.empty) {
      const batch = db.batch();
      existingSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log(`   ✅ Deleted ${existingSnapshot.size} existing apartments\n`);
    } else {
      console.log('   ℹ️  No existing apartments to delete\n');
    }
    
    // Step 2: Read all apartments from JSON
    const apartmentsPath = path.join(__dirname, '..', 'data', 'apartments-full.json');
    const apartmentsData = JSON.parse(fs.readFileSync(apartmentsPath, 'utf8'));
    
    console.log(`📦 Found ${apartmentsData.length} apartments to migrate\n`);
    
    // Step 3: Migrate all apartments
    const batch = db.batch();
    let count = 0;
    
    for (const apartment of apartmentsData) {
      const docRef = db.collection('apartments').doc();
      
      const firestoreApartment = {
        name: apartment.name,
        type: apartment.type,
        description: apartment.description,
        maxGuests: apartment.maxGuests,
        bedrooms: apartment.bedrooms,
        bathrooms: apartment.bathrooms,
        price: apartment.pricePerNight,
        amenities: apartment.amenities,
        images: apartment.photos,
        location: apartment.location,
        available: apartment.isActive,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      batch.set(docRef, firestoreApartment);
      count++;
      
      console.log(`✅ Prepared: ${apartment.name} (₦${apartment.pricePerNight.toLocaleString()}/night)`);
    }
    
    // Commit the batch
    await batch.commit();
    
    console.log(`\n🎉 Successfully migrated ${count} apartments to Firestore!`);
    console.log('\n📊 Verifying migration...');
    
    // Verify migration
    const snapshot = await db.collection('apartments').get();
    console.log(`✅ Firestore now contains ${snapshot.size} apartments\n`);
    
    // Display all apartments
    console.log('📋 All apartments in Firestore:');
    snapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`   ${index + 1}. ${data.name} - ₦${data.price.toLocaleString()}/night`);
    });
    
    console.log('\n✨ Re-migration complete!');
    console.log('🔗 View in Firebase Console: https://console.firebase.google.com/project/lekki-stays/firestore');
    
  } catch (error) {
    console.error('❌ Re-migration failed:', error);
    process.exit(1);
  }
}

// Run re-migration
remigrate()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
