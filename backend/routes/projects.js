const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all projects with filters
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, status, featured, city } = req.query;
    const filter = {};

    if (type && type !== 'all') {
      filter.type = type;
    }
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (featured === 'true') {
      filter.featured = true;
    }
    if (city) {
      filter.city = city;
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error(`Get projects error: ${error.message}`);
    res.status(500).json({ message: 'Server error fetching projects' });
  }
});

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error(`Get single project error: ${error.message}`);
    res.status(500).json({ message: 'Server error fetching project details' });
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  try {
    const projectData = req.body;
    
    // Automatically generate slug if not provided
    if (!projectData.slug && projectData.name) {
      projectData.slug = projectData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const project = new Project(projectData);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error(`Create project error: ${error.message}`);
    res.status(400).json({ message: error.message || 'Server error creating project' });
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updatedProject);
  } catch (error) {
    console.error(`Update project error: ${error.message}`);
    res.status(400).json({ message: error.message || 'Server error updating project' });
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(`Delete project error: ${error.message}`);
    res.status(500).json({ message: 'Server error deleting project' });
  }
});

module.exports = router;
