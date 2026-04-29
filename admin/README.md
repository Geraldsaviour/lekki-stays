# 🏨 Lekki Stays - Admin Dashboard

> Standalone admin dashboard for managing Lekki Stays bookings and properties

## 🌟 Features

- ✅ **Firebase Authentication** - Secure admin login
- ✅ **Real-time Data** - Direct Firestore connection
- ✅ **Booking Management** - View, confirm, decline bookings
- ✅ **Property Management** - View all apartments
- ✅ **Statistics Dashboard** - Overview of bookings and revenue
- ✅ **No Backend Required** - Pure frontend application

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (for local development server)
- Firebase project with:
  - Authentication enabled (Email/Password)
  - Firestore database
  - Admin user created

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/lekki-stays-admin.git
cd lekki-stays-admin

# Install dependencies (optional - only for dev server)
npm install

# Start development server
npm run dev
```

Visit: **http://localhost:3001**

## 🔧 Configuration

### Firebase Setup

1. **Enable Firebase Authentication:**
   - Go to [Firebase Console](https://console.firebase.google.com/project/lekki-stays/authentication)
   - Enable "Email/Password" sign-in method

2. **Create Admin User:**
   - Go to Authentication → Users
   - Click "Add user"
   - Enter email and password
   - Save credentials securely

3. **Update Firestore Rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       function isAuthenticated() {
         return request.auth != null;
       }
       
       match /apartments/{apartmentId} {
         allow read: if true;
         allow write: if isAuthenticated();
       }
       
       match /bookings/{bookingId} {
         allow create: if true;
         allow read, update: if isAuthenticated();
       }
     }
   }
   ```

### Firebase Configuration

The Firebase config is in `firebase-config.js`:

```javascript
export const firebaseConfig = {
  apiKey: "AIzaSyA8moQvtYRObBsuNlU52uN9nDIXCCq0Mfs",
  authDomain: "lekki-stays.firebaseapp.com",
  projectId: "lekki-stays",
  storageBucket: "lekki-stays.firebasestorage.app",
  messagingSenderId: "879597470658",
  appId: "1:879597470658:web:9dce2da8c0413ba01e0c5b"
};
```

**Note:** These are client-side credentials and safe to expose publicly.

## 📁 Project Structure

```
lekki-stays-admin/
├── src/
│   ├── css/
│   │   ├── auth.css          # Login page styles
│   │   └── dashboard.css     # Dashboard styles
│   ├── js/
│   │   ├── auth.js           # Firebase authentication
│   │   └── dashboard.js      # Dashboard logic
│   ├── login.html            # Login page
│   └── dashboard.html        # Dashboard page
├── firebase-config.js        # Firebase configuration
├── package.json
├── .gitignore
└── README.md
```

## 🌐 Deployment

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting
firebase init hosting

# Select:
# - Use existing project: lekki-stays
# - Public directory: src
# - Single-page app: No
# - Overwrite files: No

# Deploy
firebase deploy --only hosting
```

Your admin dashboard will be live at: **https://lekki-stays.web.app**

### Deploy to Netlify

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Set build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `src`
6. Click "Deploy site"

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🔐 Security

### Authentication
- Firebase Authentication handles all security
- Only authenticated users can access dashboard
- Automatic redirect to login if not authenticated

### Firestore Rules
- Public can only CREATE bookings
- Admins can READ and UPDATE bookings
- Admins can UPDATE apartments

### Best Practices
- ✅ Use strong passwords for admin accounts
- ✅ Enable 2FA in Firebase Console
- ✅ Limit admin users to only those who need access
- ✅ Monitor authentication logs regularly

## 📊 Features

### Current Features
- ✅ Secure login with Firebase Authentication
- ✅ View all bookings with filters
- ✅ Search bookings by ID, name, email
- ✅ View booking details
- ✅ View all apartments
- ✅ Statistics dashboard

### Coming Soon
- ⏳ Update booking status
- ⏳ Confirm/decline bookings
- ⏳ Send WhatsApp notifications
- ⏳ Mark bookings as paid
- ⏳ Check-in/check-out management
- ⏳ Revenue analytics

## 🆘 Troubleshooting

### "Permission denied" errors
→ Check Firestore security rules  
→ Verify you're logged in with admin account

### "Network error" on login
→ Check Firebase configuration  
→ Verify Firebase Authentication is enabled

### Dashboard not loading data
→ Check browser console for errors  
→ Verify Firestore has data  
→ Check security rules

### Can't login
→ Verify admin user exists in Firebase  
→ Check email and password  
→ Try resetting password in Firebase Console

## 📚 Documentation

- **Setup Guide:** [FIREBASE_ADMIN_SETUP.md](FIREBASE_ADMIN_SETUP.md)
- **Firebase Console:** https://console.firebase.google.com/project/lekki-stays
- **Firebase Auth Docs:** https://firebase.google.com/docs/auth
- **Firestore Docs:** https://firebase.google.com/docs/firestore

## 🤝 Contributing

This is a private admin dashboard. Only authorized developers should have access.

## 📝 License

Private - All rights reserved

## 🔗 Related Projects

- **Main Website:** [lekki-stays](https://github.com/YOUR_USERNAME/lekki-stays)
- **Backend Server:** (if separate)

## 📧 Support

For issues or questions, contact: admin@lekkistays.com

---

**Version:** 1.0.0  
**Last Updated:** April 29, 2026  
**Status:** ✅ Production Ready
