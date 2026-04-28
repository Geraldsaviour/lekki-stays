# MongoDB Atlas Setup Guide (Free Tier)

## Overview
MongoDB Atlas is a free cloud database service perfect for this project. The free tier includes:
- 512 MB storage
- Shared cluster
- Unlimited connections
- Automatic backups

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with email or Google account
4. Verify your email

## Step 2: Create a Free Cluster

1. After login, click "Create a Deployment"
2. Select "M0 Free" tier
3. Choose your cloud provider (AWS, Google Cloud, or Azure)
4. Select a region close to your users
5. Click "Create Deployment"
6. Wait for cluster to be created (2-3 minutes)

## Step 3: Create Database User

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username: `lekki-stays`
5. Enter a strong password (save this!)
6. Click "Add User"

## Step 4: Configure Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (for development)
4. Click "Confirm"

**Note:** For production, restrict to specific IPs

## Step 5: Get Connection String

1. Click "Databases" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Choose "Node.js" and version "4.x or later"
5. Copy the connection string

## Step 6: Update Environment Variables

Replace the connection string in `server/.env`:

```
MONGODB_URI=mongodb+srv://lekki-stays:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lekki-stays?retryWrites=true&w=majority
```

Replace:
- `YOUR_PASSWORD` with the password you created
- `cluster0.xxxxx` with your actual cluster name

## Step 7: Test Connection

Run the server locally:

```bash
cd server
npm install
npm start
```

You should see:
```
✅ Connected to MongoDB successfully
✅ Database indexes created
✅ Database initialized successfully
```

## Step 8: Deploy to Vercel

1. Add the `MONGODB_URI` environment variable to Vercel:
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add `MONGODB_URI` with your connection string

2. Deploy:
   ```bash
   git add .
   git commit -m "Integrate MongoDB Atlas"
   git push origin main
   ```

## Monitoring Your Database

1. Go to MongoDB Atlas Dashboard
2. Click "Databases"
3. Click "Browse Collections" to see your data
4. View metrics and performance

## Scaling Up (When Needed)

When you outgrow the free tier:
1. Click "Upgrade" on your cluster
2. Choose M2 or higher tier
3. Billing starts immediately

## Troubleshooting

### Connection Timeout
- Check IP whitelist in Network Access
- Verify connection string is correct
- Ensure database user password is correct

### Authentication Failed
- Double-check username and password
- Verify special characters are URL-encoded
- Check database user exists in Database Access

### Slow Queries
- Check indexes are created
- Monitor query performance in Atlas
- Consider upgrading cluster tier

## Free Tier Limits

- **Storage:** 512 MB
- **Connections:** Unlimited
- **Backups:** Automatic (7-day retention)
- **Uptime SLA:** 99.5%

## Next Steps

1. Monitor database usage in Atlas Dashboard
2. Set up alerts for storage limits
3. Plan upgrade path if needed
4. Consider backup strategy

## Support

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [MongoDB Community Forum](https://www.mongodb.com/community/forums/)
