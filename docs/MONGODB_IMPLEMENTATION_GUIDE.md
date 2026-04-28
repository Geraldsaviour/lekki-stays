# MongoDB Implementation Guide - From Scratch

## Overview
This guide walks you through implementing MongoDB for the Lekki Stays booking platform, replacing the current SQLite database.

## Prerequisites
- Node.js installed
- MongoDB Atlas account (free tier) OR local MongoDB installation

---

## Step 1: Get MongoDB Connection String

### Option A: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new cluster (free M0 tier)

2. **Configure Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

3. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP for better security

4. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Option B: Local MongoDB

1. **Install MongoDB**
   - Download from https://www.mongodb.com/try/download/community
   - Install and start MongoDB service
   - Default connection: `mongodb://localhost:27017`

---

## Step 2: Configure Environment Variables

Update your `server/.env` file:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lekki-stays?retryWrites=true&w=majority
DB_NAME=lekki-stays

# Server Configuration
PORT=3000
NODE_ENV=development

# WhatsApp Configuration (optional)
WHATSAPP_API_KEY=your_api_key_here
WHATSAPP_PHONE_NUMBER=your_phone_number
```

**Important**: Replace `username` and `password` with your actual MongoDB credentials!

---

## Step 3: Database Models

MongoDB uses collections (like tables) and documents (like rows). We'll create two main models:

### Apartment Model
```javascript
{
  _id: ObjectId,
  name: String,
  location: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String],
  images: [String],
  description: String,
  maxGuests: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```javascript
{
  _id: ObjectId,
  apartmentId: ObjectId,
  guestName: String,
  guestEmail: String,
  guestPhone: String,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalPrice: Number,
  status: String, // 'pending', 'confirmed', 'cancelled'
  createdAt: Date,
  updatedAt: Date
}
```

---

## Step 4: Implementation Files

The following files will be created/updated:

1. **server/db-mongo.js** - MongoDB connection handler
2. **server/models/Apartment.js** - Apartment schema and model
3. **server/models/Booking.js** - Booking schema and model
4. **server/init-db.js** - Database initialization script
5. **server/server.js** - Updated to use MongoDB

---

## Step 5: Testing the Connection

After setup, test your connection:

```bash
cd server
node init-db.js
```

This will:
- Connect to MongoDB
- Create collections
- Seed initial apartment data
- Verify the connection works

---

## Step 6: Start the Server

```bash
cd server
npm start
```

The server will:
- Connect to MongoDB on startup
- Log connection status
- Be ready to handle bookings

---

## Common Issues & Solutions

### Issue: "MongoServerError: bad auth"
**Solution**: Check your username and password in MONGODB_URI

### Issue: "MongooseServerSelectionError: connect ECONNREFUSED"
**Solution**: 
- Check your internet connection
- Verify IP whitelist in MongoDB Atlas
- Ensure connection string is correct

### Issue: "Database connection failed"
**Solution**:
- Verify MONGODB_URI in .env file
- Check if MongoDB service is running (local)
- Test connection string in MongoDB Compass

### Issue: "Cannot find module 'mongoose'"
**Solution**: Run `npm install` in server directory

---

## Verification Checklist

- [ ] MongoDB Atlas cluster created (or local MongoDB running)
- [ ] Database user created with read/write permissions
- [ ] IP address whitelisted (0.0.0.0/0 for development)
- [ ] Connection string copied to server/.env
- [ ] Dependencies installed (mongodb, mongoose)
- [ ] init-db.js runs successfully
- [ ] Server starts without errors
- [ ] Can view apartments on website
- [ ] Can create bookings
- [ ] Bookings appear in MongoDB Atlas (Data Explorer)

---

## Next Steps

1. Test apartment listing page
2. Test booking creation
3. Test booking retrieval
4. Set up admin dashboard to view bookings
5. Deploy to Vercel with MongoDB connection

---

## MongoDB vs SQLite Differences

| Feature | SQLite | MongoDB |
|---------|--------|---------|
| Type | Relational (SQL) | Document (NoSQL) |
| Storage | Local file | Cloud/Local server |
| Queries | SQL syntax | JavaScript objects |
| Scaling | Single file | Distributed clusters |
| Deployment | File-based | Connection string |

---

## Resources

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Mongoose Docs: https://mongoosejs.com/docs/guide.html
- MongoDB University: https://university.mongodb.com/ (free courses)
