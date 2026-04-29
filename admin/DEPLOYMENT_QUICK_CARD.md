# 🚀 Deployment Quick Card

## ⚡ 5-Minute Deployment

### 1️⃣ Enable Firebase Auth (2 min)
```
https://console.firebase.google.com/project/lekki-stays/authentication
→ Get Started → Email/Password → Enable → Save
```

### 2️⃣ Create Admin User (1 min)
```
Authentication → Users → Add User
Email: admin@lekkistays.com
Password: [your secure password]
```

### 3️⃣ Update Bank Details (1 min)
```
Edit: admin/src/js/dashboard.js (line ~280)
Update: Bank name, Account name, Account number
```

### 4️⃣ Deploy (2 min)
```bash
cd admin
firebase deploy --only hosting
# or
vercel
```

### 5️⃣ Test
```
Login → Check stats → Confirm booking → Send payment → Done! ✅
```

---

## 📋 Quick Commands

```bash
# Test locally
cd admin && npm install && npm start

# Deploy to Firebase
cd admin && firebase deploy --only hosting

# Deploy to Vercel
cd admin && vercel

# Create separate repo
cd admin && ./setup-repo.sh
```

---

## 🔗 Quick Links

- **Firebase Console**: https://console.firebase.google.com/project/lekki-stays
- **Start Here**: `admin/START_HERE.md`
- **Full Docs**: `admin/ADMIN_DASHBOARD_COMPLETE.md`
- **Checklist**: `ADMIN_CHECKLIST.md`

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login | Check Firebase Auth enabled |
| No bookings | Check Firestore security rules |
| WhatsApp fails | Check phone format (+234...) |
| Deploy fails | Run `npm install` first |

---

## ✅ What's Complete

- ✅ Code (100%)
- ✅ Docs (100%)
- ✅ Config (100%)
- ✅ Tests (100%)

## ⏳ What's Pending

- ⏳ Enable Firebase Auth
- ⏳ Create admin user
- ⏳ Update bank details
- ⏳ Deploy

---

**Time to Deploy**: 5 minutes
**Next Step**: `admin/START_HERE.md`
