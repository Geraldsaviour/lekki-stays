# 🗄️ MongoDB Atlas Setup Guide

## Complete Step-by-Step Instructions

---

## Step 1: Create MongoDB Atlas Account (2 minutes)

### 1.1 Sign Up
1. Open your browser and go to: **https://cloud.mongodb.com**
2. Click **"Try Free"** button
3. Sign up using:
   - Email and password, OR
   - Google account, OR
   - GitHub account
4. Verify your email if required

### 1.2 Create Organization (if prompted)
1. Organization Name: `Lekki Stays`
2. Project Name: `lekki-stays-production`
3. Click **"Next"** or **"Create"**

---

## Step 2: Create Free Cluster (3 minutes)

### 2.1 Choose Deployment Type
1. Click **"Build a Database"** or **"Create"**
2. Select **"Shared"** (Free tier)
3. Click **"Create"**

### 2.2 Configure Cluster
1. **Cloud Provider**: AWS (recommended) or Google Cloud
2. **Region**: Choose closest to Nigeria:
   - **Europe (Frankfurt)** - eu-central-1 (Recommended)
   - **Europe (London)** - eu-west-2
   - **Europe (Ireland)** - eu-west-1
3. **Cluster Tier**: M0 Sandbox (Free Forever)
4. **Cluster Name**: `Cluster0` (default is fine)
5. Click **"Create Cluster"**

### 2.3 Wait for Deployment
- Cluster will take 3-5 minutes to deploy
- You'll see a progress indicator
- Don't close the browser window

---

## Step 3: Create Database User (2 minutes)

### 3.1 Security Quickstart
When cluster is ready, you'll see "Security Quickstart" screen:

1. **Authentication Method**: Password (default)
2. **Username**: `lekkistays`
3. **Password**: Click **"Autogenerate Secure Password"**
4. **IMPORTANT**: Click the **"Copy"** button and save this password!
   - Paste it in a text file temporarily
   - You'll need it in Step 5
5. Click **"Create User"**

### 3.2 Alternative: Manual User Creation
If you missed the quickstart:
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `lekkistays`
5. Click **"Autogenerate Secure Password"** and copy it
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

---

## Step 4: Configure Network Access (1 minute)

### 4.1 Add IP Address
1. In the Security Quickstart, or click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (all IPs)
   - ⚠️ For production, you should restrict this to specific IPs
4. Click **"Confirm"**

### 4.2 Verify Access
- You should see `0.0.0.0/0` in the IP Access List
- Status should be "Active" (green)

---

## Step 5: Get Connection String (2 minutes)

### 5.1 Navigate to Database
1. Click **"Database"** in the left sidebar
2. You should see your cluster (Cluster0)
3. Click the **"Connect"** button

### 5.2 Choose Connection Method
1. Select **"Connect your application"**
2. Driver: **Node.js**
3. Version: **5.5 or later** (default)

### 5.3 Copy Connection String
You'll see a connection string like this:
```
mongodb+srv://lekkistays:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**IMPORTANT MODIFICATIONS:**
1. Replace `<password>` with the password you copied in Step 3
2. Add `/lekki-stays` before the `?` to specify the database name

**Final format should be:**
```
mongodb+srv://lekkistays:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/lekki-stays?retryWrites=true&w=majority
```

**Example with fake password:**
```
mongodb+srv://lekkistays:Xy9mK2pL5nQ8rT@cluster0.abc123.mongodb.net/lekki-stays?retryWrites=true&w=majority
```

---

## Step 6: Update Your .env File (1 minute)

### 6.1 Open server/.env
Open the file `server/.env` in your code editor

### 6.2 Update MONGODB_URI
Find this line:
```env
MONGODB_URI=mongodb+srv://lekkistays:<YOUR_PASSWORD_HERE>@cluster0.xxxxx.mongodb.net/lekki-stays?retryWrites=true&w=majority
```

Replace it with your actual connection string from Step 5.3:
```env
MONGODB_URI=mongodb+srv://lekkistays:Xy9mK2pL5nQ8rT@cluster0.abc123.mongodb.net/lekki-stays?retryWrites=true&w=majority
```

### 6.3 Save the File
- Save `server/.env`
- ⚠️ **NEVER commit this file to Git!** (it's already in .gitignore)

---

## Step 7: Generate Secure Admin Key (1 minute)

### 7.1 Run the Generator Script
Open your terminal and run:
```bash
cd server
node generate-admin-key.js
```

### 7.2 Copy the Generated Key
You'll see output like:
```
🔐 Generated Secure Admin Key:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Copy this key and update your server/.env file:
ADMIN_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4

⚠️  Keep this key secret and never commit it to version control!
```

### 7.3 Update .env File
Open `server/.env` and update the ADMIN_KEY line:
```env
ADMIN_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4
```

---

## Step 8: Test Connection (2 minutes)

### 8.1 Start Your Server
```bash
cd server
npm start
```

### 8.2 Check for Success
You should see:
```
🏨 Lekki Stays server running on port 3000
🌐 Visit: http://localhost:3000
📱 WhatsApp: +2349039269846
✅ Connected to MongoDB successfully
```

### 8.3 If You See Errors
**Error: "MongoServerError: bad auth"**
- Your password is incorrect
- Go back to Step 5 and verify the password
- Make sure you replaced `<password>` with actual password

**Error: "MongoNetworkError: connection timeout"**
- Network access not configured
- Go back to Step 4 and add 0.0.0.0/0

**Error: "MongoParseError: Invalid connection string"**
- Connection string format is wrong
- Make sure you added `/lekki-stays` before the `?`
- Check for extra spaces or missing characters

---

## Step 9: Verify Database (1 minute)

### 9.1 Check MongoDB Atlas Dashboard
1. Go back to MongoDB Atlas
2. Click **"Database"** in left sidebar
3. Click **"Browse Collections"** on your cluster
4. You should see the `lekki-stays` database
5. Inside it, you'll see collections:
   - `apartments`
   - `bookings`

### 9.2 Create Test Booking
1. Go to http://localhost:3000
2. Select an apartment
3. Choose dates
4. Fill booking form
5. Submit booking

### 9.3 Verify in MongoDB
1. Refresh the "Browse Collections" page
2. Click on `bookings` collection
3. You should see your test booking!

---

## ✅ Configuration Complete!

Your MongoDB is now configured and working!

---

## 📋 Final Checklist

- [ ] MongoDB Atlas account created
- [ ] Free cluster deployed (M0 tier)
- [ ] Database user created (username: lekkistays)
- [ ] Password saved securely
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Connection string updated in server/.env
- [ ] Database name added (/lekki-stays)
- [ ] Admin key generated
- [ ] Admin key updated in server/.env
- [ ] Server starts without errors
- [ ] "Connected to MongoDB" message appears
- [ ] Test booking created successfully
- [ ] Booking appears in MongoDB Atlas

---

## 🔒 Security Best Practices

### For Production:

1. **Restrict IP Access**
   - Remove 0.0.0.0/0
   - Add only your server's IP address
   - Add your Vercel deployment IPs

2. **Rotate Admin Key**
   - Generate new admin key periodically
   - Update in both .env and Vercel

3. **Database Backups**
   - Enable automated backups in MongoDB Atlas
   - Test restore procedure

4. **Monitor Access**
   - Check MongoDB Atlas logs regularly
   - Set up alerts for unusual activity

5. **Environment Variables**
   - Never commit .env to Git
   - Use Vercel environment variables for production
   - Keep separate keys for dev/staging/production

---

## 🆘 Troubleshooting

### Can't Access MongoDB Atlas
- Check your internet connection
- Try a different browser
- Clear browser cache
- Disable VPN if using one

### Forgot Database Password
1. Go to "Database Access"
2. Click "Edit" on lekkistays user
3. Click "Edit Password"
4. Generate new password
5. Update server/.env

### Cluster Not Deploying
- Wait up to 10 minutes
- Refresh the page
- Try a different region
- Contact MongoDB support

### Connection String Not Working
- Verify password is correct (no < or > symbols)
- Check database name is included (/lekki-stays)
- Ensure no extra spaces
- Verify network access is configured

---

## 📞 Need Help?

### MongoDB Atlas Support
- Documentation: https://docs.atlas.mongodb.com
- Community Forums: https://community.mongodb.com
- Support: https://support.mongodb.com

### Your Project
- Check server console for detailed error messages
- Review QUICK_START_GUIDE.md
- Check FIXES_APPLIED_SUMMARY.md

---

## 🎉 Next Steps

Now that MongoDB is configured:

1. ✅ Test the complete booking flow
2. ✅ Test WhatsApp confirmation links
3. ✅ Verify data is being saved
4. ✅ Deploy to Vercel (see QUICK_START_GUIDE.md)
5. ✅ Add Vercel environment variables
6. ✅ Test production deployment

**Your booking system is ready to go live!** 🚀
