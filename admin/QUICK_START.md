# 🚀 Admin Dashboard - Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Prerequisites
- Firebase project created (lekki-stays)
- Firebase credentials configured
- Node.js installed

---

## 📝 Step-by-Step Setup

### 1️⃣ Enable Firebase Authentication (2 minutes)

```bash
# Go to Firebase Console
https://console.firebase.google.com/project/lekki-stays/authentication

# Steps:
1. Click "Get Started"
2. Click "Email/Password" 
3. Toggle "Enable"
4. Click "Save"
```

### 2️⃣ Create Admin User (1 minute)

```bash
# In Firebase Console → Authentication → Users
1. Click "Add User"
2. Email: admin@lekkistays.com
3. Password: [create secure password]
4. Click "Add User"
```

### 3️⃣ Update Bank Details (1 minute)

Edit `admin/src/js/dashboard.js` (around line 280):

```javascript
const message = `...
💳 PAYMENT DETAILS:
Bank: GTBank                    // ← Change this
Account Name: Lekki Stays       // ← Change this
Account Number: 0123456789      // ← Change this
...`;
```

### 4️⃣ Test Locally (1 minute)

```bash
cd admin

# Install dependencies
npm install

# Start local server
npm start

# Open browser
http://localhost:8080
```

**Login with:**
- Email: admin@lekkistays.com
- Password: [your password from step 2]

### 5️⃣ Deploy to Firebase Hosting (2 minutes)

```bash
cd admin

# Install Firebase CLI (if needed)
npm install -g firebase-tools

# Login
firebase login

# Initialize (first time only)
firebase init hosting
# Select: lekki-stays
# Public directory: src
# Single-page app: Yes
# Overwrite index.html: No

# Deploy
firebase deploy --only hosting

# Your admin dashboard is now live! 🎉
# URL: https://lekki-stays.web.app
```

---

## 🎯 Quick Test Checklist

After deployment, test these features:

- [ ] Login with admin credentials
- [ ] Dashboard loads with statistics
- [ ] Bookings list displays
- [ ] Filter bookings by status
- [ ] Search for a booking
- [ ] Confirm a pending booking
- [ ] Send payment details (WhatsApp opens)
- [ ] Mark booking as paid
- [ ] Logout works

---

## 🔧 Alternative: Deploy to Vercel

```bash
cd admin

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and you're done! 🎉
```

---

## 📱 Using the Dashboard

### Booking Workflow

```
1. New booking arrives → Status: Pending
2. Admin reviews → Click "Confirm"
3. WhatsApp opens → Send payment details
4. Guest pays → Click "Mark as Paid"
5. Guest arrives → Click "Check In"
6. Guest leaves → Click "Check Out"
7. Status: Completed ✅
```

### Quick Actions

| Action | Button Location |
|--------|----------------|
| **Refresh Data** | Top right corner |
| **Filter Status** | Below statistics |
| **Search Booking** | Next to filter |
| **Confirm Booking** | On pending booking card |
| **Send Payment** | On confirmed booking card |
| **Mark as Paid** | On confirmed booking card |
| **Check In** | On paid booking card |
| **Check Out** | On checked-in booking card |
| **Logout** | Top right corner |

---

## 🐛 Common Issues

### Can't Login
```
✅ Check: Firebase Authentication enabled
✅ Check: Admin user exists in Firebase Console
✅ Check: Using correct email/password
```

### Bookings Not Loading
```
✅ Check: Firestore has bookings collection
✅ Check: Security rules allow read access
✅ Check: Browser console for errors
```

### WhatsApp Not Opening
```
✅ Check: Guest phone number format (+234...)
✅ Check: Browser allows popups
✅ Check: WhatsApp installed or use web.whatsapp.com
```

---

## 📞 Need Help?

1. Check browser console (F12) for errors
2. Review Firebase Console logs
3. Verify Firestore security rules
4. Check `admin/ADMIN_DASHBOARD_COMPLETE.md` for detailed docs

---

## 🎉 You're Ready!

Your admin dashboard is now live and ready to manage bookings!

**Admin URL**: https://lekki-stays.web.app (or your Vercel URL)

**Login**: admin@lekkistays.com

**Happy managing! 🏨✨**
