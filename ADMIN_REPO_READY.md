# ✅ Admin Repository - Ready to Separate!

## 🎉 Everything is Prepared!

Your admin dashboard is now ready to be moved to a separate repository called **`lekki-stays-admin`**

---

## 📦 What's Ready

All files in the `admin/` folder are configured for standalone deployment:

### Core Files
- ✅ `README.md` - Complete documentation
- ✅ `package.json` - Updated for standalone use
- ✅ `.gitignore` - Proper git ignore rules
- ✅ `firebase-config.js` - Firebase configuration
- ✅ `src/` - All HTML/CSS/JS files

### Documentation
- ✅ `FIREBASE_ADMIN_SETUP.md` - Firebase setup guide
- ✅ `CREATE_SEPARATE_REPO.md` - Step-by-step repo creation
- ✅ `setup-repo.sh` - Automated setup script (Mac/Linux)
- ✅ `setup-repo.ps1` - Automated setup script (Windows)

---

## 🚀 Quick Start (Choose One Method)

### Method 1: Automated Setup (Recommended)

**Windows (PowerShell):**
```powershell
cd admin
.\setup-repo.ps1
```

**Mac/Linux (Bash):**
```bash
cd admin
chmod +x setup-repo.sh
./setup-repo.sh
```

Then:
1. Create repo on GitHub: https://github.com/new
2. Name it: `lekki-stays-admin`
3. Run: `git push -u origin main`

### Method 2: Manual Setup

Follow the detailed guide in `admin/CREATE_SEPARATE_REPO.md`

---

## 📋 Step-by-Step Summary

### 1. Create GitHub Repository

Go to: https://github.com/new

- **Name:** `lekki-stays-admin`
- **Description:** "Admin dashboard for Lekki Stays booking platform"
- **Visibility:** Private (recommended)
- **DO NOT** check any initialization options

Click "Create repository"

### 2. Push Admin Code

```bash
cd admin
git init
git add .
git commit -m "Initial commit: Admin dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lekki-stays-admin.git
git push -u origin main
```

### 3. Enable Firebase Authentication

```bash
# Go to Firebase Console
https://console.firebase.google.com/project/lekki-stays/authentication

# Enable Email/Password
# Create admin user
```

### 4. Test Locally

```bash
cd admin
npm install
npm run dev
```

Visit: http://localhost:3001

### 5. Deploy

```bash
firebase deploy --only hosting
```

---

## 🗂️ Repository Structure

### After Separation

**Main Repository (lekki-stays):**
```
lekki-stays/
├── public/          # Main website
├── server/          # Backend server
├── data/            # Database
└── README.md
```

**Admin Repository (lekki-stays-admin):**
```
lekki-stays-admin/
├── src/
│   ├── css/
│   ├── js/
│   ├── login.html
│   └── dashboard.html
├── firebase-config.js
├── package.json
├── README.md
└── .gitignore
```

---

## 🔗 Repository URLs

After creation:

- **Main Website:** `https://github.com/YOUR_USERNAME/lekki-stays`
- **Admin Dashboard:** `https://github.com/YOUR_USERNAME/lekki-stays-admin` 👈 NEW!

---

## 🌐 Deployment URLs

After deployment:

- **Main Website:** `https://lekkistays.com` (or your domain)
- **Admin Dashboard:** `https://lekki-stays.web.app` or `https://admin.lekkistays.com`

---

## ✅ Checklist

### Repository Setup
- [ ] Created `lekki-stays-admin` repository on GitHub
- [ ] Pushed admin code to new repository
- [ ] Updated repository settings and description
- [ ] Added collaborators (if needed)

### Firebase Setup
- [ ] Enabled Firebase Authentication
- [ ] Created admin user
- [ ] Updated Firestore security rules
- [ ] Tested login locally

### Deployment
- [ ] Deployed to Firebase Hosting
- [ ] Set up custom domain (optional)
- [ ] Tested production deployment

### Cleanup
- [ ] Updated main repo README with admin repo link
- [ ] Removed admin folder from main repo (optional)
- [ ] Documented admin repo URL for team

---

## 📚 Documentation Files

All documentation is in the `admin/` folder:

1. **README.md** - Main documentation
2. **FIREBASE_ADMIN_SETUP.md** - Firebase setup guide
3. **CREATE_SEPARATE_REPO.md** - Detailed repo creation steps
4. **setup-repo.sh** - Automated setup (Mac/Linux)
5. **setup-repo.ps1** - Automated setup (Windows)

---

## 🎯 Next Steps

1. **Create the repository** on GitHub
2. **Push the code** using the setup script or manual commands
3. **Enable Firebase Authentication** and create admin user
4. **Test locally** to verify everything works
5. **Deploy to Firebase Hosting**
6. **Share with your team**

---

## 🆘 Need Help?

- **Setup Guide:** `admin/CREATE_SEPARATE_REPO.md`
- **Firebase Guide:** `admin/FIREBASE_ADMIN_SETUP.md`
- **Main README:** `admin/README.md`

---

## 🎉 Summary

Your admin dashboard is:
- ✅ **Ready to separate** - All files configured
- ✅ **Fully documented** - Complete guides included
- ✅ **Firebase-powered** - No backend needed
- ✅ **Deploy-ready** - Can be hosted anywhere

**Repository Name:** `lekki-stays-admin`

**Next Action:** Run the setup script or follow the manual guide!

---

**Created:** April 29, 2026  
**Status:** ✅ Ready for Separation  
**Estimated Time:** 10 minutes
