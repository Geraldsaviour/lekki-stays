# 📦 GitHub Repository Setup - Two Separate Repos

## 🎯 Strategy

We'll create **TWO separate GitHub repositories**:
1. **lekki-stays-user** - User frontend only
2. **lekki-stays-admin** - Admin dashboard only

Each repo will have ONLY the files needed for deployment - no docs, no extra files.

---

## 📁 Repository 1: lekki-stays-user

### Files to Include:

```
lekki-stays-user/
├── public/
│   ├── booking/
│   │   ├── booking.css
│   │   ├── booking.html
│   │   └── booking.js
│   ├── listings/
│   │   ├── listing-1.html
│   │   ├── listing-2.html
│   │   ├── listing-3.html
│   │   ├── listing-4.html
│   │   ├── listing-5.html
│   │   ├── listing-6.html
│   │   ├── listing-7.html
│   │   ├── listing-8.html
│   │   ├── listing-detail.css
│   │   └── listing-detail.js
│   ├── search/
│   │   ├── search-results.css
│   │   ├── search-results.html
│   │   └── search-results.js
│   ├── shared/
│   │   └── api-client.js
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── server/
│   ├── config/
│   │   └── supabase.js
│   ├── models-supabase/
│   │   ├── Apartment.js
│   │   └── Booking.js
│   ├── routes-supabase/
│   │   ├── apartments.js
│   │   └── bookings.js
│   ├── utils-supabase/
│   │   └── whatsapp.js
│   ├── .env.example
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json
└── vercel.json
```

### Total: ~35 files

---

## 📁 Repository 2: lekki-stays-admin

### Files to Include:

```
lekki-stays-admin/
├── admin/
│   ├── css/
│   │   ├── admin.css
│   │   └── dashboard.css
│   ├── js/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── config.js
│   │   └── dashboard.js
│   ├── dashboard.html
│   └── index.html
├── server/
│   ├── config/
│   │   └── supabase.js
│   ├── models-supabase/
│   │   ├── Apartment.js
│   │   └── Booking.js
│   ├── routes-supabase/
│   │   ├── apartments.js
│   │   └── bookings.js
│   ├── utils-supabase/
│   │   └── whatsapp.js
│   ├── .env.example
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json
└── vercel.json
```

### Total: ~20 files

---

## 🚀 Step-by-Step Setup

### Step 1: Create User Frontend Repo

1. **Go to:** https://github.com/new
2. **Repository name:** `lekki-stays-user`
3. **Description:** `Lekki Stays - User Frontend (Booking Platform)`
4. **Visibility:** Private (recommended)
5. **DO NOT** initialize with README, .gitignore, or license
6. **Click:** "Create repository"
7. **Copy the repository URL** (you'll need it)

---

### Step 2: Create Admin Dashboard Repo

1. **Go to:** https://github.com/new
2. **Repository name:** `lekki-stays-admin`
3. **Description:** `Lekki Stays - Admin Dashboard`
4. **Visibility:** Private (recommended)
5. **DO NOT** initialize with README, .gitignore, or license
6. **Click:** "Create repository"
7. **Copy the repository URL** (you'll need it)

---

### Step 3: Prepare Local Folders

I'll create the exact folder structures for you to push.

**Run these commands in PowerShell:**

```powershell
# Navigate to your desktop
cd C:\Users\GERALD\Desktop

# Create user frontend folder
mkdir lekki-stays-user-deploy
cd lekki-stays-user-deploy

# We'll copy files here next
```

---

## 📝 What I'll Do Next

I'll create two folders in your project:
1. `deploy-user/` - Ready to push to lekki-stays-user repo
2. `deploy-admin/` - Ready to push to lekki-stays-admin repo

Each will have ONLY the essential files needed for deployment.

---

## ✅ After I Create the Folders

You'll run these commands:

### For User Frontend:
```powershell
cd deploy-user
git init
git add .
git commit -m "Initial commit - User frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lekki-stays-user.git
git push -u origin main
```

### For Admin Dashboard:
```powershell
cd deploy-admin
git init
git add .
git commit -m "Initial commit - Admin dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lekki-stays-admin.git
git push -u origin main
```

---

## 🎯 Benefits of This Approach

✅ **Clean separation** - User and admin completely separate
✅ **No confusion** - Each repo has only what it needs
✅ **Easy deployment** - Vercel imports directly
✅ **No docs clutter** - Only production code
✅ **Smaller repos** - Faster cloning and deployment
✅ **Better security** - Admin code separate from user code

---

Ready for me to create the deployment folders?
