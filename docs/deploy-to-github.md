# 🚀 Deploy Lekki Stays to GitHub & Vercel

## 📋 Quick Deployment Steps

### Step 1: Initialize Git & Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit - Lekki Stays booking platform"

# Add your GitHub repository (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/lekki-stays.git

# Push to GitHub
git push -u origin main
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Repository name: `lekki-stays`
4. Make it **Public** (for free Vercel)
5. **Don't** initialize with README
6. Click "Create repository"

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import `lekki-stays` repository
5. Deploy with default settings

### Step 4: Add Environment Variables in Vercel

In Vercel dashboard → Settings → Environment Variables:

```
NODE_ENV = production
HOST_WHATSAPP_NUMBER = +2349039269846
BASE_URL = https://lekki-stays.vercel.app
BANK_NAME = GTBank
BANK_ACCOUNT_NUMBER = 9039269846
BANK_ACCOUNT_NAME = Lekki Stays Ltd
ADMIN_KEY = lekki-admin-confirmation-passkey419
```

### Step 5: Test Your Live Site

Visit: `https://lekki-stays.vercel.app`

Make a test booking and check WhatsApp!

---

## 🎯 Your Live URLs

**Website:** https://lekki-stays.vercel.app  
**Admin WhatsApp:** +2349039269846

**WhatsApp links will now work on your phone!** 📱✅