# 🎉 Firebase Setup Complete - Ready to Go!

## ✅ What's Been Set Up

### 1. Firebase Configuration
- ✅ `firebase-config.js` - Client-side Firebase config
- ✅ `firebase-init.js` - Firebase initialization for frontend
- ✅ `firebase-db.js` - Database operations for frontend
- ✅ `server/firebase-admin.js` - Server-side Firebase Admin SDK
- ✅ `firestore.rules` - Security rules
- ✅ `firestore.indexes.json` - Database indexes

### 2. Migration Tools
- ✅ `server/migrate-to-firebase.js` - Migrate apartments from JSON to Firestore
- ✅ `server/test-firebase.js` - Test Firebase connection

### 3. Environment Configuration
- ✅ `server/.env` - Updated with Firebase credentials (client-side)
- ⏳ **YOU NEED TO ADD:** Service account credentials (server-side)

### 4. NPM Scripts
```bash
npm run migrate        # Migrate data to Firestore
npm run test:firebase  # Test Firebase connection
npm run dev           # Start development server
```

---

## 🎯 What You Need to Do NOW

### Step 1: Enable Firestore (3 minutes)

1. Open Firebase Console:
   **https://console.firebase.google.com/project/lekki-stays/firestore**

2. Click **"Create database"**

3. Choose **"Production mode"**

4. Select location: **eur3 (europe-west)** or **us-central1**

5. Click **"Enable"** and wait 1-2 minutes

---

### Step 2: Get Service Account Key (2 minutes)

1. Go to **Project Settings → Service Accounts**:
   **https://console.firebase.google.com/project/lekki-stays/settings/serviceaccounts/adminsdk**

2. Click **"Generate new private key"**

3. Click **"Generate key"** (downloads a JSON file)

4. Open the JSON file and find these values:
   - `project_id`
   - `private_key`
   - `client_email`

---

### Step 3: Update server/.env (1 minute)

Add these lines to `server/.env`:

```env
# Firebase Admin SDK (for server-side operations)
FIREBASE_PROJECT_ID=lekki-stays
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[PASTE YOUR PRIVATE KEY HERE]\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@lekki-stays.iam.gserviceaccount.com
```

**IMPORTANT:**
- Keep the quotes around `FIREBASE_PRIVATE_KEY`
- Keep the `\n` characters (they represent newlines)
- Get these values from the downloaded JSON file

---

### Step 4: Test Firebase Connection (30 seconds)

```bash
cd server
npm run test:firebase
```

This will:
- ✅ Check environment variables
- ✅ Test Firestore connection
- ✅ Verify read/write permissions
- ✅ Check collections

---

### Step 5: Migrate Your Data (30 seconds)

```bash
cd server
npm run migrate
```

This will:
- ✅ Read apartments from `data/apartments.json`
- ✅ Upload 4 apartments to Firestore
- ✅ Verify migration success
- ✅ Show sample data

---

### Step 6: Set Security Rules (1 minute)

1. Go to Firestore Rules:
   **https://console.firebase.google.com/project/lekki-stays/firestore/rules**

2. Copy the rules from `firestore.rules` file

3. Click **"Publish"**

---

### Step 7: Start Your Server (10 seconds)

```bash
cd server
npm run dev
```

Visit: **http://localhost:3000**

---

## 🧪 Testing Your Setup

### Test 1: Check Apartments API
```bash
curl http://localhost:3000/api/apartments
```

Should return 4 apartments from Firestore.

### Test 2: Check Health
```bash
curl http://localhost:3000/api/health
```

Should return: `{"status":"OK"}`

### Test 3: Create Test Booking
Visit: http://localhost:3000
- Browse apartments
- Select dates
- Fill booking form
- Submit

Check Firestore Console for new booking!

---

## 📊 Firebase Console Links

- **Firestore Database:** https://console.firebase.google.com/project/lekki-stays/firestore
- **Project Settings:** https://console.firebase.google.com/project/lekki-stays/settings/general
- **Service Accounts:** https://console.firebase.google.com/project/lekki-stays/settings/serviceaccounts
- **Usage & Billing:** https://console.firebase.google.com/project/lekki-stays/usage

---

## 🔍 Verify Everything Works

After completing all steps:

1. ✅ Firestore enabled in console
2. ✅ Service account key downloaded
3. ✅ Environment variables set
4. ✅ Firebase connection test passes
5. ✅ Data migration successful
6. ✅ Security rules published
7. ✅ Server starts without errors
8. ✅ API returns apartment data
9. ✅ Bookings can be created

---

## 📚 Documentation

- **Setup Steps:** `FIREBASE_SETUP_STEPS.md` (detailed guide)
- **Checklist:** `FIREBASE_CHECKLIST.md` (quick reference)
- **Quick Start:** `FIREBASE_QUICK_START.md` (overview)

---

## 🆘 Troubleshooting

### "Could not reach Cloud Firestore backend"
- Make sure Firestore is enabled (Step 1)
- Check internet connection
- Wait a few minutes after enabling

### "Permission denied"
- Check security rules (Step 6)
- Verify service account credentials

### "Invalid private key"
- Make sure private key has `\n` characters
- Keep quotes around the key in .env
- Copy the entire key including BEGIN/END lines

### Migration fails
- Run `npm run test:firebase` first
- Check `data/apartments.json` exists
- Verify Firestore is enabled

---

## 🎯 Current Status

**Ready to complete:**
- ⏳ Step 1: Enable Firestore
- ⏳ Step 2: Get service account key
- ⏳ Step 3: Update .env
- ⏳ Step 4: Test connection
- ⏳ Step 5: Migrate data
- ⏳ Step 6: Set security rules
- ⏳ Step 7: Start server

**Estimated time:** 10 minutes total

---

## 🚀 After Setup

Once everything works:

1. **Deploy to Firebase Hosting:**
   ```bash
   firebase deploy
   ```

2. **Set up admin dashboard:**
   ```bash
   cd admin
   npm run dev
   ```

3. **Test booking flow end-to-end**

4. **Configure WhatsApp notifications**

---

**Next Action:** 👉 Enable Firestore in Firebase Console (Step 1)

**Console Link:** https://console.firebase.google.com/project/lekki-stays/firestore
