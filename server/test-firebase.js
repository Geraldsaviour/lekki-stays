// Test Firebase Connection
require('dotenv').config();
const { db, admin } = require('./firebase-admin');

async function testFirebaseConnection() {
  console.log('🔥 Testing Firebase Connection...\n');
  
  try {
    // Test 1: Check environment variables
    console.log('📋 Step 1: Checking environment variables...');
    const requiredVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY', 'FIREBASE_CLIENT_EMAIL'];
    const missing = requiredVars.filter(v => !process.env[v]);
    
    if (missing.length > 0) {
      console.error('❌ Missing environment variables:', missing.join(', '));
      console.log('\n💡 Add these to your server/.env file');
      process.exit(1);
    }
    console.log('✅ All environment variables present\n');
    
    // Test 2: Test Firestore connection
    console.log('📋 Step 2: Testing Firestore connection...');
    const testDoc = await db.collection('_test').doc('connection').set({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      message: 'Connection test successful'
    });
    console.log('✅ Firestore connection successful\n');
    
    // Test 3: Read from Firestore
    console.log('📋 Step 3: Testing Firestore read...');
    const doc = await db.collection('_test').doc('connection').get();
    if (doc.exists) {
      console.log('✅ Firestore read successful');
      console.log('   Data:', doc.data());
    }
    console.log('');
    
    // Test 4: Check apartments collection
    console.log('📋 Step 4: Checking apartments collection...');
    const apartmentsSnapshot = await db.collection('apartments').limit(1).get();
    
    if (apartmentsSnapshot.empty) {
      console.log('⚠️  No apartments found in Firestore');
      console.log('   Run: npm run migrate');
    } else {
      console.log('✅ Apartments collection exists');
      console.log(`   Found ${apartmentsSnapshot.size} apartment(s)`);
    }
    console.log('');
    
    // Test 5: Check bookings collection
    console.log('📋 Step 5: Checking bookings collection...');
    const bookingsSnapshot = await db.collection('bookings').limit(1).get();
    
    if (bookingsSnapshot.empty) {
      console.log('ℹ️  No bookings yet (this is normal for new setup)');
    } else {
      console.log('✅ Bookings collection exists');
      console.log(`   Found ${bookingsSnapshot.size} booking(s)`);
    }
    console.log('');
    
    // Clean up test document
    await db.collection('_test').doc('connection').delete();
    
    // Summary
    console.log('🎉 Firebase Connection Test Complete!\n');
    console.log('✅ All tests passed');
    console.log('✅ Firebase is ready to use\n');
    
    console.log('📊 Next steps:');
    if (apartmentsSnapshot.empty) {
      console.log('   1. Run: npm run migrate (to import apartments)');
      console.log('   2. Run: npm run dev (to start server)');
    } else {
      console.log('   1. Run: npm run dev (to start server)');
      console.log('   2. Visit: http://localhost:3000');
    }
    
  } catch (error) {
    console.error('\n❌ Firebase Connection Test Failed!\n');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure Firestore is enabled in Firebase Console');
    console.error('   2. Check your service account credentials in .env');
    console.error('   3. Verify FIREBASE_PRIVATE_KEY has proper newlines');
    console.error('   4. Make sure you have internet connection\n');
    process.exit(1);
  }
}

// Run test
testFirebaseConnection()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
