# 🚀 Development Guide

## Quick Start

### Start Development Server (Auto-Restart)

```bash
cd server
npm run dev
```

This starts the server with **nodemon** which automatically restarts when you edit files.

### What You'll See

```
[nodemon] starting `node server.js`
🏨 Lekki Stays server running on port 3000
🌐 Visit: http://localhost:3000
```

### Make Changes

1. Edit any file in `server/`
2. Save the file
3. Server restarts automatically! ✨

No need to manually restart anymore!

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with auto-restart (development) |
| `npm start` | Start without auto-restart (production) |
| Type `rs` + Enter | Manual restart (while running) |
| `Ctrl+C` | Stop server |

## Files That Trigger Auto-Restart

- ✅ `server.js`
- ✅ `routes/` folder
- ✅ `models/` folder
- ✅ `middleware/` folder
- ✅ `utils/` folder
- ✅ `config/` folder
- ✅ `.env` file

## Files That Don't Trigger Restart

- ❌ `node_modules/`
- ❌ Test files
- ❌ Database files
- ❌ Log files

## Documentation

For more details, see: [`docs/AUTO_RESTART_SETUP.md`](docs/AUTO_RESTART_SETUP.md)

---

**Happy coding! 🎉**
