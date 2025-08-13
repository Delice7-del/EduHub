require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/courses');
const instructorsRoutes = require('./routes/instructors');
const testimonialsRoutes = require('./routes/testimonials');
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/instructors', instructorsRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'EduHub backend is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      courses: '/api/courses',
      instructors: '/api/instructors',
      testimonials: '/api/testimonials',
      contact: '/api/contact',
      newsletter: '/api/newsletter'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 EduHub Backend API is ready!`);
  console.log(`🌐 http://localhost:${PORT}`);
}); 