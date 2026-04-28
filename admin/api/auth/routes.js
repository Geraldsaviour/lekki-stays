const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { getDb } = require('../../db');

// Rate limit for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.LOGIN_RATE_LIMIT_MAX) || 5,
  message: { success: false, error: 'Too many login attempts. Please try again later.' },
  skipSuccessfulRequests: true
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access denied. Please login.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;
    next();
  } catch (error) {
    res.status(403).json({ success: false, error: 'Invalid or expired token.' });
  }
}

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required' 
      });
    }

    // Connect to database
    const db = getDb();
    const adminsCollection = db.collection('admin_users');

    // Find admin user
    const admin = await adminsCollection.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    // Check if account is locked
    if (admin.lockUntil && admin.lockUntil > Date.now()) {
      const minutesLeft = Math.ceil((admin.lockUntil - Date.now()) / 60000);
      return res.status(423).json({ 
        success: false, 
        error: `Account locked. Try again in ${minutesLeft} minutes.` 
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, admin.passwordHash);

    if (!validPassword) {
      // Increment login attempts
      const loginAttempts = (admin.loginAttempts || 0) + 1;
      const maxAttempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5;
      
      const updateData = {
        loginAttempts,
        updatedAt: new Date()
      };

      // Lock account if max attempts reached
      if (loginAttempts >= maxAttempts) {
        const lockTime = parseInt(process.env.LOCK_TIME) || 1800000; // 30 minutes
        updateData.lockUntil = Date.now() + lockTime;
      }

      await adminsCollection.updateOne(
        { _id: admin._id },
        { $set: updateData }
      );

      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password',
        attemptsLeft: maxAttempts - loginAttempts
      });
    }

    // Check if email is verified
    if (!admin.isEmailVerified) {
      return res.status(403).json({ 
        success: false, 
        error: 'Please verify your email before logging in' 
      });
    }

    // Reset login attempts on successful login
    await adminsCollection.updateOne(
      { _id: admin._id },
      { 
        $set: { 
          loginAttempts: 0,
          lockUntil: null,
          lastLogin: new Date(),
          updatedAt: new Date()
        }
      }
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Set HTTP-only cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Log audit
    await db.collection('admin_audit_log').insertOne({
      adminId: admin._id,
      action: 'LOGIN',
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      timestamp: new Date()
    });

    res.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Login failed. Please try again.' 
    });
  }
});

// POST /api/auth/logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Log audit
    const db = getDb();
    await db.collection('admin_audit_log').insertOne({
      adminId: req.admin.id,
      action: 'LOGOUT',
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      timestamp: new Date()
    });

    // Clear cookie
    res.clearCookie('adminToken');
    
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, error: 'Logout failed' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const db = getDb();
    const admin = await db.collection('admin_users').findOne(
      { _id: require('mongodb').ObjectId.createFromHexString(req.admin.id) },
      { projection: { passwordHash: 0, emailVerificationToken: 0, resetPasswordToken: 0 } }
    );

    if (!admin) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }

    res.json({ success: true, admin });
  } catch (error) {
    console.error('Get admin error:', error);
    res.status(500).json({ success: false, error: 'Failed to get admin info' });
  }
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;
