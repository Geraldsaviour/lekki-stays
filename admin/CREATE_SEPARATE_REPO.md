# 🚀 Creating Separate Admin Repository

## Step-by-Step Guide

### Step 1: Create New Repository on GitHub

1. Go to: https://github.com/new

2. Fill in details:
   - **Repository name:** `lekki-stays-admin`
   - **Description:** "Admin dashboard for Lekki Stays booking platform"
   - **Visibility:** Private (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license

3. Click **"Create repository"**

---

### Step 2: Prepare Admin Folder

Open terminal in your current project root:

```bash
# Navigate to admin folder
cd admin

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Lekki Stays Admin Dashboard

- Firebase Authentication integration
- Dashboard UI with booking management
- Direct Firestore connection
- No backend server required"
```

---

### Step 3: Connect to GitHub

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/lekki-stays-admin.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 4: Verify Repository

1. Go to: https://github.com/YOUR_USERNAME/lekki-stays-admin

2. You should see:
   - ✅ README.md
   - ✅ src/ folder with HTML/CSS/JS files
   - ✅ firebase-config.js
   - ✅ package.json
   - ✅ .gitignore

---

### Step 5: Set Up Repository Settings

#### Add Repository Description
1. Go to repository settings
2. Add description: "Admin dashboard for Lekki Stays - Firebase-powered booking management"
3. Add topics: `admin-dashboard`, `firebase`, `booking-system`, `lekki-stays`

#### Add Collaborators (if needed)
1. Go to Settings → Collaborators
2. Add team members who need access

#### Set Up Branch Protection (optional)
1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable: "Require pull request reviews before merging"

---

### Step 6: Update Main Repository

In your main `lekki-stays` repository, update the README to link to the admin repo:

```markdown
## Related Repositories

- **Main Website:** [lekki-stays](https://github.com/YOUR_USERNAME/lekki-stays)
- **Admin Dashboard:** [lekki-stays-admin](https://github.com/YOUR_USERNAME/lekki-stays-admin) 👈 NEW!
```

---

### Step 7: Clean Up Main Repository (Optional)

If you want to remove the admin folder from the main repo:

```bash
# In main repository root
cd ..  # Go back to main repo

# Remove admin folder from git (keeps local copy)
git rm -r --cached admin/

# Commit the change
git commit -m "Move admin dashboard to separate repository

Admin dashboard now lives at:
https://github.com/YOUR_USERNAME/lekki-stays-admin"

# Push changes
git push
```

**Note:** This removes admin from the main repo but keeps your local copy.

---

## 📁 Final Structure

### Main Repository (lekki-stays)
```
lekki-stays/
├── public/          # Main website
├── server/          # Backend server
├── data/            # Database files
└── README.md        # Links to admin repo
```

### Admin Repository (lekki-stays-admin)
```
lekki-stays-admin/
├── src/
│   ├── css/
│   ├── js/
│   ├── login.html
│   └── dashboard.html
├── firebase-config.js
├── package.json
├── .gitignore
└── README.md
```

---

## 🔗 Repository Links

After setup, you'll have:

- **Main Website:** `https://github.com/YOUR_USERNAME/lekki-stays`
- **Admin Dashboard:** `https://github.com/YOUR_USERNAME/lekki-stays-admin`

---

## 🌐 Deployment

### Deploy Admin to Firebase Hosting

```bash
# In admin repository
cd lekki-stays-admin

# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy --only hosting
```

Your admin will be at: **https://lekki-stays.web.app**

---

## ✅ Checklist

- [ ] Created GitHub repository
- [ ] Initialized git in admin folder
- [ ] Pushed code to GitHub
- [ ] Updated repository settings
- [ ] Added collaborators (if needed)
- [ ] Updated main repo README
- [ ] Removed admin from main repo (optional)
- [ ] Deployed to Firebase Hosting

---

## 🎉 Done!

Your admin dashboard is now in a separate repository and can be:
- ✅ Developed independently
- ✅ Deployed separately
- ✅ Managed by different team members
- ✅ Versioned independently

---

## 📚 Next Steps

1. **Enable Firebase Authentication** - See `FIREBASE_ADMIN_SETUP.md`
2. **Create admin user** in Firebase Console
3. **Test locally** with `npm run dev`
4. **Deploy** to Firebase Hosting
5. **Share repo** with team members

---

**Need help?** Check `README.md` or `FIREBASE_ADMIN_SETUP.md` for detailed instructions.
