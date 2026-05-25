const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'VooraSuperSecretSecret123!',
        { expiresIn: '30d' }
      );

      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @desc    Admin refresh token or verification
// @route   POST /api/auth/refresh
// @access  Public
router.post('/refresh', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'Token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'VooraSuperSecretSecret123!');
    const user = await User.findById(decoded.id).select('-password');

    if (user) {
      res.json({ valid: true, user });
    } else {
      res.status(401).json({ valid: false, message: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Token expired or invalid' });
  }
});

module.exports = router;
