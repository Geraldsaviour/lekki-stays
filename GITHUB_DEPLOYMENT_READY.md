# GitHub Deployment Ready ✅

## Repositories Created

1. **lekki-stays-user** (NEW)
   - URL: https://github.com/Geraldsaviour/lekki-stays-user
   - Purpose: User-facing frontend with booking system

2. **lekki-stays-admin** (EXISTS)
   - URL: https://github.com/Geraldsaviour/lekki-stays-admin
   - Purpose: Admin dashboard for booking management

## Deployment Files Prepared

### User Frontend (`deploy-user/`)
- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Dependencies
- ✅ `.gitignore` - Git ignore rules
- ✅ `.env.example` - Environment variables template

### Admin Dashboard (`deploy-admin/`)
- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Dependencies
- ✅ `.gitignore` - Git ignore rules
- ✅ `.env.example` - Environment variables template

## Files to Copy

### For User Frontend Repository

**Required folders:**
```
public/
├── index.html
├── script.js
├── styles.css
├── booking/
│   ├── booking.html
│   ├── booking.js
│   └── booking.css
├── listings/
│   ├── listing-1.html through listing-8.html
│   ├── listing-detail.js
│   └── listing-detail.css
├── search/
│   ├── search-results.html
│   ├── search-results.js
│   └── search-results.css
└── shared/
    └── api-client.js

server/
├── server.js
├── config/
│   └── supabase.js
├── routes/
│   ├── apartments-supabase.js
│   ├── bookings-supabase.js
│   ├── notifications.js
│   └── payments.js
├── middleware/
│   └── performance.js
└── utils/
    └── whatsapp.js
```

### For Admin Dashboard Repository

**Required folders:**
```
admin/
├── index.html
├── dashboard.html
├── css/
│   ├── admin.css
│   └── dashboard.css
└── js/
    ├── api.js
    ├── auth.js
    ├── config.js
    └── dashboard.js

server/
├── server.js
├── config/
│   └── supabase.js
├── routes/
│   ├── apartments-supabase.js
│   ├── bookings-supabase.js
│   ├── notifications.js
│   └── payments.js
├── middleware/
│   └── performance.js
└── utils/
    └── whatsapp.js
```

## Next Steps

### Option 1: Manual Copy & Push (Recommended)

1. **Copy files to deploy folders:**
   ```bash
   # User frontend
   cp -r public deploy-user/
   cp -r server deploy-user/
   
   # Admin dashboard
   cp -r admin deploy-admin/
   cp -r server deploy-admin/
   ```

2. **Push to GitHub:**
   ```bash
   # User frontend
   cd deploy-user
   git init
   git add .
   git commit -m "Initial deployment setup"
   git branch -M main
   git remote add origin https://github.com/Geraldsaviour/lekki-stays-user.git
   git push -u origin main
   
   # Admin dashboard
   cd ../deploy-admin
   git init
   git add .
   git commit -m "Initial deployment setup"
   git branch -M main
   git remote add origin https://github.com/Geraldsaviour/lekki-stays-admin.git
   git push -u origin main
   ```

### Option 2: Use GitHub Desktop

1. Open GitHub Desktop
2. Add each deploy folder as a repository
3. Commit and push to the respective GitHub repos

### Option 3: Use VS Code

1. Open each deploy folder in VS Code
2. Initialize Git repository
3. Add remote origin
4. Commit and push

## Deployment to Vercel

Once files are pushed to GitHub:

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Import Project** → Select GitHub repository
3. **Configure:**
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`
4. **Add Environment Variables:**
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   HOST_WHATSAPP_NUMBER=2349039269846
   NODE_ENV=production
   ```
5. **Deploy!**

## Important Notes

- ✅ No documentation files included (as requested)
- ✅ No markdown files in deployment folders
- ✅ Only essential files for 100% functionality
- ✅ Separate repos for user and admin
- ✅ Clean structure for Vercel deployment

## Environment Variables Required

Both projects need these environment variables in Vercel:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
HOST_WHATSAPP_NUMBER=2349039269846
NODE_ENV=production
```

For admin dashboard, also add:
```env
ADMIN_EMAIL=geraldsaviour2@gmail.com
```

## Verification Checklist

Before deploying:
- [ ] All files copied to deploy folders
- [ ] Git repositories initialized
- [ ] Files pushed to GitHub
- [ ] Vercel projects created
- [ ] Environment variables configured
- [ ] Test deployments working

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Ensure Supabase credentials are correct
4. Check GitHub repository has all files
