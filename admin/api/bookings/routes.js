const express = require('express');
const router = express.Router();
const { getDb } = require('../../db');
const { authenticateToken } = require('../auth/routes');

// All routes require authentication
router.use(authenticateToken);

// GET /api/bookings/list
router.get('/list', async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const db = getDb();
    const bookingsCollection = db.collection('bookings');

    // Build query
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { id: { $regex: search, $options: 'i' } },
        { guestName: { $regex: search, $options: 'i' } },
        { guestEmail: { $regex: search, $options: 'i' } },
        { guestPhone: { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count
    const total = await bookingsCollection.countDocuments(query);

    // Get bookings with pagination
    const bookings = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .toArray();

    res.json({
      success: true,
      bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('List bookings error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
});

// GET /api/bookings/stats
router.get('/stats', async (req, res) => {
  try {
    const db = getDb();
    const bookingsCollection = db.collection('bookings');

    const stats = await bookingsCollection.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    const statsObj = {
      pending: 0,
      confirmed: 0,
      paid: 0,
      'checked-in': 0,
      'checked-out': 0,
      completed: 0,
      declined: 0,
      cancelled: 0
    };

    stats.forEach(stat => {
      statsObj[stat._id] = stat.count;
    });

    res.json({ success: true, stats: statsObj });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

// GET /api/bookings/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    
    const booking = await db.collection('bookings').findOne({ id });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Get apartment details
    const apartment = await db.collection('apartments').findOne({ id: booking.apartmentId });

    res.json({ success: true, booking, apartment });

  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch booking' });
  }
});

// PUT /api/bookings/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const validStatuses = ['pending', 'confirmed', 'paid', 'checked-in', 'checked-out', 'completed', 'declined', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const db = getDb();
    const bookingsCollection = db.collection('bookings');

    const booking = await bookingsCollection.findOne({ id });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Update booking
    const updateData = {
      status,
      updatedAt: new Date()
    };

    // Add status-specific fields
    if (status === 'confirmed') {
      updateData.confirmedBy = req.admin.id;
      updateData.confirmedAt = new Date();
    } else if (status === 'paid') {
      updateData.paymentConfirmedBy = req.admin.id;
      updateData.paymentConfirmedAt = new Date();
    }

    // Add to status history
    const statusHistoryEntry = {
      status,
      changedBy: req.admin.id,
      changedAt: new Date(),
      note: note || ''
    };

    await bookingsCollection.updateOne(
      { id },
      { 
        $set: updateData,
        $push: { statusHistory: statusHistoryEntry }
      }
    );

    // Log audit
    await db.collection('admin_audit_log').insertOne({
      adminId: req.admin.id,
      action: `UPDATE_STATUS_${status.toUpperCase()}`,
      bookingId: id,
      details: { oldStatus: booking.status, newStatus: status, note },
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      timestamp: new Date()
    });

    res.json({ success: true, message: 'Booking status updated successfully' });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, error: 'Failed to update booking status' });
  }
});

// POST /api/bookings/:id/send-payment
router.post('/:id/send-payment', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();

    const booking = await db.collection('bookings').findOne({ id });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    const apartment = await db.collection('apartments').findOne({ id: booking.apartmentId });

    // Generate WhatsApp message
    const message = `🎉 Booking Confirmed — Lekki Stays

Hi ${booking.guestName}! Your booking has been confirmed.

📋 Booking Details:
Booking ID: #${booking.id}
Apartment: ${apartment ? apartment.name : 'Property ' + booking.apartmentId}
Check-in: ${new Date(booking.checkIn).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} (2:00 PM)
Check-out: ${new Date(booking.checkOut).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} (11:00 AM)
Guests: ${booking.numGuests}

💰 Payment Required: ₦${booking.totalPrice.toLocaleString('en-NG')}
Please make a bank transfer to:

Bank: ${process.env.BANK_NAME}
Account Number: ${process.env.BANK_ACCOUNT_NUMBER}
Account Name: ${process.env.BANK_ACCOUNT_NAME}
Amount: ₦${booking.totalPrice.toLocaleString('en-NG')}
Reference: LEKKI-#${booking.id}

📸 After payment, send your receipt screenshot as a reply to this WhatsApp message to confirm your reservation.

⏰ Payment must be received within 24 hours or your reservation may be released.

We look forward to hosting you! 🏠
Lekki Stays Team`;

    // Format phone number for WhatsApp
    const phone = booking.guestPhone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Log audit
    await db.collection('admin_audit_log').insertOne({
      adminId: req.admin.id,
      action: 'SEND_PAYMENT_DETAILS',
      bookingId: id,
      details: { guestPhone: booking.guestPhone },
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      timestamp: new Date()
    });

    res.json({ success: true, whatsappUrl });

  } catch (error) {
    console.error('Send payment error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate payment details' });
  }
});

module.exports = router;
