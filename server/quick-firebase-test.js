// Quick Firebase Connection Test
require('dotenv').config();
const admin = require('firebase-admin');

console.log('🔥 Quick Firebase Test\n');

// Check environment variables
console.log('1. Checking environment variables...');
console.log('   FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? '✅' : '❌');
console.log('   FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '✅' : '❌');
console.log('   FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? '✅' : '❌');

// Initialize Firebase
try {
  console.log('\n2. Initializing Firebase Admin...');
  
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  }
  
  console.log('   ✅ Firebase Admin initialized');
  
  const db = admin.firestore();
  console.log('   ✅ Firestore instance created');
  
  console.log('\n3. Testing Firestore write...');
  
  // Quick write test with timeout
  const testPromise = db.collection('_test').doc('quick-test').set({
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    message: 'Quick test'
  });
  
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout after 10 seconds')), 10000)
  );
  
  Promise.race([testPromise, timeoutPromise])
    .then(() => {
      console.log('   ✅ Firestore write successful!');
      console.log('\n🎉 Firebase is working!\n');
      console.log('Next steps:');
      console.log('   1. Run: npm run migrate');
      console.log('   2. Run: npm run dev');
      process.exit(0);
    })
    .catch(error => {
      console.error('   ❌ Firestore test failed:', error.message);
      console.log('\n💡 Troubleshooting:');
      console.log('   - Make sure Firestore is enabled in Firebase Console');
      console.log('   - Check your internet connection');
      console.log('   - Verify service account has Firestore permissions');
      process.exit(1);
    });
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
