const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

  content: {
    type: String,
    required: [true, 'Post content is required'],
    trim: true,
    maxlength: [1000, 'Post content cannot exceed 1000 characters']
    
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post author is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1 });

module.exports = mongoose.model('Post', postSchema);