# 🚀 Lekki Stays - Vercel Deployment Guide

## 📋 Deployment Strategy

We'll deploy **TWO separate Vercel projects**:

1. **User Frontend** - Main booking website (public)
2. **Admin Dashboard** - Admin management panel (protected)

Both will share the same:
- Supabase backend (database + storage)
- Environment variables
- API endpoints

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   SUPABASE                       │
│  (Database + Storage + Authentication)          │
└─────────────────────────────────────────────────┘
                      ▲
                      │
        ┌─────────────┴─────────────┐
        │                           │
┌───────▼────────┐         ┌────────▼────────┐
│  USER FRONTEND │         │ ADMIN DASHBOARD │
│   (Vercel #1)  │         │   (Vercel #2)   │
│                │         │                 │
│  - Homepage    │         │  - Login        │
│  - Listings    │         │  - Bookings     │
│  - Search      │         │  - Apartments   │
│  - Booking     │         │  - Analytics    │
└────────────────┘         └─────────────────┘
```

---

## 📦 Repository Structure

### Option 1: Monorepo (Recommended)
Keep everything in one repo, deploy different folders to different Vercel projects.

```
lekki-stays/
├── public/          → Deploy to Vercel Project #1 (User)
├── admin/           → Deploy to Vercel Project #2 (Admin)
├── server/          → Shared API (deployed with both)
├── supabase/        → Database schema (not deployed)
└── docs/            → Documentation (not deployed)
```

### Option 2: Separate Repos
Split into two repositories (more complex, not recommended).

---

## 🎯 Deployment Steps

### Prerequisites

1. **Vercel Account**
   - Sign up at: https://vercel.com
   - Install Vercel CLI: `npm install -g vercel`

2. **Supabase Project**
   - Already set up ✅
   - Get your credentials ready

3. **GitHub Repository**
   - Push your code to GitHub
   - Make sure `.env` is in `.gitignore`

---

## 🚀 Deploy User Frontend (Project #1)

### Step 1: Create Vercel Project

1. Go to: https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Project Name:** `lekki-stays-user`
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as root)
   - **Build Command:** (leave empty)
   - **Output Directory:** `public`

### Step 2: Configure Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# WhatsApp
HOST_WHATSAPP_NUMBER=2348012345678

# Node Environment
NODE_ENV=production
```

### Step 3: Configure vercel.json

Create `vercel-user.json`:

```json
{
  "version": 2,
  "name": "lekki-stays-user",
  "builds": [
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

### Step 4: Deploy

```bash
# From project root
vercel --prod
```

---

## 🔐 Deploy Admin Dashboard (Project #2)

### Step 1: Create Vercel Project

1. Go to: https://vercel.com/new
2. Import the **SAME** GitHub repository
3. Configure project:
   - **Project Name:** `lekki-stays-admin`
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as root)
   - **Build Command:** (leave empty)
   - **Output Directory:** `admin`

### Step 2: Configure Environment Variables

Add the **SAME** environment variables as User Frontend:

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# WhatsApp
HOST_WHATSAPP_NUMBER=2348012345678

# Node Environment
NODE_ENV=production
```

### Step 3: Configure vercel.json

Create `vercel-admin.json`:

```json
{
  "version": 2,
  "name": "lekki-stays-admin",
  "builds": [
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "admin/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/admin/$1"
    }
  ]
}
```

### Step 4: Deploy

```bash
# From project root
vercel --prod
```

---

## 🔧 Update API Endpoints

After deployment, update your frontend code to use production URLs.

### User Frontend (public/shared/api-client.js)

```javascript
// Change from localhost to production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://lekki-stays-user.vercel.app/api'
  : 'http://localhost:3000/api';
```

### Admin Dashboard (admin/js/config.js)

```javascript
// Change from localhost to production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://lekki-stays-admin.vercel.app/api'
  : 'http://localhost:3000/api';
```

---

## 🔒 Security Configuration

### 1. Update CORS in server/server.js

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://lekki-stays-user.vercel.app',
  'https://lekki-stays-admin.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### 2. Update Supabase Allowed URLs

In Supabase Dashboard → Authentication → URL Configuration:

**Site URL:**
```
https://lekki-stays-user.vercel.app
```

**Redirect URLs:**
```
https://lekki-stays-user.vercel.app
https://lekki-stays-admin.vercel.app
http://localhost:3000
```

### 3. Update Storage CORS

In Supabase Dashboard → Storage → payment-receipts → CORS:

```json
[
  {
    "allowedOrigins": [
      "https://lekki-stays-admin.vercel.app",
      "http://localhost:3000"
    ],
    "allowedMethods": ["GET", "POST", "PUT", "DELETE"],
    "allowedHeaders": ["*"],
    "maxAge": 3600
  }
]
```

---

## 📝 Environment Variables Checklist

### Required for Both Projects:

- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `HOST_WHATSAPP_NUMBER`
- [ ] `NODE_ENV=production`

### How to Get Supabase Credentials:

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to: Settings → API
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** → `SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

---

## 🧪 Testing Deployment

### User Frontend Tests:

1. **Homepage:** https://lekki-stays-user.vercel.app
   - [ ] Loads correctly
   - [ ] Apartments display
   - [ ] Search works

2. **Booking Flow:**
   - [ ] Select apartment
   - [ ] Fill booking form
   - [ ] Submit booking
   - [ ] WhatsApp link works

3. **API Endpoints:**
   - [ ] GET /api/apartments
   - [ ] POST /api/bookings
   - [ ] GET /api/bookings/:id

### Admin Dashboard Tests:

1. **Login:** https://lekki-stays-admin.vercel.app
   - [ ] Login page loads
   - [ ] Can login with credentials
   - [ ] Redirects to dashboard

2. **Dashboard:**
   - [ ] Stats display
   - [ ] Bookings list loads
   - [ ] Apartments list loads

3. **Booking Management:**
   - [ ] Can view booking details
   - [ ] Can confirm bookings
   - [ ] Can decline bookings
   - [ ] Can mark as paid (with receipt upload)
   - [ ] Can cancel bookings

4. **Receipt Upload:**
   - [ ] Modal opens
   - [ ] File upload works
   - [ ] Image preview shows
   - [ ] Submit works
   - [ ] Receipt stored in Supabase

---

## 🐛 Troubleshooting

### Issue: API calls fail with CORS error

**Solution:**
1. Check CORS configuration in `server/server.js`
2. Add your Vercel URLs to `allowedOrigins`
3. Redeploy

### Issue: Environment variables not working

**Solution:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify all variables are set
3. Click "Redeploy" to apply changes

### Issue: Supabase authentication fails

**Solution:**
1. Go to Supabase → Authentication → URL Configuration
2. Add your Vercel URLs to Redirect URLs
3. Save changes

### Issue: Receipt upload fails

**Solution:**
1. Check Supabase Storage CORS settings
2. Add your admin Vercel URL to allowed origins
3. Verify storage bucket is Public

### Issue: 404 errors on routes

**Solution:**
1. Check `vercel.json` routes configuration
2. Verify file paths are correct
3. Redeploy

---

## 📊 Deployment Checklist

### Pre-Deployment:

- [ ] Code pushed to GitHub
- [ ] `.env` in `.gitignore`
- [ ] Supabase project ready
- [ ] Database schema applied
- [ ] Storage bucket created
- [ ] Storage policies set

### User Frontend Deployment:

- [ ] Vercel project created
- [ ] Environment variables set
- [ ] `vercel-user.json` configured
- [ ] Deployed successfully
- [ ] Homepage loads
- [ ] Booking flow works

### Admin Dashboard Deployment:

- [ ] Vercel project created
- [ ] Environment variables set
- [ ] `vercel-admin.json` configured
- [ ] Deployed successfully
- [ ] Login works
- [ ] Dashboard loads
- [ ] Receipt upload works

### Post-Deployment:

- [ ] CORS configured
- [ ] Supabase URLs updated
- [ ] Storage CORS updated
- [ ] All features tested
- [ ] Mobile responsive verified
- [ ] WhatsApp links work

---

## 🎉 Success!

Your Lekki Stays platform is now live!

**User Frontend:** https://lekki-stays-user.vercel.app
**Admin Dashboard:** https://lekki-stays-admin.vercel.app

---

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Check Supabase logs
4. Verify environment variables
5. Check CORS configuration

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically deploys
4. Check deployment status in Vercel Dashboard

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Node.js on Vercel:** https://vercel.com/docs/runtimes#official-runtimes/node-js

---

Ready to deploy? Follow the steps above! 🚀
