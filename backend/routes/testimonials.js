const express = require('express');
const Testimonial = require('../models/testimonial');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all approved testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .populate('course', 'title category')
      .sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single testimonial
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
      .populate('course', 'title category');
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create testimonial (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { studentName, courseId, content, rating, studentImage } = req.body;
    
    if (!studentName || !courseId || !content || !rating) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const testimonial = new Testimonial({
      studentName,
      course: courseId,
      content,
      rating,
      studentImage: studentImage || '',
      isApproved: false // New testimonials need approval
    });
    
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update testimonial (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete testimonial (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve testimonial (admin only)
router.patch('/:id/approve', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial approved successfully', testimonial });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get testimonials by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ 
      course: req.params.courseId, 
      isApproved: true 
    }).sort({ createdAt: -1 });
    
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 