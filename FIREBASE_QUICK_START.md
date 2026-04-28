# 🚀 Firebase Quick Start - Lekki Stays

## What You Need to Do

### 1️⃣ Create Firebase Project (5 minutes)
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "Lekki Stays"
4. Disable Google Analytics
5. Click "Create project"

### 2️⃣ Register Web App (2 minutes)
1. Click the Web icon (`</>`)
2. Name it "Lekki Stays Web"
3. Check "Firebase Hosting"
4. Click "Register app"
5. **COPY the firebaseConfig object**

### 3️⃣ Update Your Config (1 minute)
Open `firebase-config.js` and paste YOUR config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

export default firebaseConfig;
```

### 4️⃣ Enable Firestore (3 minutes)
1. Go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose "Production mode"
4. Select location: "eur3 (europe-west)"
5. Click "Enable"

### 5️⃣ Set Security Rules (1 minute)
Go to **Rules** tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /apartments/{apartmentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update: if request.auth != null;
    }
  }
}
```

Click "Publish"

### 6️⃣ Add Sample Apartment (2 minutes)
1. In Firestore, click "Start collection"
2. Collection ID: `apartments`
3. Auto-generate Document ID
4. Add these fields:

```
name: "Luxury 2BR Lekki Phase 1"
location: "Lekki Phase 1"
price: 45000
bedrooms: 2
bathrooms: 2
maxGuests: 4
description: "Modern apartment with pool"
amenities: ["wifi", "pool", "kitchen", "ac"]
images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"]
available: true
createdAt: (timestamp - current time)
```

### 7️⃣ Install Firebase CLI (2 minutes)
```bash
npm install -g firebase-tools
firebase login
```

### 8️⃣ Initialize Project (2 minutes)
```bash
firebase init
```

Select:
- ✅ Firestore
- ✅ Hosting

Settings:
- Public directory: `.` (press Enter)
- Single-page app: `No`
- Overwrite files: `No`

### 9️⃣ Deploy (1 minute)
```bash
firebase deploy
```

### 🎉 Done!
Your site is live at: `https://your-project.web.app`

---

## Testing Locally

```bash
firebase serve
```

Open: http://localhost:5000

---

## Need Help?

See full guide: `docs/FIREBASE_SETUP_GUIDE.md`

---

## Total Time: ~20 minutes ⏱️
