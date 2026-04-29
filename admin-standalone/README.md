# 🏨 Lekki Stays - Admin Dashboard

> Firebase-powered admin dashboard for managing bookings and properties

## ✅ What This Is

This is the **standalone admin dashboard** that connects directly to Firebase. No backend server needed!

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd admin-standalone
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:3001**

### 3. Login

Use your Firebase admin credentials:
- Email: `admin@lekkistays.com` (or your admin email)
- Password: (your Firebase password)

## 🔧 Setup Requirements

### Firebase Configuration

1. **Enable Firebase Authentication:**
   - Go to [Firebase Console](https://console.firebase.google.com/project/lekki-stays/authentication)
   - Click "Get Started"
   - Enable "Email/Password" sign-in method

2. **Create Admin User:**
   - Go to Authentication → Users
   - Click "Add user"
   - Email: `admin@lekkistays.com`
   - Password: (create a strong password)
   - Save credentials securely

3. **Firestore Security Rules:**
   
   Go to Firestore → Rules and update:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       function isAuthenticated() {
         return request.auth != null;
       }
       
       // Apartments - public read, admin write
       match /apartments/{apartmentId} {
         allow read: if true;
         allow write: if isAuthenticated();
       }
       
       // Bookings - public create, admin read/update
       match /bookings/{bookingId} {
         allow create: if true;
         allow read, update: if isAuthenticated();
       }
     }
   }
   ```

## 📁 Project Structure

```
admin-standalone/
├── css/
│   ├── admin.css          # Base styles + login page
│   └── dashboard.css      # Dashboard layout & components
├── js/
│   └── dashboard.js       # Firebase connection & logic
├── index.html             # Login page
├── dashboard.html         # Dashboard page
├── firebase-config.js     # Firebase configuration
├── package.json           # Dependencies
└── README.md              # This file
```

## 🎯 Features

### Current Features
- ✅ Secure Firebase Authentication
- ✅ Real-time booking data from Firestore
- ✅ View all bookings with status filters
- ✅ View all apartments
- ✅ Statistics dashboard (total, pending, confirmed)
- ✅ Responsive design
- ✅ No backend server required

### Dashboard Sections
1. **Overview** - Statistics and recent bookings
2. **Bookings** - All bookings with filters
3. **Apartments** - All properties
4. **Settings** - Account info and Firebase status

## 🌐 Deployment Options

### Option 1: Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (from project root, not admin-standalone)
firebase init hosting

# Select:
# - Use existing project: lekki-stays
# - Public directory: admin-standalone
# - Single-page app: No
# - Overwrite files: No

# Deploy
firebase deploy --only hosting
```

**Live URL:** `https://lekki-stays.web.app`

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from admin-standalone folder
cd admin-standalone
vercel --prod
```

### Option 3: Netlify

1. Push to GitHub
2. Go to [Netlify](https://netlify.com)
3. New site from Git
4. Select repository
5. Build settings:
   - Base directory: `admin-standalone`
   - Publish directory: `admin-standalone`
6. Deploy

## 🔐 Security

### Authentication
- Firebase Authentication handles all security
- Only authenticated users can access dashboard
- Automatic redirect to login if not authenticated

### Firestore Rules
- Public can CREATE bookings (from main website)
- Admins can READ and UPDATE bookings
- Admins can UPDATE apartments

### Best Practices
- ✅ Use strong passwords
- ✅ Enable 2FA in Firebase Console
- ✅ Limit admin users
- ✅ Monitor authentication logs
- ✅ Review Firestore security rules regularly

## 🆘 Troubleshooting

### "Permission denied" errors
→ Check Firestore security rules  
→ Verify you're logged in with admin account  
→ Ensure admin user exists in Firebase Authentication

### "Network error" on login
→ Check Firebase configuration in `firebase-config.js`  
→ Verify Firebase Authentication is enabled  
→ Check browser console for errors

### Dashboard not loading data
→ Check browser console for errors  
→ Verify Firestore has data (apartments and bookings collections)  
→ Check Firestore security rules  
→ Ensure you're logged in

### Can't login
→ Verify admin user exists in Firebase Console  
→ Check email and password  
→ Try password reset in Firebase Console  
→ Check browser console for auth errors

## 📊 Firebase Collections

### Apartments Collection
```javascript
{
  id: "1",
  name: "Luxury 2BR Apartment",
  price: 45000,
  bedrooms: 2,
  bathrooms: 2,
  maxGuests: 4,
  location: "Lekki Phase 1",
  images: ["url1", "url2"],
  amenities: ["WiFi", "Pool", "Kitchen"],
  // ... other fields
}
```

### Bookings Collection
```javascript
{
  id: "booking_123",
  apartmentId: "1",
  guestName: "John Doe",
  guestEmail: "john@example.com",
  guestPhone: "+234...",
  checkIn: Timestamp,
  checkOut: Timestamp,
  guests: 2,
  totalPrice: 90000,
  status: "pending", // pending, confirmed, paid, cancelled
  paymentMethod: "bank_transfer",
  bookingReference: "BK-123456",
  createdAt: Timestamp,
  // ... other fields
}
```

## 🔗 Related

- **Main Website:** `../public/` (booking platform)
- **Server:** `../server/` (API server)
- **Firebase Console:** https://console.firebase.google.com/project/lekki-stays

## 📝 Notes

- This is a **client-side only** application
- All data comes directly from Firebase
- No backend server required for admin dashboard
- Firebase credentials in `firebase-config.js` are safe to expose (client-side keys)

## 📧 Support

For issues or questions:
- Check Firebase Console logs
- Check browser console for errors
- Review Firestore security rules
- Verify admin user exists

---

**Version:** 1.0.0  
**Last Updated:** April 29, 2026  
**Status:** ✅ Production Ready
