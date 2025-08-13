const express = require('express');
const Newsletter = require('../models/newsletter');
const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
    
    // Check if already subscribed
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      if (existingSubscription.isSubscribed) {
        return res.status(400).json({ message: 'You are already subscribed to our newsletter' });
      } else {
        // Reactivate subscription
        existingSubscription.isSubscribed = true;
        existingSubscription.subscriptionDate = new Date();
        await existingSubscription.save();
        return res.json({ message: 'Welcome back! Your subscription has been reactivated.' });
      }
    }
    
    // Create new subscription
    const newsletter = new Newsletter({
      email,
      isSubscribed: true,
      subscriptionDate: new Date()
    });
    
    await newsletter.save();
    
    res.status(201).json({ 
      message: 'Successfully subscribed to our newsletter! Welcome to EduHub.' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    const subscription = await Newsletter.findOne({ email });
    
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    
    if (!subscription.isSubscribed) {
      return res.status(400).json({ message: 'You are already unsubscribed' });
    }
    
    subscription.isSubscribed = false;
    await subscription.save();
    
    res.json({ message: 'Successfully unsubscribed from our newsletter. We\'ll miss you!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all subscribers (admin only - would need auth middleware)
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isSubscribed: true })
      .sort({ subscriptionDate: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get subscription status
router.get('/status/:email', async (req, res) => {
  try {
    const subscription = await Newsletter.findOne({ email: req.params.email });
    
    if (!subscription) {
      return res.json({ subscribed: false, message: 'Not subscribed' });
    }
    
    res.json({ 
      subscribed: subscription.isSubscribed,
      subscriptionDate: subscription.subscriptionDate,
      message: subscription.isSubscribed ? 'Subscribed' : 'Unsubscribed'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete subscription (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const subscription = await Newsletter.findByIdAndDelete(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 