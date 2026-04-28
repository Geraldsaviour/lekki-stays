require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./db-simple');
const { performanceMonitor, getMetrics, getHealthStatus } = require('./middleware/performance');

const app = express();
const PORT = process.env.PORT || 3000;

// Performance monitoring middleware (should be first)
app.use(performanceMonitor);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from server directory (where they actually exist in Vercel)
app.use(express.static(__dirname));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.get('Accept')}`);
  next();
});

// Explicit routes for main static files
// API Routes
app.use('/api/apartments', require('./routes/apartments'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/payments', require('./routes/payments'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Debug endpoint to check static files
app.get('/api/debug/files', (req, res) => {
  const staticFiles = [
    'styles.css',
    'listing-detail.css', 
    'booking.css',
    'search-results.css',
    'script.js',
    'listing-detail.js',
    'booking.js',
    'search-results.js',
    'api-client.js',
    'test.txt'
  ];
  
  // Check in server directory where files should now be
  const fileStatus = staticFiles.map(file => ({
    file,
    serverPath: path.join(__dirname, file),
    exists: fs.existsSync(path.join(__dirname, file))
  }));
  
  // Also list all files in server directory
  let allFiles = [];
  try {
    allFiles = fs.readdirSync(__dirname);
  } catch (e) {
    allFiles = ['Error reading directory: ' + e.message];
  }
  
  res.json({
    staticFiles: fileStatus,
    serverDir: __dirname,
    allFilesInServerDir: allFiles,
    message: "Files should now be in server directory"
  });
});

// Test endpoint to serve test.txt
app.get('/test.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(path.join(__dirname, 'test.txt'));
});

// Performance metrics endpoint
app.get('/api/metrics', (req, res) => {
  const metrics = getMetrics();
  res.json({
    success: true,
    metrics: metrics,
    timestamp: new Date().toISOString()
  });
});

// Performance health endpoint
app.get('/api/health/performance', (req, res) => {
  const health = getHealthStatus();
  const statusCode = health.status === 'healthy' ? 200 : 
                    health.status === 'degraded' ? 200 : 503;
  
  res.status(statusCode).json({
    success: true,
    health: health,
    timestamp: new Date().toISOString()
  });
});

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Serve individual listing pages
app.get('/listing-:id.html', (req, res) => {
  const listingId = req.params.id;
  const filePath = path.join(__dirname, '..', `listing-${listingId}.html`);
  
  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Listing not found' });
  }
});

// Serve other HTML pages
app.get('/booking.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'booking.html'));
});

app.get('/search-results.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'search-results.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Initialize database and start server
db.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🏨 Lekki Stays server running on port ${PORT}`);
      console.log(`🌐 Visit: http://localhost:${PORT}`);
      console.log(`📱 WhatsApp: ${process.env.HOST_WHATSAPP_NUMBER}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });

module.exports = app;