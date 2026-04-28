# 🚀 Lekki Stays - Vercel Deployment Guide

## 📋 Pre-Deployment Checklist

Before deploying to Vercel, ensure you have:
- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ Your WhatsApp number ready
- ✅ Bank account details
- ✅ A strong admin password

---

## 🔧 Step 1: Prepare for GitHub

### Update Your Environment Variables

1. **Open `server/.env`** and update these values:

```env
# Change BASE_URL to your future Vercel domain
BASE_URL=https://lekki-stays.vercel.app

# Verify your WhatsApp number
HOST_WHATSAPP_NUMBER=+2349039269846

# Update with your real bank details
BANK_NAME=Your Real Bank Name
BANK_ACCOUNT_NUMBER=Your Real Account Number
BANK_ACCOUNT_NAME=Your Real Account Name

# Keep your admin key secure
ADMIN_KEY=lekki-admin-confirmation-passkey419
```

**⚠️ Important:** The `BASE_URL` should match your Vercel app name. If you want `lekki-stays.vercel.app`, set it to that.

---

## 📤 Step 2: Push to GitHub

### Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Lekki Stays booking platform"

# Add your GitHub repository (replace with your username)
git remote add origin https://github.com/yourusername/lekki-stays.git

# Push to GitHub
git push -u origin main
```

### Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `lekki-stays`
4. Make it **Public** (for free Vercel deployment)
5. Don't initialize with README (we already have one)
6. Click "Create repository"
7. Follow the commands above to push your code

---

## 🌐 Step 3: Deploy to Vercel

### Option A: Quick Deploy (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your `lekki-stays` repository**
5. **Configure project:**
   - Framework Preset: **Other**
   - Root Directory: **/** (leave default)
   - Build Command: **Leave empty**
   - Output Directory: **Leave empty**
   - Install Command: **npm install**

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: lekki-stays
# - Directory: ./
```

---

## ⚙️ Step 4: Configure Environment Variables

### In Vercel Dashboard:

1. **Go to your project** in Vercel dashboard
2. **Click "Settings" tab**
3. **Click "Environment Variables"**
4. **Add these variables:**

```
NODE_ENV = production
HOST_WHATSAPP_NUMBER = +2349039269846
BASE_URL = https://your-app-name.vercel.app
BANK_NAME = Your Bank Name
BANK_ACCOUNT_NUMBER = Your Account Number
BANK_ACCOUNT_NAME = Your Account Name
ADMIN_KEY = lekki-admin-confirmation-passkey419
RATE_LIMIT_WINDOW_MS = 900000
RATE_LIMIT_MAX_REQUESTS = 100
ENABLE_PERFORMANCE_MONITORING = true
LOG_LEVEL = info
```

**⚠️ Critical:** Make sure `BASE_URL` matches your actual Vercel domain!

### Environment Variable Setup:

For each variable:
1. **Name:** Enter the variable name (e.g., `HOST_WHATSAPP_NUMBER`)
2. **Value:** Enter the value (e.g., `+2349039269846`)
3. **Environment:** Select **Production**, **Preview**, and **Development**
4. **Click "Save"**

---

## 🔄 Step 5: Redeploy

After adding environment variables:

1. **Go to "Deployments" tab**
2. **Click the three dots** on the latest deployment
3. **Click "Redeploy"**
4. **Wait for deployment to complete**

---

## ✅ Step 6: Test Your Deployment

### Test 1: Visit Your Site

Go to: `https://your-app-name.vercel.app`

Should show your Lekki Stays homepage ✅

### Test 2: Health Check

Visit: `https://your-app-name.vercel.app/api/health`

Should return:
```json
{
  "status": "OK",
  "timestamp": "2026-04-27T...",
  "environment": "production"
}
```

### Test 3: Make a Test Booking

1. **Select an apartment**
2. **Choose dates and guests**
3. **Fill the booking form**
4. **Submit booking**

### Test 4: Check WhatsApp

**Open WhatsApp on +2349039269846**

You should receive:
```
🏠 NEW BOOKING — Lekki Stays

Apartment: [Name]
Guest: [Name]
...

✅ CONFIRM: https://your-app-name.vercel.app/api/bookings/.../confirm?token=...&admin=...
❌ DECLINE: https://your-app-name.vercel.app/api/bookings/.../decline?token=...&admin=...
⚠️ CANCEL: https://your-app-name.vercel.app/api/bookings/.../cancel?token=...&admin=...
```

**✅ Verify:** Links show your Vercel domain (not localhost!)

### Test 5: Test Admin Links

1. **Tap CONFIRM link** on your phone → Should open confirmation page ✅
2. **Copy link and remove `&admin=...`** → Should show "Access Denied" ✅

---

## 🎯 Step 7: Custom Domain (Optional)

### Add Your Own Domain

1. **Buy a domain** (e.g., `lekkistays.com`)
2. **In Vercel dashboard:**
   - Go to "Settings" → "Domains"
   - Add your domain
   - Follow DNS setup instructions
3. **Update `BASE_URL`** environment variable to your custom domain
4. **Redeploy**

---

## 📱 Step 8: Update WhatsApp Links

### If You Change Domain:

1. **Update `BASE_URL`** in Vercel environment variables
2. **Redeploy** the application
3. **Test new bookings** to ensure links work

---

## 🔧 Troubleshooting

### Problem: "Function Timeout"

**Solution:** Vercel free tier has 10-second timeout. If you hit this:
1. Optimize database queries
2. Consider upgrading to Vercel Pro

### Problem: "Module not found"

**Solution:** 
1. Check `package.json` includes all dependencies
2. Redeploy after fixing dependencies

### Problem: WhatsApp links still show localhost

**Solution:**
1. Verify `BASE_URL` environment variable in Vercel
2. Ensure it matches your actual domain
3. Redeploy after changes

### Problem: Database not working

**Solution:** 
1. Vercel serverless functions are stateless
2. Database files don't persist between requests
3. Consider using Vercel KV or external database for production

---

## 🎉 Success Checklist

After deployment, verify:

- ✅ **Website loads:** `https://your-app-name.vercel.app`
- ✅ **Health check works:** `/api/health` returns OK
- ✅ **Booking form works:** Can submit bookings
- ✅ **WhatsApp notifications:** Receive messages on your phone
- ✅ **Admin links work:** Can confirm/decline bookings
- ✅ **Security works:** Access denied without admin key
- ✅ **Links show live domain:** Not localhost

---

## 🚀 Your Live URLs

After deployment, you'll have:

**Website:** `https://your-app-name.vercel.app`  
**API:** `https://your-app-name.vercel.app/api/`  
**Admin WhatsApp:** `+2349039269846`

---

## 📊 Monitoring

### Vercel Dashboard:

- **Functions:** Monitor API performance
- **Analytics:** Track website visits
- **Logs:** Debug issues in real-time

### WhatsApp:

- Test bookings regularly
- Ensure notifications arrive promptly
- Verify all links work on mobile

---

## 🔄 Updates and Maintenance

### To Update Your Site:

1. **Make changes locally**
2. **Test changes:** `npm run dev`
3. **Commit to GitHub:**
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
4. **Vercel auto-deploys** from GitHub

### Regular Maintenance:

- Test booking flow monthly
- Update apartment listings as needed
- Monitor WhatsApp notifications
- Check Vercel function logs for errors

---

## 🎯 Next Steps

After successful deployment:

1. ✅ **Share your live URL** with potential guests
2. ✅ **Test the full booking flow** end-to-end
3. ✅ **Add more apartments** to your listings
4. ✅ **Consider custom domain** for branding
5. ✅ **Monitor bookings** and respond promptly

**Your Lekki Stays platform is now live and ready for guests!** 🏠✨

---

## 📞 Support

If you encounter issues:
- Check Vercel function logs
- Verify environment variables
- Test WhatsApp number functionality
- Ensure GitHub repository is up to date

**Happy hosting!** 🎉