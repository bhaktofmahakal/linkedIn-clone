const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   GET /api/users
// @desc    Get all users (with search)
// @access  Public
router.get('/', getAllUsers);

// @route   GET /api/users/:userId
// @desc    Get user profile
// @access  Public
router.get('/:userId', getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateUserProfile);

module.exports = router;