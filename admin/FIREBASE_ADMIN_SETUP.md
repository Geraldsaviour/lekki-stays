# 🔥 Firebase Admin Dashboard - Standalone Setup

## Overview

The admin dashboard now connects **directly to Firebase** - no backend server needed! This means you can:
- ✅ Deploy it separately from the main website
- ✅ Host it on any static hosting (Firebase Hosting, Netlify, Vercel, etc.)
- ✅ Access it from anywhere
- ✅ No server maintenance required

---

## 🎯 What's Changed

### Before (Old Setup)
- Admin dashboard → Backend API → MongoDB
- Required Node.js server running
- Needed separate backend deployment

### Now (New Setup)
- Admin dashboard → Firebase directly
- Pure frontend (HTML/CSS/JS)
- No backend server needed!

---

## 📋 Prerequisites

1. **Firebase Authentication enabled**
2. **Admin user created in Firebase**
3. **Firestore security rules configured**

---

## 🚀 Quick Start

### Step 1: Enable Firebase Authentication

1. Go to Firebase Console:
   https://console.firebase.google.com/project/lekki-stays/authentication

2. Click **"Get started"**

3. Enable **"Email/Password"** sign-in method

4. Click **"Save"**

### Step 2: Create Admin User

1. Go to **Authentication → Users**

2. Click **"Add user"**

3. Enter:
   - **Email:** admin@lekkistays.com (or your preferred email)
   - **Password:** (create a strong password)

4. Click **"Add user"**

5. **Save your credentials!** You'll need these to login.

### Step 3: Update Firestore Security Rules

1. Go to **Firestore Database → Rules**

2. Update rules to allow admin access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Apartments - public read, admin write
    match /apartments/{apartmentId} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    
    // Bookings - anyone can create, admin can read/update
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update: if isAuthenticated();
    }
  }
}
```

3. Click **"Publish"**

### Step 4: Test Locally

```bash
cd admin
npm install
npm run dev
```

Visit: http://localhost:3001

Login with the admin credentials you created in Step 2.

---

## 🌐 Deploy to Firebase Hosting

### Option 1: Deploy Admin Only

```bash
cd admin

# Install Firebase CLI (if not already installed)
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

Your admin dashboard will be live at:
**https://lekki-stays.web.app**

### Option 2: Deploy to Separate Subdomain

1. **Create firebase.json** in admin folder:

```json
{
  "hosting": {
    "public": "src",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/login.html"
      }
    ]
  }
}
```

2. **Deploy:**

```bash
firebase deploy --only hosting
```

3. **Set up custom domain** (optional):
   - Go to Firebase Console → Hosting
   - Click "Add custom domain"
   - Enter: admin.lekkistays.com
   - Follow DNS setup instructions

---

## 📁 File Structure

```
admin/
├── src/
│   ├── css/
│   │   ├── auth.css          # Login page styles
│   │   └── dashboard.css     # Dashboard styles
│   ├── js/
│   │   ├── auth.js           # Firebase authentication
│   │   └── dashboard.js      # Dashboard logic (TO UPDATE)
│   ├── login.html            # Login page
│   └── dashboard.html        # Dashboard page
├── firebase-config.js        # Firebase configuration
├── package.json
└── README.md
```

---

## 🔧 Configuration

### Firebase Config

The Firebase configuration is in `firebase-config.js`:

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

**Note:** These credentials are safe to expose publicly (they're client-side only).

---

## 🔐 Security

### Authentication
- Only authenticated users can access the dashboard
- Firebase Authentication handles all security
- Automatic redirect to login if not authenticated

### Firestore Rules
- Public can only CREATE bookings
- Admins can READ and UPDATE bookings
- Admins can UPDATE apartments

### Best Practices
1. **Use strong passwords** for admin accounts
2. **Enable 2FA** in Firebase Console (recommended)
3. **Limit admin users** to only those who need access
4. **Monitor authentication logs** in Firebase Console

---

## 🆘 Troubleshooting

### "Permission denied" errors
→ Check Firestore security rules
→ Make sure you're logged in with an admin account

### "Network error" on login
→ Check Firebase configuration in `firebase-config.js`
→ Verify Firebase Authentication is enabled

### Dashboard not loading data
→ Check browser console for errors
→ Verify Firestore has data (apartments and bookings)
→ Check security rules allow authenticated read

### Can't login
→ Verify admin user exists in Firebase Authentication
→ Check email and password are correct
→ Try resetting password in Firebase Console

---

## 📊 Features

### Current Features
- ✅ Firebase Authentication login
- ✅ View all bookings
- ✅ Filter bookings by status
- ✅ Search bookings
- ✅ View booking details
- ✅ View apartments

### To Be Implemented
- ⏳ Update booking status
- ⏳ Confirm/decline bookings
- ⏳ Send WhatsApp notifications
- ⏳ Mark as paid
- ⏳ Check-in/check-out

---

## 🔄 Next Steps

1. **Update dashboard.js** to use Firebase Firestore instead of API calls
2. **Test all features** with Firebase
3. **Deploy to Firebase Hosting**
4. **Set up custom domain** (optional)
5. **Train admin users** on new dashboard

---

## 📚 Resources

- **Firebase Console:** https://console.firebase.google.com/project/lekki-stays
- **Firebase Auth Docs:** https://firebase.google.com/docs/auth
- **Firestore Docs:** https://firebase.google.com/docs/firestore
- **Firebase Hosting:** https://firebase.google.com/docs/hosting

---

## ✅ Checklist

- [ ] Firebase Authentication enabled
- [ ] Admin user created
- [ ] Firestore security rules updated
- [ ] Tested login locally
- [ ] Dashboard loads data from Firestore
- [ ] Deployed to Firebase Hosting
- [ ] Custom domain configured (optional)
- [ ] Admin users trained

---

**Status:** ✅ Authentication working | ⏳ Dashboard needs Firestore integration

**Next:** Update `dashboard.js` to fetch data from Firestore instead of API
