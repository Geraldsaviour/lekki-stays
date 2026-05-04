# ✅ Auto-Restart Server Setup - Complete

## Problem Solved

You no longer need to manually restart the server every time you make changes!

## What Was Set Up

### Nodemon - Automatic Server Restart

**Nodemon** is a tool that automatically restarts your Node.js server when file changes are detected.

### How It Works

1. **You edit a file** (e.g., `server.js`, `routes/apartments.js`)
2. **Nodemon detects the change**
3. **Server automatically restarts**
4. **Changes are live** - No manual restart needed!

## How to Use

### Start Server with Auto-Restart

Instead of:
```bash
npm start
```

Use:
```bash
npm run dev
```

### What You'll See

```
[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
🏨 Lekki Stays server running on port 3000
🌐 Visit: http://localhost:3000
📱 WhatsApp: +2349039269846
🔥 Using Firebase Firestore
```

### When You Edit a File

```
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
🏨 Lekki Stays server running on port 3000
```

## Configuration

Created `server/nodemon.json` with smart settings:

### Files Watched (Auto-restart on changes)
- ✅ `server.js` - Main server file
- ✅ `routes/` - All route files
- ✅ `routes-supabase/` - Supabase routes
- ✅ `models/` - Database models
- ✅ `models-supabase/` - Supabase models
- ✅ `middleware/` - Middleware files
- ✅ `utils/` - Utility functions
- ✅ `utils-supabase/` - Supabase utilities
- ✅ `config/` - Configuration files
- ✅ `.env` - Environment variables

### Files Ignored (No restart)
- ❌ `node_modules/` - Dependencies
- ❌ `test*.js` - Test files
- ❌ `logs/` - Log files
- ❌ `data/*.db` - Database files

### Settings
- **Delay:** 1 second (waits 1s after change before restart)
- **Extensions:** `.js`, `.json`, `.env`
- **Environment:** Development mode

## Commands

### Start with Auto-Restart (Recommended)
```bash
cd server
npm run dev
```

### Start without Auto-Restart (Production)
```bash
cd server
npm start
```

### Manual Restart (while nodemon is running)
Type `rs` and press Enter in the terminal

### Stop Server
Press `Ctrl+C` in the terminal

## Benefits

### Before (Manual Restart)
1. Edit file
2. Stop server (Ctrl+C)
3. Start server (`npm start`)
4. Wait for startup
5. Test changes
6. Repeat for every change 😫

### After (Auto-Restart)
1. Edit file
2. Save file
3. Server restarts automatically
4. Test changes
5. Done! 🎉

## Examples

### Example 1: Edit Route
```javascript
// Edit: server/routes/apartments.js
router.get('/', async (req, res) => {
  // Make changes here
});
// Save file → Server restarts automatically!
```

### Example 2: Update Environment Variable
```env
# Edit: server/.env
PORT=3000
# Save file → Server restarts automatically!
```

### Example 3: Add New Route
```javascript
// Edit: server/server.js
app.use('/api/new-feature', newFeatureRoutes);
// Save file → Server restarts automatically!
```

## Troubleshooting

### Nodemon Not Restarting?

**Check if file is watched:**
```json
// Add to nodemon.json "watch" array
"watch": [
  "your-folder/"
]
```

**Check file extension:**
```json
// Add to nodemon.json "ext"
"ext": "js,json,env,ts"
```

### Too Many Restarts?

**Increase delay:**
```json
"delay": 2000  // Wait 2 seconds
```

**Ignore more files:**
```json
"ignore": [
  "logs/",
  "temp/"
]
```

### Server Not Starting?

**Check for errors:**
- Look at terminal output
- Check syntax errors in code
- Verify `.env` file exists

**Restart manually:**
- Press `Ctrl+C` to stop
- Run `npm run dev` again

## Production Deployment

### Important: Don't Use Nodemon in Production!

**Development (Local):**
```bash
npm run dev  # Uses nodemon
```

**Production (Vercel/Server):**
```bash
npm start  # Uses node directly
```

### Why?

- Nodemon adds overhead
- Production doesn't need auto-restart
- File watching uses resources
- Production should be stable

## Advanced Features

### Manual Restart Command

While nodemon is running, type:
```bash
rs
```
Then press Enter to manually restart.

### Verbose Mode

See detailed logs:
```json
// In nodemon.json
"verbose": true
```

### Custom Events

Run commands on restart:
```json
"events": {
  "restart": "echo Server restarted!",
  "crash": "echo Server crashed!"
}
```

## Status

✅ **ACTIVE** - Server running with nodemon
✅ **Auto-restart enabled** - Edit files and save
✅ **Configuration optimized** - Smart file watching

## Summary

**Before:**
- Manual restart required for every change
- Tedious development workflow
- Easy to forget to restart

**After:**
- Automatic restart on file changes
- Smooth development workflow
- Focus on coding, not restarting

**Command to Use:**
```bash
cd server
npm run dev
```

---

**You're all set!** Edit any server file, save it, and watch the magic happen! 🚀

## Quick Reference

| Action | Command |
|--------|---------|
| Start with auto-restart | `npm run dev` |
| Start without auto-restart | `npm start` |
| Manual restart | Type `rs` + Enter |
| Stop server | `Ctrl+C` |
| View config | `cat nodemon.json` |

**Current Status:** Server is running with nodemon. Make changes and they'll apply automatically! 🎉
