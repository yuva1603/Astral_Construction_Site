const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, default: '' },
  projectInterested: { type: String, required: true },
  message: { type: String, default: '' },
  type: { type: String, enum: ['brochure', 'general', 'nri', 'career'], default: 'general' },
  status: { type: String, enum: ['new', 'contacted', 'converted'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
