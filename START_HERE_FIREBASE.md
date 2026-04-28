# 🚀 START HERE - Firebase Setup in 3 Steps

## 📍 You Are Here

Your Firebase project is created and configured. Now you need to:
1. Enable Firestore
2. Get credentials
3. Migrate data

**Time needed:** 10 minutes

---

## Step 1️⃣: Enable Firestore (3 min)

### Click this link:
👉 **https://console.firebase.google.com/project/lekki-stays/firestore**

### Then:
1. Click the blue **"Create database"** button
2. Select **"Production mode"**
3. Choose location: **eur3 (europe-west)**
4. Click **"Enable"**
5. ⏳ Wait 1-2 minutes

### ✅ Done when you see:
- Firestore dashboard with "Start collection" button
- No loading spinners

---

## Step 2️⃣: Get Service Account Key (2 min)

### Click this link:
👉 **https://console.firebase.google.com/project/lekki-stays/settings/serviceaccounts/adminsdk**

### Then:
1. Click **"Generate new private key"**
2. Click **"Generate key"** in the popup
3. A JSON file downloads (save it!)
4. Open the JSON file in a text editor

### Copy these 3 values from the JSON:

```json
{
  "project_id": "lekki-stays",           ← Copy this
  "private_key": "-----BEGIN...",        ← Copy this (entire key)
  "client_email": "firebase-adminsdk..." ← Copy this
}
```

---

## Step 3️⃣: Update Environment File (1 min)

### Open this file:
📁 `server/.env`

### Add these lines at the bottom:

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=lekki-stays
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@lekki-stays.iam.gserviceaccount.com
```

### Replace:
- `YOUR_KEY_HERE` with the `private_key` from JSON
- `firebase-adminsdk-xxxxx@...` with the `client_email` from JSON

### ⚠️ Important:
- Keep the quotes around `FIREBASE_PRIVATE_KEY`
- Keep the `\n` characters (don't remove them!)
- Save the file

---

## Step 4️⃣: Test & Migrate (2 min)

### Open terminal and run:

```bash
cd server
npm run test:firebase
```

### ✅ Should see:
```
🔥 Testing Firebase Connection...
✅ All environment variables present
✅ Firestore connection successful
✅ Firestore read successful
🎉 Firebase Connection Test Complete!
```

### If test passes, migrate data:

```bash
npm run migrate
```

### ✅ Should see:
```
🚀 Starting apartment migration...
✅ Prepared: Haven Lekki - Studio
✅ Prepared: The Metropolis Lekki - Studio
✅ Prepared: Victoria Island Penthouse
✅ Prepared: Ikoyi Executive Suite
🎉 Successfully migrated 4 apartments!
```

---

## Step 5️⃣: Set Security Rules (1 min)

### Click this link:
👉 **https://console.firebase.google.com/project/lekki-stays/firestore/rules**

### Replace the rules with:

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

### Click **"Publish"**

---

## Step 6️⃣: Start Your Server! 🎉

```bash
cd server
npm run dev
```

### Visit:
👉 **http://localhost:3000**

### Test:
- Browse apartments
- Select dates
- Create a booking
- Check Firestore console for data!

---

## 🎯 Quick Checklist

- [ ] Firestore enabled
- [ ] Service account key downloaded
- [ ] Environment variables added to `server/.env`
- [ ] Firebase connection test passes
- [ ] Data migration successful
- [ ] Security rules published
- [ ] Server running on port 3000
- [ ] Can view apartments at http://localhost:3000

---

## 🆘 Having Issues?

### Test fails with "Missing environment variables"
→ Check `server/.env` has all 3 Firebase variables

### Test fails with "Could not reach Cloud Firestore"
→ Make sure Firestore is enabled (Step 1)
→ Wait a few minutes after enabling

### Migration fails
→ Run `npm run test:firebase` first
→ Make sure test passes before migrating

### "Invalid private key" error
→ Make sure you copied the ENTIRE private key
→ Keep the `\n` characters in the .env file
→ Keep quotes around the private key

---

## 📚 More Help

- **Detailed Guide:** `FIREBASE_SETUP_STEPS.md`
- **Checklist:** `FIREBASE_CHECKLIST.md`
- **Full Docs:** `FIREBASE_READY.md`

---

## 🎉 Success!

When everything works, you'll see:
- ✅ Server running on http://localhost:3000
- ✅ 4 apartments in Firestore
- ✅ Bookings can be created
- ✅ Data appears in Firebase Console

**Next:** Test the booking flow and set up admin dashboard!

---

**Current Step:** 👉 Go to Step 1 and enable Firestore!
