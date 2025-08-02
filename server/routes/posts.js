const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostsByUser, deletePost } = require('../controllers/postController');
const auth = require('../middleware/auth');

router.get('/', getAllPosts);

// @route   POST /api/posts
router.post('/', auth, createPost);

// @route   GET /api/posts/user/:userId

router.get('/user/:userId', getPostsByUser);

// @route   DELETE /api/posts/:postId

router.delete('/:postId', auth, deletePost);

module.exports = router;