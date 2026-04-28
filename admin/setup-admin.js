require('dotenv').config();
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupAdmin() {
  console.log('\n🔐 Lekki Stays Admin Setup\n');
  console.log('This will create the first admin user for your dashboard.\n');

  try {
    // Get admin details
    const name = await question('Admin Name: ');
    const email = await question('Admin Email: ');
    const password = await question('Admin Password (min 8 characters): ');

    // Validate
    if (!name || !email || !password) {
      console.error('\n❌ All fields are required!');
      process.exit(1);
    }

    if (password.length < 8) {
      console.error('\n❌ Password must be at least 8 characters!');
      process.exit(1);
    }

    if (!email.includes('@')) {
      console.error('\n❌ Invalid email format!');
      process.exit(1);
    }

    console.log('\n⏳ Creating admin user...');

    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    // Check if admin already exists
    const existingAdmin = await db.collection('admin_users').findOne({ email: email.toLowerCase() });
    
    if (existingAdmin) {
      console.error('\n❌ Admin with this email already exists!');
      await client.close();
      process.exit(1);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS) || 10);

    // Create admin user
    const admin = {
      email: email.toLowerCase(),
      passwordHash,
      name,
      role: 'admin',
      isEmailVerified: true, // Auto-verify first admin
      loginAttempts: 0,
      lockUntil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('admin_users').insertOne(admin);

    console.log('\n✅ Admin user created successfully!');
    console.log('\n📋 Admin Details:');
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   ID: ${result.insertedId}`);
    console.log('\n🔐 You can now login at: http://localhost:3001');
    console.log('\n⚠️  Keep your credentials safe!\n');

    await client.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupAdmin();
