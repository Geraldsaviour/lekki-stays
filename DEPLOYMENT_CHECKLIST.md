# ✅ Deployment Checklist - Lekki Stays

## 📋 Pre-Deployment

### Code Preparation
- [ ] All code committed to Git
- [ ] `.env` file in `.gitignore`
- [ ] No sensitive data in code
- [ ] All features tested locally
- [ ] Code pushed to GitHub

### Supabase Setup
- [ ] Supabase project created
- [ ] Database schema applied
- [ ] `bookings` table exists
- [ ] `apartments` table exists
- [ ] `payment-receipts` storage bucket created
- [ ] Storage bucket is Public
- [ ] 3 storage policies added (upload, read, delete)
- [ ] Admin user created
- [ ] Test data added (optional)

### Credentials Ready
- [ ] Supabase URL copied
- [ ] Supabase Anon Key copied
- [ ] Supabase Service Role Key copied
- [ ] WhatsApp number ready (format: 2348012345678)

---

## 🚀 Deployment

### Vercel Setup
- [ ] Vercel account created
- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Logged into Vercel (`vercel login`)

### User Frontend Deployment
- [ ] Run `deploy-user.bat` (Windows) or `./deploy-user.sh` (Mac/Linux)
- [ ] Or run `npm run deploy:user`
- [ ] Deployment successful
- [ ] Project URL noted: `https://_____.vercel.app`

### User Frontend Configuration
- [ ] Go to Vercel Dashboard → Project → Settings → Environment Variables
- [ ] Add `SUPABASE_URL`
- [ ] Add `SUPABASE_ANON_KEY`
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Add `HOST_WHATSAPP_NUMBER`
- [ ] Add `NODE_ENV=production`
- [ ] Click "Redeploy" to apply changes

### Admin Dashboard Deployment
- [ ] Run `deploy-admin.bat` (Windows) or `./deploy-admin.sh` (Mac/Linux)
- [ ] Or run `npm run deploy:admin`
- [ ] Deployment successful
- [ ] Project URL noted: `https://_____.vercel.app`

### Admin Dashboard Configuration
- [ ] Go to Vercel Dashboard → Project → Settings → Environment Variables
- [ ] Add same environment variables as User Frontend
- [ ] Click "Redeploy" to apply changes

---

## 🔧 Post-Deployment Configuration

### Supabase Authentication URLs
- [ ] Go to Supabase Dashboard → Authentication → URL Configuration
- [ ] Set **Site URL** to user frontend URL
- [ ] Add user frontend URL to **Redirect URLs**
- [ ] Add admin dashboard URL to **Redirect URLs**
- [ ] Add `http://localhost:3000` to **Redirect URLs** (for local dev)
- [ ] Save changes

### Supabase Storage CORS
- [ ] Go to Supabase Dashboard → Storage → payment-receipts
- [ ] Click "CORS" or "Configuration"
- [ ] Add admin dashboard URL to allowed origins
- [ ] Add `http://localhost:3000` to allowed origins
- [ ] Save changes

### Server CORS Configuration (Optional)
- [ ] Open `server/server.js`
- [ ] Update `allowedOrigins` array with your Vercel URLs
- [ ] Commit and push changes
- [ ] Vercel will auto-redeploy

---

## 🧪 Testing

### User Frontend Tests
- [ ] Visit user frontend URL
- [ ] Homepage loads correctly
- [ ] Apartments display
- [ ] Images load
- [ ] Search works
- [ ] Click on apartment → Details page loads
- [ ] Fill booking form
- [ ] Submit booking
- [ ] Success message appears
- [ ] WhatsApp link works
- [ ] Mobile responsive (test on phone)

### Admin Dashboard Tests
- [ ] Visit admin dashboard URL
- [ ] Login page loads
- [ ] Login with credentials: `geraldsaviour2@gmail.com`
- [ ] Dashboard loads
- [ ] Stats display correctly
- [ ] Bookings list loads
- [ ] Apartments list loads
- [ ] Click "View Details" on booking → Modal opens
- [ ] Click "Confirm" on pending booking → Works
- [ ] Click "Send Payment" → WhatsApp link works
- [ ] Click "Mark as Paid" → Receipt modal opens

### Receipt Upload Tests
- [ ] Receipt modal opens
- [ ] Upload image file
- [ ] Image preview shows
- [ ] Enter amount (exact match)
- [ ] Check both checkboxes
- [ ] Submit button enables
- [ ] Click "Verify & Mark as Paid"
- [ ] Upload completes
- [ ] Success message appears
- [ ] Booking status changes to "Paid"
- [ ] Go to Supabase Storage → payment-receipts
- [ ] Receipt file appears
- [ ] Go to Supabase Table Editor → bookings
- [ ] Booking record updated with receipt info

### Mobile Tests
- [ ] Test user frontend on mobile
- [ ] Test admin dashboard on mobile
- [ ] Touch targets work (44px minimum)
- [ ] Modals work on mobile
- [ ] Forms work on mobile
- [ ] Receipt upload works on mobile

---

## 🔒 Security Verification

### Environment Variables
- [ ] No `.env` file in GitHub
- [ ] All secrets in Vercel environment variables
- [ ] Service role key never exposed in frontend

### Supabase Security
- [ ] Row Level Security (RLS) enabled on tables
- [ ] Storage policies restrict access
- [ ] Admin authentication required

### CORS Configuration
- [ ] Only allowed origins can access API
- [ ] Storage CORS properly configured

---

## 📊 Monitoring

### Vercel Dashboard
- [ ] Check deployment status
- [ ] Review build logs
- [ ] Monitor function logs
- [ ] Check analytics

### Supabase Dashboard
- [ ] Monitor database usage
- [ ] Check storage usage
- [ ] Review authentication logs
- [ ] Check API usage

---

## 🐛 Troubleshooting

### If User Frontend Fails:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables
4. Check Supabase connection
5. Verify API routes in `vercel-user.json`

### If Admin Dashboard Fails:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables
4. Check Supabase authentication
5. Verify API routes in `vercel-admin.json`

### If Receipt Upload Fails:
1. Check Supabase Storage bucket exists
2. Verify bucket is Public
3. Check storage policies
4. Verify CORS configuration
5. Check browser console for errors

---

## 📝 Documentation

### URLs to Save:
```
User Frontend: https://_____.vercel.app
Admin Dashboard: https://_____.vercel.app
Supabase URL: https://_____.supabase.co
GitHub Repo: https://github.com/___/___
```

### Credentials to Save (Securely):
```
Admin Email: geraldsaviour2@gmail.com
Admin Password: [your password]
Supabase Anon Key: [saved in Vercel]
Supabase Service Role Key: [saved in Vercel]
WhatsApp Number: [your number]
```

---

## 🎉 Launch Checklist

### Before Going Live:
- [ ] All tests passed
- [ ] Mobile responsive verified
- [ ] Security verified
- [ ] Monitoring set up
- [ ] Documentation complete
- [ ] Backup plan ready

### Launch Day:
- [ ] Final test of all features
- [ ] Share user frontend URL
- [ ] Keep admin dashboard URL private
- [ ] Monitor for errors
- [ ] Be ready to fix issues

### Post-Launch:
- [ ] Monitor Vercel logs
- [ ] Monitor Supabase usage
- [ ] Collect user feedback
- [ ] Fix any issues
- [ ] Plan improvements

---

## 🔄 Continuous Deployment

### Auto-Deploy Setup:
- [ ] Vercel connected to GitHub
- [ ] Auto-deploy on push enabled
- [ ] Production branch set (usually `main`)

### Making Updates:
1. Make changes locally
2. Test locally (`npm run dev`)
3. Commit changes
4. Push to GitHub
5. Vercel auto-deploys
6. Verify deployment successful

---

## 📞 Support Resources

### Documentation:
- [ ] `DEPLOYMENT_GUIDE.md` - Full deployment guide
- [ ] `DEPLOY_QUICK_START.md` - Quick start guide
- [ ] `DEPLOYMENT_CHECKLIST.md` - This checklist

### External Resources:
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- GitHub: https://github.com

---

## ✅ Final Verification

### Everything Working:
- [ ] User can browse apartments
- [ ] User can make bookings
- [ ] Admin receives notifications
- [ ] Admin can manage bookings
- [ ] Admin can upload receipts
- [ ] All data saves to Supabase
- [ ] Mobile works perfectly
- [ ] No console errors
- [ ] No deployment errors

---

## 🎊 Success!

Your Lekki Stays platform is now live and ready for customers!

**User Frontend:** https://_____.vercel.app
**Admin Dashboard:** https://_____.vercel.app

Share the user URL with your customers and start taking bookings! 🚀

---

**Date Deployed:** ___________
**Deployed By:** ___________
**Version:** 1.0.0
