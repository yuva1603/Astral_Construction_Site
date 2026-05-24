const Contact = require('../models/Contact');

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, projectType, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !projectType || !message) {
      return res.status(400).json({ message: 'Please include all fields' });
    }

    // Create contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      projectType,
      message,
    });

    if (contact) {
      res.status(201).json({
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        message: 'Form submitted successfully',
      });
    } else {
      res.status(400).json({ message: 'Invalid contact data' });
    }
  } catch (error) {
    console.error(`Error in submitContactForm: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitContactForm,
};
