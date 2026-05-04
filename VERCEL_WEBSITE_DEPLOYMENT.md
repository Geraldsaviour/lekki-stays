# 🌐 Deploy to Vercel Using Website (No CLI Required!)

## 📋 Complete Step-by-Step Guide

This guide shows you how to deploy your Lekki Stays project to Vercel using only the website - **no command line needed!**

---

## ⏱️ Total Time: ~45 minutes

- Part 1: Preparation (10 min)
- Part 2: Deploy User Frontend (15 min)
- Part 3: Deploy Admin Dashboard (15 min)
- Part 4: Final Configuration (5 min)

---

## 📦 Part 1: Preparation (10 minutes)

### Step 1.1: Create Vercel Account

1. **Open your browser**
2. **Go to:** https://vercel.com
3. **Click "Sign Up"** (top right)
4. **Choose sign-up method:**
   - **Recommended:** Sign up with GitHub
   - Or: Sign up with GitLab, Bitbucket, or Email

5. **If using GitHub:**
   - Click "Continue with GitHub"
   - Login to GitHub if not already logged in
   - Click "Authorize Vercel"
   - ✅ **Done!** You're now logged into Vercel

---

### Step 1.2: Push Code to GitHub

**Check if your code is on GitHub:**

1. **Open your browser**
2. **Go to:** https://github.com
3. **Check if you see your `lekki-stays` repository**

**If NOT on GitHub yet:**

1. **Open PowerShell or Command Prompt**
2. **Navigate to your project:**
   ```bash
   cd C:\Users\GERALD\Desktop\shortlet
   ```

3. **Initialize Git (if not done):**
   ```bash
   git init
   ```

4. **Add all files:**
   ```bash
   git add .
   ```

5. **Commit:**
   ```bash
   git commit -m "Ready for deployment"
   ```

6. **Create GitHub repository:**
   - Go to: https://github.com/new
   - Repository name: `lekki-stays`
   - Make it **Private** (recommended)
   - Click "Create repository"

7. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/lekki-stays.git
   git branch -M main
   git push -u origin main
   ```

✅ **Your code is now on GitHub!**

---

### Step 1.3: Get Supabase Credentials

You'll need these for both deployments:

1. **Go to:** https://supabase.com/dashboard
2. **Select your project**
3. **Click:** Settings (left sidebar)
4. **Click:** API
5. **Copy these values** (keep them in a notepad):

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

6. **Also note your WhatsApp number:**
   ```
   Format: 2348012345678 (no spaces, no +)
   ```

✅ **Credentials ready!**

---

## 🌐 Part 2: Deploy User Frontend (15 minutes)

### Step 2.1: Import Project to Vercel

1. **Go to:** https://vercel.com/new
2. **You'll see "Import Git Repository"**
3. **If this is your first time:**
   - Click "Add GitHub Account"
   - Click "Install" on the popup
   - Select "All repositories" or "Only select repositories"
   - If selecting specific: Choose `lekki-stays`
   - Click "Install"

4. **Find your repository:**
   - You should see `lekki-stays` in the list
   - Click "Import" next to it

---

### Step 2.2: Configure User Frontend Project

You'll see a configuration screen:

1. **Project Name:**
   ```
   lekki-stays-user
   ```
   (This will be your URL: lekki-stays-user.vercel.app)

2. **Framework Preset:**
   - Leave as "Other" or select "Other"

3. **Root Directory:**
   - Leave as `./` (default)
   - Do NOT change this

4. **Build Command:**
   - Leave empty (no build needed)

5. **Output Directory:**
   - Leave empty or type: `public`

6. **Install Command:**
   - Leave as default: `npm install`

7. **Environment Variables:**
   - **DON'T add them yet!**
   - We'll add them after first deployment

8. **Click "Deploy"** (blue button)

---

### Step 2.3: Wait for Deployment

You'll see a deployment screen with:
- Building... (takes 1-2 minutes)
- Animated progress
- Logs scrolling

**Wait until you see:**
- ✅ "Congratulations!"
- 🎉 Confetti animation
- Your live URL

**Copy your URL:**
```
https://lekki-stays-user.vercel.app
```

---

### Step 2.4: Add Environment Variables

**Important:** The site won't work yet because we need to add environment variables.

1. **Click "Continue to Dashboard"**
2. **Click "Settings"** (top menu)
3. **Click "Environment Variables"** (left sidebar)
4. **Add each variable:**

**Variable 1:**
- Name: `SUPABASE_URL`
- Value: `https://xxxxx.supabase.co` (your Supabase URL)
- Environment: Select all (Production, Preview, Development)
- Click "Save"

**Variable 2:**
- Name: `SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your anon key)
- Environment: Select all
- Click "Save"

**Variable 3:**
- Name: `SUPABASE_SERVICE_ROLE_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your service role key)
- Environment: Select all
- Click "Save"

**Variable 4:**
- Name: `HOST_WHATSAPP_NUMBER`
- Value: `2348012345678` (your WhatsApp number)
- Environment: Select all
- Click "Save"

**Variable 5:**
- Name: `NODE_ENV`
- Value: `production`
- Environment: Select all
- Click "Save"

---

### Step 2.5: Redeploy with Environment Variables

1. **Click "Deployments"** (top menu)
2. **Find the latest deployment** (top of list)
3. **Click the three dots (⋯)** on the right
4. **Click "Redeploy"**
5. **Click "Redeploy"** again to confirm
6. **Wait for deployment** (1-2 minutes)

✅ **User Frontend is now live with environment variables!**

---

### Step 2.6: Test User Frontend

1. **Click "Visit"** (top right) or go to your URL
2. **You should see:**
   - Homepage with apartments
   - Images loading
   - Search working
   - Booking form accessible

**If something doesn't work:**
- Check browser console (F12)
- Verify environment variables are correct
- Check Vercel deployment logs

---

## 🔐 Part 3: Deploy Admin Dashboard (15 minutes)

Now we'll deploy the admin dashboard as a **separate project**.

### Step 3.1: Import Project Again

1. **Go to:** https://vercel.com/new
2. **Find `lekki-stays` again** in the repository list
3. **Click "Import"** next to it

**Yes, we're importing the SAME repository again!**
This is correct - we'll configure it differently.

---

### Step 3.2: Configure Admin Dashboard Project

You'll see the configuration screen again:

1. **Project Name:**
   ```
   lekki-stays-admin
   ```
   (This will be your URL: lekki-stays-admin.vercel.app)

2. **Framework Preset:**
   - Leave as "Other"

3. **Root Directory:**
   - Leave as `./` (default)

4. **Build Command:**
   - Leave empty

5. **Output Directory:**
   - Type: `admin`
   (This tells Vercel to serve the admin folder)

6. **Install Command:**
   - Leave as default: `npm install`

7. **Environment Variables:**
   - **DON'T add them yet!**
   - We'll add them after first deployment

8. **Click "Deploy"** (blue button)

---

### Step 3.3: Wait for Deployment

Same as before:
- Building... (1-2 minutes)
- Wait for "Congratulations!"
- Copy your URL:
  ```
  https://lekki-stays-admin.vercel.app
  ```

---

### Step 3.4: Add Environment Variables

**Same variables as User Frontend:**

1. **Click "Continue to Dashboard"**
2. **Click "Settings"** (top menu)
3. **Click "Environment Variables"** (left sidebar)
4. **Add the SAME 5 variables:**

```
SUPABASE_URL = https://xxxxx.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
HOST_WHATSAPP_NUMBER = 2348012345678
NODE_ENV = production
```

**For each variable:**
- Add name
- Add value
- Select all environments
- Click "Save"

---

### Step 3.5: Redeploy with Environment Variables

1. **Click "Deployments"** (top menu)
2. **Find the latest deployment**
3. **Click the three dots (⋯)**
4. **Click "Redeploy"**
5. **Click "Redeploy"** to confirm
6. **Wait for deployment** (1-2 minutes)

✅ **Admin Dashboard is now live!**

---

### Step 3.6: Test Admin Dashboard

1. **Click "Visit"** or go to your URL
2. **You should see:**
   - Login page
   - Can login with: `geraldsaviour2@gmail.com`
   - Dashboard loads after login
   - Bookings display
   - Receipt upload works

**If something doesn't work:**
- Check browser console (F12)
- Verify environment variables
- Check Vercel logs

---

## 🔧 Part 4: Final Configuration (5 minutes)

### Step 4.1: Update Supabase Authentication URLs

1. **Go to:** https://supabase.com/dashboard
2. **Select your project**
3. **Click:** Authentication (left sidebar)
4. **Click:** URL Configuration

5. **Site URL:**
   ```
   https://lekki-stays-user.vercel.app
   ```

6. **Redirect URLs** (add all these):
   ```
   https://lekki-stays-user.vercel.app
   https://lekki-stays-admin.vercel.app
   http://localhost:3000
   ```

7. **Click "Save"**

---

### Step 4.2: Update Storage CORS

1. **Still in Supabase Dashboard**
2. **Click:** Storage (left sidebar)
3. **Click:** `payment-receipts` bucket
4. **Click:** Configuration or CORS

5. **Add allowed origins:**
   ```
   https://lekki-stays-admin.vercel.app
   http://localhost:3000
   ```

6. **Save changes**

---

## ✅ Part 5: Final Testing (10 minutes)

### Test User Frontend:

1. **Go to:** `https://lekki-stays-user.vercel.app`
2. **Test these:**
   - [ ] Homepage loads
   - [ ] Apartments display with images
   - [ ] Search works
   - [ ] Click apartment → Details page loads
   - [ ] Fill booking form
   - [ ] Submit booking
   - [ ] Success message appears
   - [ ] WhatsApp link works

---

### Test Admin Dashboard:

1. **Go to:** `https://lekki-stays-admin.vercel.app`
2. **Test these:**
   - [ ] Login page loads
   - [ ] Login with `geraldsaviour2@gmail.com`
   - [ ] Dashboard loads
   - [ ] Stats display
   - [ ] Bookings list loads
   - [ ] Click "View Details" → Modal opens
   - [ ] Click "Confirm" on booking → Works
   - [ ] Click "Mark as Paid" → Receipt modal opens
   - [ ] Upload receipt → Works
   - [ ] Submit receipt → Booking marked as paid

---

### Test Mobile:

1. **Open on your phone:**
   - User URL
   - Admin URL

2. **Check:**
   - [ ] Responsive design works
   - [ ] Touch targets work
   - [ ] Forms work
   - [ ] Modals work

---

## 🎉 Success!

Your Lekki Stays platform is now live!

**URLs:**
- **User Frontend:** https://lekki-stays-user.vercel.app
- **Admin Dashboard:** https://lekki-stays-admin.vercel.app

---

## 📝 Save These URLs

**Copy this template and fill it out:**

```
=================================
LEKKI STAYS - DEPLOYMENT INFO
=================================

User Frontend:
https://lekki-stays-user.vercel.app

Admin Dashboard:
https://lekki-stays-admin.vercel.app

Admin Login:
Email: geraldsaviour2@gmail.com
Password: [your password]

Supabase:
URL: https://xxxxx.supabase.co
Project: [your project name]

Vercel:
Account: [your email]
Projects: lekki-stays-user, lekki-stays-admin

Deployed: [today's date]
=================================
```

---

## 🔄 How to Update Your Site

When you make changes:

1. **Edit your code locally**
2. **Test locally** (`npm run dev`)
3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Push to GitHub:**
   ```bash
   git push
   ```
5. **Vercel automatically redeploys!**
   - Check Vercel dashboard for deployment status
   - Usually takes 1-2 minutes

---

## 🐛 Troubleshooting

### Issue: "Module not found" error

**Solution:**
1. Go to Vercel Dashboard
2. Click "Settings" → "General"
3. Scroll to "Build & Development Settings"
4. Set Install Command to: `npm install`
5. Redeploy

---

### Issue: Environment variables not working

**Solution:**
1. Go to Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Verify all 5 variables are there
4. Check for typos
5. Make sure "Production" is selected
6. Redeploy

---

### Issue: "CORS error" in console

**Solution:**
1. Go to Supabase Dashboard
2. Authentication → URL Configuration
3. Add your Vercel URLs to Redirect URLs
4. Save

---

### Issue: Receipt upload fails

**Solution:**
1. Go to Supabase Dashboard
2. Storage → payment-receipts
3. Check CORS settings
4. Add admin Vercel URL to allowed origins
5. Save

---

### Issue: 404 errors on routes

**Solution:**
1. Go to Vercel Dashboard
2. Check "Output Directory" setting
3. User should be: `public`
4. Admin should be: `admin`
5. Redeploy

---

## 📞 Need Help?

**Check deployment logs:**
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Click on latest deployment
4. Check "Build Logs" and "Function Logs"

**Check browser console:**
1. Press F12
2. Go to Console tab
3. Look for red errors

**Check Supabase logs:**
1. Go to Supabase Dashboard
2. Click "Logs"
3. Check for errors

---

## 🎊 You're Done!

Your Lekki Stays platform is now:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Auto-deploys on Git push
- ✅ Has free SSL certificate
- ✅ Hosted on global CDN
- ✅ Fully functional

**Share your user URL with customers and start taking bookings!** 🚀

---

**Deployed:** May 4, 2026
**Version:** 1.0.0
**Status:** ✅ Live and Ready!
