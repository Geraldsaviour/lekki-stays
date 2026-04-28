# MongoDB + Vercel Deployment Guide

## Quick Start

This guide walks you through deploying the Lekki Stays booking platform with MongoDB Atlas (free) and Vercel.

## Prerequisites

- GitHub account
- Vercel account (free)
- MongoDB Atlas account (free)

## Part 1: MongoDB Atlas Setup (5 minutes)

### 1.1 Create MongoDB Atlas Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with email or Google
4. Verify email

### 1.2 Create Free Cluster
1. Click "Create a Deployment"
2. Select "M0 Free" tier
3. Choose cloud provider and region
4. Click "Create Deployment"
5. Wait 2-3 minutes for cluster creation

### 1.3 Create Database User
1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `lekki-stays`
4. Password: Create a strong password (save it!)
5. Click "Add User"

### 1.4 Allow Network Access
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Select "Allow access from anywhere"
4. Click "Confirm"

### 1.5 Get Connection String
1. Click "Databases"
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Choose "Node.js" version "4.x or later"
5. Copy the connection string
6. Replace `<password>` with your database user password

Example:
```
mongodb+srv://lekki-stays:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lekki-stays?retryWrites=true&w=majority
```

## Part 2: Local Testing (10 minutes)

### 2.1 Update Environment Variables
Edit `server/.env`:
```
MONGODB_URI=mongodb+srv://lekki-stays:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lekki-stays?retryWrites=true&w=majority
```

### 2.2 Install Dependencies
```bash
cd server
npm install
```

### 2.3 Test Connection
```bash
npm start
```

Expected output:
```
✅ Connected to MongoDB successfully
✅ Database indexes created
✅ Database initialized successfully
🏨 Lekki Stays server running on port 3000
```

### 2.4 Test Booking Creation
1. Open browser: http://localhost:3000
2. Create a test booking
3. Check MongoDB Atlas Dashboard → Collections to verify data

## Part 3: Vercel Deployment (10 minutes)

### 3.1 Push to GitHub
```bash
git add .
git commit -m "Integrate MongoDB Atlas for persistent storage"
git push origin main
```

### 3.2 Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"

### 3.3 Add Environment Variables
1. In Vercel project settings, go to "Environment Variables"
2. Add new variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string
   - Environments: Production, Preview, Development
3. Click "Save"

### 3.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete (2-3 minutes)
3. Visit your Vercel domain

## Part 4: Verify Deployment

### 4.1 Test API Health
```bash
curl https://your-domain.vercel.app/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-04-28T...",
  "environment": "production"
}
```

### 4.2 Test Booking Creation
1. Visit your Vercel domain
2. Create a test booking
3. Check MongoDB Atlas Dashboard for the booking

### 4.3 Monitor Logs
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click latest deployment
5. Click "Logs" tab

## Part 5: Production Checklist

- [ ] MongoDB connection string is secure (not in code)
- [ ] Environment variables set in Vercel
- [ ] Booking creation works end-to-end
- [ ] Data persists in MongoDB
- [ ] Error handling is working
- [ ] WhatsApp notifications configured
- [ ] Admin key is strong and secret
- [ ] CORS is properly configured

## Troubleshooting

### Booking Creation Fails
1. Check Vercel logs for error messages
2. Verify MongoDB connection string in Vercel env vars
3. Check MongoDB Atlas Network Access allows Vercel IPs
4. Verify database user credentials

### Connection Timeout
1. Check MongoDB Atlas status page
2. Verify IP whitelist includes "Allow access from anywhere"
3. Test connection locally first

### Data Not Persisting
1. Verify MongoDB connection string is correct
2. Check MongoDB Atlas dashboard for data
3. Ensure database user has write permissions

## Monitoring

### MongoDB Atlas Dashboard
- View storage usage
- Monitor query performance
- Check backup status
- Set up alerts

### Vercel Dashboard
- Monitor function execution time
- Check error rates
- View deployment history
- Review environment variables

## Scaling

### When to Upgrade MongoDB
- Storage exceeds 512 MB
- Need more than 512 MB
- Require higher performance

### Upgrade Steps
1. Go to MongoDB Atlas Dashboard
2. Click "Upgrade" on cluster
3. Choose M2 or higher tier
4. Billing starts immediately

## Cost Breakdown

- **MongoDB Atlas M0:** Free
- **Vercel:** Free (up to 100 GB bandwidth/month)
- **Total:** $0/month

## Next Steps

1. Set up booking confirmation emails
2. Add payment processing
3. Create admin dashboard
4. Set up automated backups
5. Monitor performance metrics

## Support Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Node.js MongoDB Driver](https://www.mongodb.com/docs/drivers/node/)

## Quick Reference

### Useful Commands

```bash
# Test local connection
npm start

# Deploy to Vercel
git push origin main

# View Vercel logs
vercel logs

# Check MongoDB connection
curl https://your-domain.vercel.app/api/health
```

### Important URLs

- MongoDB Atlas: https://cloud.mongodb.com
- Vercel Dashboard: https://vercel.com/dashboard
- Your App: https://your-domain.vercel.app

### Key Files

- `server/db-mongo.js` - MongoDB connection
- `server/models/Booking.js` - Booking model
- `server/models/Apartment.js` - Apartment model
- `server/.env` - Environment variables
