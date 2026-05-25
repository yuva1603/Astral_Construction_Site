const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error(`Get blogs error: ${error.message}`);
    res.status(500).json({ message: 'Server error fetching blog posts' });
  }
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  try {
    const { title, summary, content, image, category, author } = req.body;

    if (!title || !summary || !content) {
      return res.status(400).json({ message: 'Please provide title, summary and content' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const blog = new Blog({
      title,
      slug,
      summary,
      content,
      image: image || '',
      category: category || 'General',
      author: author || 'Voora Admin'
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error(`Create blog error: ${error.message}`);
    res.status(400).json({ message: error.message || 'Server error creating blog post' });
  }
});

module.exports = router;
