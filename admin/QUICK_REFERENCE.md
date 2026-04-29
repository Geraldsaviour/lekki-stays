# 🚀 Quick Reference - Admin Repository

## Repository Name
**`lekki-stays-admin`**

## Quick Commands

### Create Repository
```bash
cd admin
git init
git add .
git commit -m "Initial commit: Admin dashboard"
git remote add origin https://github.com/YOUR_USERNAME/lekki-stays-admin.git
git branch -M main
git push -u origin main
```

### Local Development
```bash
npm install
npm run dev
```
Visit: http://localhost:3001

### Deploy
```bash
firebase deploy --only hosting
```

## Important URLs

- **GitHub:** https://github.com/YOUR_USERNAME/lekki-stays-admin
- **Firebase Console:** https://console.firebase.google.com/project/lekki-stays
- **Live Admin:** https://lekki-stays.web.app

## Firebase Setup

1. **Enable Auth:** https://console.firebase.google.com/project/lekki-stays/authentication
2. **Create User:** Authentication → Users → Add user
3. **Update Rules:** Firestore → Rules → Publish

## Files Structure

```
lekki-stays-admin/
├── src/
│   ├── login.html       # Login page
│   ├── dashboard.html   # Dashboard
│   ├── css/            # Styles
│   └── js/             # Logic
├── firebase-config.js   # Firebase config
├── package.json        # Dependencies
└── README.md           # Documentation
```

## Key Features

- ✅ Firebase Authentication
- ✅ Direct Firestore connection
- ✅ No backend server needed
- ✅ Static hosting compatible
- ✅ Fully documented

## Support

- **Setup Guide:** CREATE_SEPARATE_REPO.md
- **Firebase Guide:** FIREBASE_ADMIN_SETUP.md
- **Full Docs:** README.md
