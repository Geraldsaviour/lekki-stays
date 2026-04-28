# 🚀 Quick Start Guide - WhatsApp Booking System

## Get Your System Running in 15 Minutes

---

## Step 1: Set Up MongoDB Atlas (5 minutes)

### 1.1 Create Free Account
1. Go to https://cloud.mongodb.com
2. Click "Try Free"
3. Sign up with email or Google

### 1.2 Create Cluster
1. Choose "Free" tier (M0)
2. Select region closest to Nigeria (e.g., Frankfurt or London)
3. Click "Create Cluster"
4. Wait 3-5 minutes for cluster to deploy

### 1.3 Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `lekkistays`
5. Password: Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.4 Allow Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### 1.5 Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `lekki-stays`

**Example**:
```
mongodb+srv://lekkistays:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lekki-stays?retryWrites=true&w=majority
```

---

## Step 2: Update Environment Variables (2 minutes)

### 2.1 Update `server/.env`

Open `server/.env` and update:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://lekkistays:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lekki-stays?retryWrites=true&w=majority

# Base URL (for local testing)
BASE_URL=http://localhost:3000

# WhatsApp Configuration (verify this is correct)
HOST_WHATSAPP_NUMBER=+2349039269846

# Bank Details (verify these are correct)
BANK_NAME=GTBank
BANK_ACCOUNT_NUMBER=9039269846
BANK_ACCOUNT_NAME=Lekki Stays Ltd

# Admin Security Key (CHANGE THIS!)
ADMIN_KEY=your-super-secret-key-change-this-now-12345
```

**Important**: Change the `ADMIN_KEY` to something secure and random!

---

## Step 3: Test Locally (5 minutes)

### 3.1 Start Server
```bash
cd server
npm install  # If you haven't already
npm start
```

You should see:
```
🏨 Lekki Stays server running on port 3000
🌐 Visit: http://localhost:3000
📱 WhatsApp: +2349039269846
```

### 3.2 Open Browser
```
http://localhost:3000
```

### 3.3 Create Test Booking
1. Click on any apartment
2. Select dates (tomorrow and day after)
3. Select number of guests
4. Click "Book Now"
5. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 08012345678
   - How did you hear about us: Instagram
6. Click "Confirm Booking"

### 3.4 Check Console
Look at your terminal where the server is running. You should see:
```
📝 Booking request received: {...}
✅ Apartment found: Haven Lekki - Studio
🔄 Creating booking with ID: LUX123456ABC
✅ Booking created successfully: LUX123456ABC
📱 Notification triggered: booking-created
```

### 3.5 Check WhatsApp Link
In the server console, you should see a WhatsApp URL. Copy it and paste in your browser. It should open WhatsApp with a formatted message containing:
- Booking details
- Confirm link
- Decline link
- Cancel link

---

## Step 4: Test Confirmation Flow (3 minutes)

### 4.1 Click Confirm Link
From the WhatsApp message (or console), copy the confirm link. It looks like:
```
http://localhost:3000/api/bookings/LUX123456ABC/confirm?token=abc123&admin=your-admin-key
```

Paste it in your browser.

### 4.2 Verify Confirmation Page
You should see a beautiful confirmation page with:
- ✅ Green checkmark
- "Booking Confirmed" heading
- Booking details
- Bank account information
- "Send Payment Details to Guest" button

### 4.3 Click "Send Payment Details"
This should open WhatsApp with a pre-filled message for the guest containing:
- Booking confirmation
- Payment instructions
- Bank details
- Payment reference

---

## Step 5: Deploy to Vercel (Optional - Production)

### 5.1 Push to GitHub
```bash
git add .
git commit -m "Configure WhatsApp booking system"
git push
```

### 5.2 Connect to Vercel
1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: `cd server && npm install`
   - Output Directory: `server`

### 5.3 Add Environment Variables
In Vercel project settings, add these environment variables:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://lekkistays:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lekki-stays?retryWrites=true&w=majority
HOST_WHATSAPP_NUMBER=+2349039269846
BASE_URL=https://your-project.vercel.app
BANK_NAME=GTBank
BANK_ACCOUNT_NUMBER=9039269846
BANK_ACCOUNT_NAME=Lekki Stays Ltd
ADMIN_KEY=your-super-secret-key-change-this-now-12345
```

**Important**: Update `BASE_URL` to your actual Vercel domain!

### 5.4 Deploy
Click "Deploy" and wait for deployment to complete.

### 5.5 Test Production
1. Visit your Vercel URL
2. Create a test booking
3. Check that WhatsApp links work
4. Test confirmation flow

---

## 🎉 You're Done!

Your WhatsApp booking system is now live!

---

## 📱 How It Works for Real Users

### For Guests:
1. Guest visits your website
2. Selects apartment and dates
3. Fills booking form
4. Submits booking
5. Sees success message
6. (Optional) WhatsApp opens with booking details

### For You (Host):
1. You receive WhatsApp message with:
   - Guest details
   - Booking information
   - Three clickable links
2. You click ✅ **Confirm** link
3. Browser opens with confirmation page
4. You click "Send Payment Details to Guest"
5. WhatsApp opens with payment message
6. You send it to guest
7. Guest pays and sends receipt
8. You verify payment
9. Done!

### If You Need to Decline:
1. Click ❌ **Decline** link from original message
2. Browser opens with decline page
3. Click "Notify Guest on WhatsApp"
4. WhatsApp opens with decline message
5. Send to guest
6. Dates become available again

### If Guest Doesn't Pay:
1. Click 🚫 **Cancel** link from original message
2. Browser opens with cancellation page
3. Booking is cancelled
4. Dates become available again

---

## 🔧 Troubleshooting

### "Failed to create booking"
- Check MongoDB connection string is correct
- Verify database user has read/write permissions
- Check network access allows your IP

### "WhatsApp link doesn't work"
- Verify HOST_WHATSAPP_NUMBER is in correct format (+234...)
- Check BASE_URL is correct for your environment
- Ensure ADMIN_KEY matches in .env

### "Confirmation link shows Access Denied"
- Verify ADMIN_KEY in URL matches ADMIN_KEY in .env
- Check token is included in URL
- Ensure booking ID is correct

### "Can't connect to server"
- Check server is running (`npm start`)
- Verify port 3000 is not in use
- Check firewall settings

---

## 📞 Support

If you encounter issues:
1. Check server console for error messages
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Review the documentation files:
   - WHATSAPP_CONFIRMATION_ANALYSIS.md
   - CRITICAL_FIXES_NEEDED.md
   - FIXES_APPLIED_SUMMARY.md

---

## 🎯 Next Steps

### Recommended Enhancements:
1. **Create Admin Dashboard** - View all bookings in one place
2. **Add Email Notifications** - Backup for WhatsApp
3. **Payment Confirmation Endpoint** - Mark bookings as paid
4. **Booking Expiry** - Auto-cancel unpaid bookings after 24 hours
5. **Guest Booking Lookup** - Let guests check their booking status

### Security Improvements:
1. Change ADMIN_KEY to a long random string
2. Set up IP whitelist for MongoDB
3. Enable 2FA on MongoDB Atlas account
4. Regular database backups
5. Monitor failed authentication attempts

---

## ✅ Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access configured
- [ ] Connection string updated in .env
- [ ] BASE_URL set correctly
- [ ] ADMIN_KEY changed to secure value
- [ ] Server starts without errors
- [ ] Test booking created successfully
- [ ] WhatsApp link generated
- [ ] Confirmation link works
- [ ] Confirmation page displays correctly
- [ ] Payment details message generated
- [ ] Decline link works
- [ ] System tested end-to-end

---

**Congratulations! Your WhatsApp booking system is ready to accept real bookings! 🎉**
