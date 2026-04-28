# 🔥 Firebase Setup Checklist

## Quick Reference

**Project:** lekki-stays  
**Console:** https://console.firebase.google.com/project/lekki-stays

---

## ✅ Setup Progress

### Phase 1: Firebase Console Setup
- [ ] **Enable Firestore Database**
  - Go to: https://console.firebase.google.com/project/lekki-stays/firestore
  - Click "Create database"
  - Choose "Production mode"
  - Select location: eur3 (europe-west)
  - Click "Enable"

- [ ] **Set Security Rules**
  - Go to Rules tab
  - Copy rules from `firestore.rules`
  - Click "Publish"

- [ ] **Generate Service Account Key**
  - Go to: Project Settings → Service Accounts
  - Click "Generate new private key"
  - Download JSON file
  - Save it securely (DON'T commit to Git!)

### Phase 2: Environment Configuration
- [ ] **Update server/.env with:**
  ```env
  FIREBASE_PROJECT_ID=lekki-stays
  FIREBASE_PRIVATE_KEY="[from service account JSON]"
  FIREBASE_CLIENT_EMAIL=[from service account JSON]
  ```

### Phase 3: Data Migration
- [ ] **Run migration script:**
  ```bash
  cd server
  npm run migrate
  ```

- [ ] **Verify in Firebase Console:**
  - Check apartments collection has 4 documents
  - View sample apartment data

### Phase 4: Deploy Rules & Indexes
- [ ] **Install Firebase CLI:**
  ```bash
  npm install -g firebase-tools
  firebase login
  ```

- [ ] **Initialize Firebase:**
  ```bash
  firebase init
  ```
  - Select: Firestore
  - Use existing files

- [ ] **Deploy:**
  ```bash
  firebase deploy --only firestore
  ```

### Phase 5: Test Everything
- [ ] **Start server:**
  ```bash
  cd server
  npm run dev
  ```

- [ ] **Test endpoints:**
  - http://localhost:3000/api/apartments
  - http://localhost:3000/api/health

- [ ] **Test booking flow:**
  - Create a test booking
  - Check Firestore console for new booking

---

## 🎯 Current Status

**Completed:**
- ✅ Firebase project created
- ✅ Web app registered
- ✅ Configuration files updated
- ✅ Firebase packages installed
- ✅ Migration script created
- ✅ Admin service created

**Next Step:**
👉 **Enable Firestore Database** (Phase 1, Step 1)

---

## 📋 Quick Commands

```bash
# Migrate data to Firestore
cd server && npm run migrate

# Start development server
cd server && npm run dev

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes
firebase deploy --only firestore:indexes

# View Firebase logs
firebase functions:log
```

---

## 🆘 Troubleshooting

**Can't enable Firestore?**
- Make sure you're logged into Firebase Console
- Check project billing (Firestore requires Spark plan - free tier)

**Migration fails?**
- Check service account credentials in .env
- Make sure Firestore is enabled
- Verify apartments.json exists

**Server won't start?**
- Check all environment variables are set
- Run `npm install` in server directory
- Check for port conflicts (port 3000)

---

## 📚 Documentation

- **Full Setup Guide:** `FIREBASE_SETUP_STEPS.md`
- **Quick Start:** `FIREBASE_QUICK_START.md`
- **Firestore Rules:** `firestore.rules`
- **Firestore Indexes:** `firestore.indexes.json`

---

**Time Estimate:** 10-15 minutes total
