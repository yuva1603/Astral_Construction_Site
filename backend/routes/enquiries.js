const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const { protect } = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer');

// @desc    Submit new enquiry
// @route   POST /api/enquiries
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, city, projectInterested, message, type } = req.body;

    if (!name || !phone || !email || !projectInterested) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const enquiry = new Enquiry({
      name,
      phone,
      email,
      city: city || '',
      projectInterested,
      message: message || '',
      type: type || 'general'
    });

    const savedEnquiry = await enquiry.save();

    // Nodemailer flow
    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        const mailOptions = {
          from: `"Voora Real Estate" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
          subject: `New Lead - ${projectInterested} (${type || 'general'})`,
          html: `
            <h3>New Customer Enquiry Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>City:</strong> ${city || 'Not provided'}</p>
            <p><strong>Project of Interest:</strong> ${projectInterested}</p>
            <p><strong>Enquiry Type:</strong> ${type || 'general'}</p>
            <p><strong>Message:</strong> ${message || 'No message'}</p>
            <hr />
            <p>This is an automated notification from Voora Real Estate Server.</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent successfully for ${email}`);
      } else {
        console.log('Skipping Nodemailer email: SMTP settings not configured in .env');
      }
    } catch (emailError) {
      // Log email error but do NOT crash the API request, so that user gets a 201 response since enquiry was saved!
      console.error(`Nodemailer error: ${emailError.message}`);
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: savedEnquiry
    });
  } catch (error) {
    console.error(`Enquiry submission error: ${error.message}`);
    res.status(500).json({ message: 'Server error during enquiry submission' });
  }
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    console.error(`Get enquiries error: ${error.message}`);
    res.status(500).json({ message: 'Server error fetching enquiries' });
  }
});

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['new', 'contacted', 'converted'].includes(status)) {
      return res.status(400).json({ message: 'Please provide a valid status' });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    enquiry.status = status;
    const updatedEnquiry = await enquiry.save();
    res.json(updatedEnquiry);
  } catch (error) {
    console.error(`Update enquiry status error: ${error.message}`);
    res.status(500).json({ message: 'Server error updating enquiry status' });
  }
});

module.exports = router;
