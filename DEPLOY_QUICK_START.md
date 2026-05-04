# 🚀 Quick Start - Deploy to Vercel

## ⚡ Fast Track Deployment (30 Minutes)

### Prerequisites
- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ Supabase project set up
- ✅ Code pushed to GitHub

---

## 📋 Step-by-Step

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Get Supabase Credentials

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to: **Settings → API**
4. Copy these values:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** → `SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

---

## 🌐 Deploy User Frontend

### Option A: Using Script (Recommended)

**Windows:**
```bash
deploy-user.bat
```

**Mac/Linux:**
```bash
chmod +x deploy-user.sh
./deploy-user.sh
```

### Option B: Using NPM

```bash
npm run deploy:user
```

### Option C: Manual Deployment

```bash
# Copy user config
cp vercel-user.json vercel.json

# Deploy
vercel --prod

# Clean up
rm vercel.json
```

### Configure Environment Variables

After deployment, go to Vercel Dashboard:

1. Select your project
2. Go to: **Settings → Environment Variables**
3. Add these variables:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
HOST_WHATSAPP_NUMBER=2348012345678
NODE_ENV=production
```

4. Click **Redeploy** to apply changes

---

## 🔐 Deploy Admin Dashboard

### Option A: Using Script (Recommended)

**Windows:**
```bash
deploy-admin.bat
```

**Mac/Linux:**
```bash
chmod +x deploy-admin.sh
./deploy-admin.sh
```

### Option B: Using NPM

```bash
npm run deploy:admin
```

### Option C: Manual Deployment

```bash
# Copy admin config
cp vercel-admin.json vercel.json

# Deploy
vercel --prod

# Clean up
rm vercel.json
```

### Configure Environment Variables

Same as User Frontend - add the same environment variables.

---

## 🔧 Post-Deployment Configuration

### 1. Update Supabase URLs

Go to: **Supabase Dashboard → Authentication → URL Configuration**

**Site URL:**
```
https://your-user-project.vercel.app
```

**Redirect URLs:**
```
https://your-user-project.vercel.app
https://your-admin-project.vercel.app
http://localhost:3000
```

### 2. Update Storage CORS

Go to: **Supabase Dashboard → Storage → payment-receipts**

Add your admin URL to allowed origins:
```
https://your-admin-project.vercel.app
```

---

## ✅ Verify Deployment

### User Frontend:
1. Visit: `https://your-user-project.vercel.app`
2. Check homepage loads
3. Try searching apartments
4. Test booking flow

### Admin Dashboard:
1. Visit: `https://your-admin-project.vercel.app`
2. Login with your credentials
3. Check dashboard loads
4. Test booking management
5. Test receipt upload

---

## 🐛 Common Issues

### Issue: "Module not found"
**Fix:** Make sure all dependencies are in `package.json`

### Issue: "Environment variable not defined"
**Fix:** Add variables in Vercel Dashboard, then redeploy

### Issue: "CORS error"
**Fix:** Update Supabase allowed URLs

### Issue: "404 on routes"
**Fix:** Check `vercel-user.json` or `vercel-admin.json` routes

---

## 📊 Deployment Checklist

- [ ] Vercel CLI installed
- [ ] Logged into Vercel
- [ ] User frontend deployed
- [ ] Admin dashboard deployed
- [ ] Environment variables set (both projects)
- [ ] Supabase URLs updated
- [ ] Storage CORS updated
- [ ] User frontend tested
- [ ] Admin dashboard tested
- [ ] Receipt upload tested

---

## 🎉 Done!

Your Lekki Stays platform is now live!

**Next Steps:**
1. Test all features
2. Share user URL with customers
3. Keep admin URL private
4. Monitor Vercel logs for errors

---

## 📞 Need Help?

Check the full guide: `DEPLOYMENT_GUIDE.md`

Or check Vercel logs:
```bash
vercel logs
```

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically deploys
4. Check deployment status in Vercel Dashboard

---

## 📝 Quick Reference

### Deploy Commands:
```bash
# User frontend
npm run deploy:user

# Admin dashboard
npm run deploy:admin

# Both
npm run deploy:all
```

### Vercel Commands:
```bash
# Login
vercel login

# Deploy
vercel --prod

# Check logs
vercel logs

# List deployments
vercel ls
```

### Environment Variables:
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
HOST_WHATSAPP_NUMBER=2348012345678
NODE_ENV=production
```

---

## 🎯 Success Criteria

Your deployment is successful when:

- ✅ User frontend loads at Vercel URL
- ✅ Admin dashboard loads at Vercel URL
- ✅ Can browse apartments
- ✅ Can make bookings
- ✅ Can login to admin
- ✅ Can manage bookings
- ✅ Can upload receipts
- ✅ No console errors
- ✅ Mobile responsive works

---

## 🚀 Ready to Deploy!

Follow the steps above and your site will be live in ~30 minutes!

**Start with:** Install Vercel CLI → Deploy User → Deploy Admin → Configure → Test

Good luck! 🎉
