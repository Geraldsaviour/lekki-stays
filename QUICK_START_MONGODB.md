# Quick Start: MongoDB + Vercel Deployment

## 5-Minute Setup

### Step 1: MongoDB Atlas (2 min)
```
1. Go to mongodb.com/cloud/atlas
2. Sign up (free)
3. Create M0 cluster
4. Create user: lekki-stays / strong_password
5. Allow access from anywhere
6. Copy connection string
```

### Step 2: Update .env (1 min)
```bash
# server/.env
MONGODB_URI=mongodb+srv://lekki-stays:PASSWORD@cluster.mongodb.net/lekki-stays?retryWrites=true&w=majority
```

### Step 3: Test Locally (1 min)
```bash
cd server
npm install
npm start
# Should see: ✅ Connected to MongoDB successfully
```

### Step 4: Deploy (1 min)
```bash
git add .
git commit -m "Add MongoDB"
git push origin main
# Vercel auto-deploys
```

### Step 5: Add Vercel Env Var (1 min)
```
Vercel Dashboard → Settings → Environment Variables
Add: MONGODB_URI = your_connection_string
```

## Done! ✅

Your bookings now persist forever in MongoDB Atlas (free tier).

## Verify It Works

1. Visit your Vercel domain
2. Create a test booking
3. Check MongoDB Atlas Dashboard → Collections → bookings
4. See your booking data!

## Key URLs

- MongoDB Atlas: https://cloud.mongodb.com
- Vercel Dashboard: https://vercel.com/dashboard
- Your App: https://your-domain.vercel.app

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Connection timeout | Check IP whitelist in MongoDB Atlas |
| Auth failed | Verify password in connection string |
| Data not saving | Check MongoDB connection in Vercel logs |
| Slow queries | Indexes auto-created, should be fast |

## What's Included (Free)

✅ 512 MB storage
✅ Unlimited connections
✅ Automatic backups (7 days)
✅ 99.5% uptime SLA
✅ Real-time queries
✅ Scalable to millions of bookings

## Files to Know

- `server/db-mongo.js` - Database connection
- `server/.env` - Configuration
- `MONGODB_SETUP.md` - Detailed setup guide
- `MONGODB_VERCEL_DEPLOYMENT.md` - Full deployment guide

## Next Steps

1. Monitor bookings in MongoDB Atlas
2. Set up booking confirmation emails
3. Add payment processing
4. Create admin dashboard
5. Scale to production

---

**Questions?** Check `MONGODB_SETUP.md` or `MONGODB_VERCEL_DEPLOYMENT.md`
