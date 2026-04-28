# 🚀 Firebase Quick Start - Lekki Stays

## ✅ Firebase Project Created!

**Project Name:** lekki-stays  
**Project ID:** lekki-stays  
**Console:** https://console.firebase.google.com/project/lekki-stays

---

## 📋 Current Status

### ✅ Completed
- [x] Firebase project created
- [x] Web app registered
- [x] Configuration updated in `firebase-config.js`
- [x] Environment variables added to `server/.env`

### 🔄 Next Steps

---

## 1️⃣ Enable Firestore Database (3 minutes)

1. Go to: https://console.firebase.google.com/project/lekki-stays/firestore
2. Click **"Create database"**
3. Choose **"Production mode"**
4. Select location: **"eur3 (europe-west)"** or closest to Nigeria
5. Click **"Enable"**

---

## 2️⃣ Set Security Rules (1 minute)

Once Firestore is enabled:

1. Go to **Rules** tab
2. Replace with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Apartments - public read, admin write
    match /apartments/{apartmentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Bookings - anyone can create, admin can read/update
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

---

## 3️⃣ Add Sample Data (Optional - 2 minutes)

In Firestore console:

1. Click **"Start collection"**
2. Collection ID: `apartments`
3. Auto-generate Document ID
4. Add fields:

```
name: "Luxury 2BR Lekki Phase 1"
location: "Lekki Phase 1"
price: 45000
bedrooms: 2
bathrooms: 2
maxGuests: 4
description: "Modern apartment with pool and gym"
amenities: ["wifi", "pool", "kitchen", "ac", "gym"]
images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"]
available: true
createdAt: (timestamp - current time)
```

---

## 4️⃣ Install Firebase CLI (2 minutes)

```bash
npm install -g firebase-tools
firebase login
```

---

## 5️⃣ Initialize Firebase in Project (2 minutes)

```bash
firebase init
```

**Select:**
- ✅ Firestore
- ✅ Hosting

**Settings:**
- Firestore rules: `firestore.rules` (default)
- Firestore indexes: `firestore.indexes.json` (default)
- Public directory: `public`
- Single-page app: `No`
- Overwrite files: `No`

---

## 6️⃣ Test Locally (Optional)

```bash
firebase serve
```

Open: http://localhost:5000

---

## 7️⃣ Deploy to Firebase Hosting

```bash
firebase deploy
```

Your site will be live at: **https://lekki-stays.web.app**

---

## 🔧 Your Firebase Configuration

Already configured in `firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA8moQvtYRObBsuNlU52uN9nDIXCCq0Mfs",
  authDomain: "lekki-stays.firebaseapp.com",
  projectId: "lekki-stays",
  storageBucket: "lekki-stays.firebasestorage.app",
  messagingSenderId: "879597470658",
  appId: "1:879597470658:web:9dce2da8c0413ba01e0c5b"
};
```

---

## 🎯 What to Do RIGHT NOW

### Option A: Use SQLite (Recommended - Already Working!)
Your server is already configured with SQLite. Just run:

```bash
cd server
npm run dev
```

Visit: http://localhost:3000

### Option B: Add Firebase (For Real-time Features)
1. Enable Firestore (step 1 above)
2. Set security rules (step 2 above)
3. Update your code to use Firebase instead of SQLite

---

## 📚 Need More Help?

- **Full Firebase Guide:** `docs/FIREBASE_SETUP_GUIDE.md`
- **Admin Dashboard:** `admin/START_HERE.md`
- **Server Setup:** `server/README.md`

---

## ⏱️ Total Time: ~10 minutes

**Most Important:** Start your server and test the booking flow first!
