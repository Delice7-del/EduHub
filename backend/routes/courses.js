const express = require('express');
const Course = require('../models/course');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'name specialization profilePicture')
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name specialization profilePicture bio socialLinks')
      .populate('enrolledStudents', 'name profilePicture');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create course (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, duration, price, instructorId, image, videoUrl } = req.body;
    
    if (!title || !description || !category || !duration || !price || !instructorId) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
    
    const course = new Course({
      title,
      description,
      category,
      duration,
      price,
      instructor: instructorId,
      image: image || '',
      videoUrl: videoUrl || ''
    });
    
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update course (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete course (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in course (protected route)
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    if (course.enrolledStudents.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    course.enrolledStudents.push(req.user.userId);
    await course.save();
    
    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Rate course (protected route)
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Update rating
    const newTotalRating = course.rating * course.totalRatings + rating;
    course.totalRatings += 1;
    course.rating = newTotalRating / course.totalRatings;
    
    await course.save();
    
    res.json({ message: 'Rating submitted successfully', newRating: course.rating });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 