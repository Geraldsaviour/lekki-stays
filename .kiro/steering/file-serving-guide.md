# File Serving & Static Asset Guide

## Quick Reference

### Problem: Files Not Loading
**Symptoms**: CSS/JS files return 404, pages load unstyled, features don't work

**Solution Checklist**:
1. ✅ File exists in root directory
2. ✅ File exists in server directory
3. ✅ Server route checks both locations
4. ✅ HTML references correct file path
5. ✅ Content-Type header is correct

### File Location Strategy

```
Root Directory (Local Dev)
├── listing-detail.css
├── listing-detail.js
├── api-client.js
└── [other static files]

Server Directory (Vercel)
├── listing-detail.css
├── listing-detail.js
├── api-client.js
└── [other static files]
```

### Server Route Template

```javascript
app.get('/filename.ext', (req, res) => {
  res.setHeader('Content-Type', 'type/subtype');
  const serverPath = path.join(__dirname, 'filename.ext');
  const rootPath = path.join(__dirname, '..', 'filename.ext');
  
  if (fs.existsSync(serverPath)) {
    res.sendFile(serverPath);
  } else if (fs.existsSync(rootPath)) {
    res.sendFile(rootPath);
  } else {
    res.status(404).send('File not found');
  }
});
```

### Content-Type Reference

| File Type | Content-Type |
|-----------|--------------|
| .css | text/css |
| .js | application/javascript |
| .html | text/html |
| .json | application/json |
| .png | image/png |
| .jpg | image/jpeg |
| .svg | image/svg+xml |

### Adding New Static Files

1. **Create file** in root directory
2. **Copy to** server directory
3. **Add route** to `server/server.js`
4. **Test locally** at `http://localhost:3000/filename.ext`
5. **Verify** no 404 errors in browser console

### Debugging Steps

```bash
# Check if file exists
ls -la listing-detail.css
ls -la server/listing-detail.css

# Test server route
curl -I http://localhost:3000/listing-detail.css

# Check browser console
# Open DevTools → Console tab
# Look for 404 errors or failed requests

# Check server logs
# Look for "Serving listing-detail.css" messages
```

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| 404 error | File missing | Copy to both directories |
| Unstyled page | CSS not loading | Check Content-Type header |
| Features broken | JS not loading | Verify script order in HTML |
| Wrong styling | CSS cached | Hard refresh (Ctrl+Shift+R) |
| API errors | Wrong path | Check relative vs absolute paths |

### HTML File References

```html
<!-- Correct (relative path) -->
<link rel="stylesheet" href="listing-detail.css">
<script src="api-client.js"></script>

<!-- Incorrect (absolute path) -->
<link rel="stylesheet" href="/listing-detail.css">
<script src="/api-client.js"></script>
```

### Sync Files Command

```bash
# Copy all static files to server directory
cp listing-detail.css server/
cp listing-detail.js server/
cp api-client.js server/
cp styles.css server/
cp booking.css server/
cp booking.js server/
cp search-results.css server/
cp search-results.js server/
cp script.js server/
```

### Verification Checklist

Before committing changes:
- [ ] File exists in root directory
- [ ] File exists in server directory
- [ ] Server route added to `server/server.js`
- [ ] Content-Type header is correct
- [ ] HTML references correct file path
- [ ] No 404 errors in browser console
- [ ] Styling loads correctly
- [ ] Features work as expected
- [ ] Mobile responsive design works
- [ ] Tested on localhost:3000

### Key Files

- **Server config**: `server/server.js`
- **HTML pages**: `listing-*.html`, `index.html`, `booking.html`
- **Static files**: `*.css`, `*.js` in root and server directories
- **API client**: `api-client.js`

### Remember

1. **Always maintain dual copies** (root + server)
2. **Always check both locations** in server routes
3. **Always set correct Content-Type** headers
4. **Always test locally** before deploying
5. **Always check browser console** for errors
