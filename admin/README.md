# 🔐 Lekki Stays Admin Dashboard

Secure admin dashboard for managing bookings, separate from the main booking website.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd admin
npm install
```

### 2. Configure Environment

The `.env` file is already configured to use the same MongoDB as your main app.

**Important**: Update these values for production:
- `JWT_SECRET` - Generate a long random string
- `SESSION_SECRET` - Generate a long random string

### 3. Create First Admin User

```bash
npm run setup
```

Follow the prompts to create your admin account:
- Admin Name: Your Name
- Admin Email: admin@lekkistays.com
- Admin Password: (min 8 characters)

### 4. Start the Server

```bash
npm start
```

The admin dashboard will be available at: **http://localhost:3001**

---

## 📋 Features

### ✅ Authentication
- Secure login with email/password
- JWT token-based sessions
- Account lockout after failed attempts
- HTTP-only cookies

### ✅ Dashboard
- Overview statistics (pending, confirmed, paid, completed)
- Real-time booking list
- Filter by status
- Search by booking ID, guest name, email, phone
- Pagination

### ✅ Booking Management
- **Confirm bookings** - Approve pending bookings
- **Decline bookings** - Reject bookings with optional reason
- **Send payment details** - WhatsApp message with bank details
- **Mark as paid** - Confirm payment received
- **Check-in/Check-out** - Update booking status
- **View booking details** - Complete booking information

### ✅ Security
- Rate limiting on login (5 attempts per 15 minutes)
- Account lockout after 5 failed attempts (30 minutes)
- Audit logging for all admin actions
- CORS protection
- Input validation and sanitization

---

## 🎯 Usage

### Login
1. Go to http://localhost:3001
2. Enter your admin email and password
3. Click "Login"

### Manage Bookings

#### Confirm a Booking
1. Find the pending booking
2. Click "Confirm" button
3. Choose whether to send payment details
4. Click "Confirm & Send Payment"
5. If selected, WhatsApp will open with payment message

#### Decline a Booking
1. Find the pending booking
2. Click "Decline" button
3. Optionally add a reason
4. Click "Decline Booking"

#### Send Payment Details
1. Find a confirmed booking
2. Click "Send Payment" button
3. WhatsApp opens with pre-filled payment message
4. Send to guest

#### Mark as Paid
1. Find a confirmed booking
2. Click "Mark as Paid" button
3. Confirm the action
4. Status updates to "Paid"

#### Check In/Out
1. Find a paid booking
2. Click "Check In" when guest arrives
3. Click "Check Out" when guest leaves

---

## 🔒 Security Best Practices

### For Production:

1. **Generate Secure Secrets**
   ```bash
   # Generate JWT secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Generate session secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   
   Update `.env` with these values.

2. **Use HTTPS**
   - Deploy to Vercel (automatic HTTPS)
   - Or use a reverse proxy with SSL certificate

3. **Restrict CORS**
   - Update `CORS_ORIGIN` in `.env` to your main website URL

4. **Strong Passwords**
   - Use passwords with at least 12 characters
   - Include uppercase, lowercase, numbers, and symbols

5. **Regular Backups**
   - MongoDB Atlas provides automatic backups
   - Export audit logs regularly

---

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/login      - Login
POST   /api/auth/logout     - Logout
GET    /api/auth/me         - Get current admin
```

### Bookings
```
GET    /api/bookings/list   - List bookings (with filters)
GET    /api/bookings/stats  - Get statistics
GET    /api/bookings/:id    - Get booking details
PUT    /api/bookings/:id/status - Update booking status
POST   /api/bookings/:id/send-payment - Generate payment WhatsApp link
```

---

## 🗄️ Database Collections

### admin_users
Stores admin user accounts with hashed passwords.

### admin_audit_log
Logs all admin actions for security and compliance.

### bookings
Shared with main app - stores all booking data.

---

## 🚀 Deployment

### Deploy to Vercel

1. **Create new Vercel project**
   ```bash
   vercel
   ```

2. **Add environment variables** in Vercel dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_generated_jwt_secret
   SESSION_SECRET=your_generated_session_secret
   HOST_WHATSAPP_NUMBER=+2349039269846
   BANK_NAME=GTBank
   BANK_ACCOUNT_NUMBER=9039269846
   BANK_ACCOUNT_NAME=Lekki Stays Ltd
   ADMIN_EMAIL=admin@lekkistays.com
   CORS_ORIGIN=https://your-main-website.vercel.app
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Access your admin dashboard**
   ```
   https://your-admin-dashboard.vercel.app
   ```

---

## 🔧 Troubleshooting

### Can't Login
- Check MongoDB connection
- Verify admin user exists (run `npm run setup`)
- Check browser console for errors
- Clear cookies and try again

### Bookings Not Loading
- Verify MongoDB connection
- Check that bookings collection exists
- Check browser console for errors
- Verify JWT token is valid

### WhatsApp Links Not Working
- Check `HOST_WHATSAPP_NUMBER` in `.env`
- Verify phone number format (+234...)
- Check guest phone number format in database

### Account Locked
- Wait 30 minutes for automatic unlock
- Or manually update in MongoDB:
  ```javascript
  db.admin_users.updateOne(
    { email: "admin@lekkistays.com" },
    { $set: { loginAttempts: 0, lockUntil: null } }
  )
  ```

---

## 📝 Development

### Run in Development Mode
```bash
npm run dev
```

Uses nodemon for auto-restart on file changes.

### Add New Admin User
```bash
npm run setup
```

### Check Logs
All admin actions are logged to `admin_audit_log` collection in MongoDB.

---

## 🎨 Customization

### Change Colors
Edit `admin/src/css/dashboard.css`:
```css
:root {
    --primary: #C9A96E;  /* Gold */
    --success: #4CAF50;  /* Green */
    --danger: #E53935;   /* Red */
    /* ... */
}
```

### Add New Status
1. Update `validStatuses` in `admin/api/bookings/routes.js`
2. Add CSS class in `admin/src/css/dashboard.css`
3. Update status display in `admin/src/js/dashboard.js`

---

## 📞 Support

For issues or questions:
1. Check this README
2. Check browser console for errors
3. Check server logs
4. Review MongoDB data

---

## ✅ Checklist

Before going live:
- [ ] Admin user created
- [ ] JWT_SECRET changed
- [ ] SESSION_SECRET changed
- [ ] Strong admin password set
- [ ] MongoDB connection working
- [ ] CORS_ORIGIN configured
- [ ] Deployed to Vercel
- [ ] Environment variables set in Vercel
- [ ] HTTPS enabled
- [ ] Tested login
- [ ] Tested booking confirmation
- [ ] Tested WhatsApp links
- [ ] Audit logging verified

---

**Your admin dashboard is ready! 🎉**

Login at: http://localhost:3001
