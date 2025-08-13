const express = require('express');
const Instructor = require('../models/instructor');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all instructors
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find()
      .populate('courses', 'title category rating')
      .sort({ rating: -1 });
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single instructor
router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id)
      .populate('courses', 'title description category duration price rating image');
    
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create instructor (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, specialization, bio, experience, profilePicture, socialLinks } = req.body;
    
    if (!name || !email || !specialization || !bio || !experience) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
    
    const instructor = new Instructor({
      name,
      email,
      specialization,
      bio,
      experience,
      profilePicture: profilePicture || '',
      socialLinks: socialLinks || {}
    });
    
    await instructor.save();
    res.status(201).json(instructor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update instructor (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete instructor (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    
    res.json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get instructor courses
router.get('/:id/courses', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id)
      .populate('courses', 'title description category duration price rating image');
    
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    
    res.json(instructor.courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 