import { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { postsAPI } from '../services/api';
import toast from 'react-hot-toast';

const PostCard = ({ post, currentUser, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await postsAPI.deletePost(post._id);
      toast.success('Post deleted successfully');
      if (onDelete) {
        onDelete(post._id);
      }
    } catch (error) {
      console.error('Delete post error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const canDelete = currentUser && currentUser.id === post.author._id;

  return (
    <div className="card p-6 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-12 h-12 bg-linkedin-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {post.author.name.charAt(0).toUpperCase()}
          </div>
          
          {/* Info */}
          <div>
            <Link 
              href={`/profile/${post.author._id}`}
              className="font-semibold text-gray-900 hover:text-linkedin-600 transition-colors"
            >
              {post.author.name}
            </Link>
            <p className="text-sm text-gray-500">{post.author.email}</p>
            <p className="text-xs text-gray-400">
              {moment(post.createdAt).fromNow()}
            </p>
          </div>
        </div>

        {/* Delete */}
        {canDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
            title="Delete post"
          >
            {isDeleting ? (
              <div className="loading-spinner w-4 h-4"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/*  Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
        </div>
        
        {/*  future features */}
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-linkedin-600 transition-colors px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs">Like</span>
          </button>
          
          <button className="flex items-center space-x-1 text-gray-500 hover:text-linkedin-600 transition-colors px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs">Comment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;