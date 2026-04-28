# Vercel Deployment Checklist

## Before Deploying

- [ ] All files are committed to git
- [ ] Environment variables are set in Vercel dashboard
- [ ] `.env` file is NOT committed (add to `.gitignore`)
- [ ] `server/.env` is NOT committed (add to `.gitignore`)

## Required Environment Variables in Vercel

Set these in your Vercel project settings → Environment Variables:

```
NODE_ENV=production
PORT=3000
HOST_WHATSAPP_NUMBER=+2349039269846
BASE_URL=https://your-domain.vercel.app
BANK_NAME=GTBank
BANK_ACCOUNT_NUMBER=9039269846
BANK_ACCOUNT_NAME=Lekki Stays Ltd
ADMIN_KEY=your-secret-admin-key
DB_PATH=./data/lekki-stays.db
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ENABLE_PERFORMANCE_MONITORING=true
LOG_LEVEL=info
```

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Fix booking reservation on Vercel"
   git push origin main
   ```

2. **Vercel Auto-Deploy**
   - Vercel will automatically deploy when you push to main
   - Check deployment status in Vercel dashboard

3. **Verify Deployment**
   - Visit your Vercel domain
   - Try creating a booking
   - Check Vercel logs for any errors

## Monitoring

### View Logs
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click the latest deployment
5. Click "Logs" tab

### Check Booking Status
- Bookings are stored in memory on Vercel
- They will be lost when the function instance recycles
- For persistent storage, integrate a database

## Troubleshooting

### Booking Still Fails
1. Check Vercel logs for detailed error messages
2. Verify all environment variables are set
3. Check that the API endpoint is correct
4. Ensure CORS is properly configured

### Bookings Not Persisting
This is expected behavior with the current in-memory storage. To fix:
1. Integrate MongoDB or PostgreSQL
2. Update `server/db-simple.js` to use the database
3. Update environment variables with DB connection string

## Next Steps

### Immediate (Optional)
- Monitor booking creation in production
- Collect user feedback

### Short Term (Recommended)
- Integrate a persistent database
- Add booking confirmation emails
- Add payment processing

### Long Term
- Add admin dashboard
- Add booking analytics
- Add automated notifications
