# ✅ Setup Checklist - Lekki Stays Booking System

## Quick Reference - Complete These Steps

---

## 🗄️ MongoDB Configuration

### Step 1: Create MongoDB Atlas Account
- [ ] Go to https://cloud.mongodb.com
- [ ] Sign up with email or Google
- [ ] Verify email

### Step 2: Create Cluster
- [ ] Click "Build a Database"
- [ ] Select "Shared" (Free tier)
- [ ] Choose region: Frankfurt or London
- [ ] Wait for deployment (3-5 minutes)

### Step 3: Create Database User
- [ ] Username: `lekkistays`
- [ ] Click "Autogenerate Secure Password"
- [ ] **COPY AND SAVE PASSWORD** ⚠️
- [ ] Click "Create User"

### Step 4: Configure Network Access
- [ ] Click "Network Access"
- [ ] Click "Add IP Address"
- [ ] Select "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Click "Confirm"

### Step 5: Get Connection String
- [ ] Click "Database" → "Connect"
- [ ] Choose "Connect your application"
- [ ] Copy connection string
- [ ] Replace `<password>` with your actual password
- [ ] Add `/lekki-stays` before the `?`

**Your connection string should look like:**
```
mongodb+srv://lekkistays:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lekki-stays?retryWrites=true&w=majority
```

---

## 🔧 Local Configuration

### Step 6: Update server/.env
- [ ] Open `server/.env` in your editor
- [ ] Update `MONGODB_URI` with your connection string
- [ ] Verify `BASE_URL=http://localhost:3000`
- [ ] Save the file

### Step 7: Generate Admin Key
- [ ] Open terminal
- [ ] Run: `cd server`
- [ ] Run: `node generate-admin-key.js`
- [ ] Copy the generated key
- [ ] Update `ADMIN_KEY` in `server/.env`
- [ ] Save the file

### Step 8: Verify Configuration
Your `server/.env` should have:
- [ ] `MONGODB_URI` with real connection string
- [ ] `BASE_URL=http://localhost:3000`
- [ ] `HOST_WHATSAPP_NUMBER=+2349039269846`
- [ ] `ADMIN_KEY` with secure random key
- [ ] Bank details verified

---

## 🧪 Testing

### Step 9: Start Server
- [ ] Open terminal
- [ ] Run: `cd server`
- [ ] Run: `npm install` (if not done already)
- [ ] Run: `npm start`
- [ ] Verify: "Connected to MongoDB successfully" message

### Step 10: Test Booking Flow
- [ ] Open browser: http://localhost:3000
- [ ] Click on an apartment
- [ ] Select dates (tomorrow and day after)
- [ ] Click "Book Now"
- [ ] Fill in form with test data
- [ ] Submit booking
- [ ] Check server console for success messages

### Step 11: Test WhatsApp Link
- [ ] Copy WhatsApp URL from server console
- [ ] Paste in browser
- [ ] Verify WhatsApp opens with formatted message
- [ ] Check message contains:
  - [ ] Booking details
  - [ ] Confirm link
  - [ ] Decline link
  - [ ] Cancel link

### Step 12: Test Confirmation
- [ ] Copy confirm link from WhatsApp message
- [ ] Paste in browser
- [ ] Verify confirmation page loads
- [ ] Check page shows:
  - [ ] Green checkmark
  - [ ] Booking details
  - [ ] Bank information
  - [ ] "Send Payment Details" button
- [ ] Click "Send Payment Details"
- [ ] Verify WhatsApp opens with payment message

### Step 13: Verify Database
- [ ] Go to MongoDB Atlas dashboard
- [ ] Click "Database" → "Browse Collections"
- [ ] Verify `lekki-stays` database exists
- [ ] Click on `bookings` collection
- [ ] Verify your test booking is there

---

## 🚀 Production Deployment (Optional)

### Step 14: Prepare for Vercel
- [ ] Commit changes to Git
- [ ] Push to GitHub
- [ ] Go to https://vercel.com
- [ ] Import your repository

### Step 15: Configure Vercel
- [ ] Set Framework Preset: Other
- [ ] Set Root Directory: `./`
- [ ] Set Build Command: `cd server && npm install`
- [ ] Set Output Directory: `server`

### Step 16: Add Environment Variables
Add these in Vercel project settings:
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI=` (your connection string)
- [ ] `HOST_WHATSAPP_NUMBER=+2349039269846`
- [ ] `BASE_URL=` (your Vercel domain)
- [ ] `BANK_NAME=GTBank`
- [ ] `BANK_ACCOUNT_NUMBER=9039269846`
- [ ] `BANK_ACCOUNT_NAME=Lekki Stays Ltd`
- [ ] `ADMIN_KEY=` (your secure key)

### Step 17: Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Visit your Vercel URL
- [ ] Test booking flow on production

---

## 📋 Final Verification

### System Health Check
- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] Bookings are saved to database
- [ ] WhatsApp links are generated
- [ ] Confirmation links work
- [ ] Decline links work
- [ ] Payment details are sent
- [ ] All environment variables set

### Security Check
- [ ] ADMIN_KEY is secure random string
- [ ] MongoDB password is strong
- [ ] .env file is in .gitignore
- [ ] No sensitive data in Git
- [ ] Network access configured

### Functionality Check
- [ ] Guest can create booking
- [ ] Host receives WhatsApp notification
- [ ] Confirmation link works
- [ ] Decline link works
- [ ] Cancel link works
- [ ] Payment instructions sent
- [ ] Database updates correctly

---

## 🎉 Completion Status

### Local Development
- [ ] MongoDB configured
- [ ] Environment variables set
- [ ] Server running successfully
- [ ] Booking flow tested
- [ ] WhatsApp integration working

### Production (if deployed)
- [ ] Vercel deployment successful
- [ ] Environment variables configured
- [ ] Production booking tested
- [ ] WhatsApp links working on production

---

## 📚 Documentation Reference

If you need help with any step:

1. **MongoDB Setup**: See `MONGODB_SETUP_GUIDE.md`
2. **Quick Start**: See `QUICK_START_GUIDE.md`
3. **System Analysis**: See `WHATSAPP_CONFIRMATION_ANALYSIS.md`
4. **Fixes Applied**: See `FIXES_APPLIED_SUMMARY.md`
5. **Critical Issues**: See `CRITICAL_FIXES_NEEDED.md`

---

## 🆘 Common Issues

### "MongoServerError: bad auth"
→ Password is incorrect in MONGODB_URI

### "Connection timeout"
→ Network access not configured (add 0.0.0.0/0)

### "WhatsApp link doesn't work"
→ Check BASE_URL and ADMIN_KEY in .env

### "Confirmation link shows Access Denied"
→ ADMIN_KEY in URL must match .env

### "Can't connect to server"
→ Check if port 3000 is available

---

## ✅ You're Done When...

- [x] All checkboxes above are checked
- [x] Server starts without errors
- [x] Test booking created successfully
- [x] WhatsApp links work
- [x] Confirmation flow tested
- [x] Data appears in MongoDB

**Congratulations! Your booking system is ready! 🎉**

---

## 📞 Next Steps

1. Create real bookings
2. Monitor MongoDB for data
3. Test with real phone numbers
4. Deploy to production when ready
5. Share your website with customers!

**Your WhatsApp booking system is now live and operational!** 🚀
