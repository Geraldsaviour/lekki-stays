#!/usr/bin/env node

/**
 * Generate a secure random admin key for the booking system
 * Run this script to generate a new admin key
 */

const crypto = require('crypto');

// Generate a secure random key
const adminKey = crypto.randomBytes(32).toString('hex');

console.log('\n🔐 Generated Secure Admin Key:\n');
console.log('━'.repeat(80));
console.log(adminKey);
console.log('━'.repeat(80));
console.log('\n📋 Copy this key and update your server/.env file:');
console.log(`ADMIN_KEY=${adminKey}`);
console.log('\n⚠️  Keep this key secret and never commit it to version control!\n');
