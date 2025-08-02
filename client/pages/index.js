import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { postsAPI, authAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [postsResponse, userResponse] = await Promise.all([
        postsAPI.getAllPosts(),
        authAPI.getCurrentUser()
      ]);
      
      setPosts(postsResponse.posts);
      setPagination(postsResponse.pagination);
      setCurrentUser(userResponse.user);
    } catch (error) {

      console.error('Failed to fetch data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) {

      toast.error('Please enter some content');
      return;
    }

    setIsCreatingPost(true);
    try {
      const response = await postsAPI.createPost({
        content: newPostContent.trim()
      });
      
      setPosts(prev => [response.post, ...prev]);
      setNewPostContent('');

      toast.success('Post created successfully');
    } catch (error) {
      console.error('Create post error:', error);
    } finally {
      setIsCreatingPost(false);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId));
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>LinkedIn Clone - Home</title>
        </Head>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-2xl mx-auto pt-8 px-4">
            {/* Loading skeleton */}
            <div className="card p-6 mb-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card p-6 mb-4">
                <div className="animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>LinkedIn Clone - Home</title>
        <meta name="description" content="Connect with professionals and share your thoughts" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto pt-8 px-4">

          {/* Create Post Form */}
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              What's on your mind, {currentUser?.name}?
            </h2>
            
            <form onSubmit={handleCreatePost}>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                className="form-textarea mb-4"
                disabled={isCreatingPost}

              />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {newPostContent.length}/1000 characters
                </span>
                
                <button
                  type="submit"
                  disabled={isCreatingPost || !newPostContent.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingPost ? (
                    <div className="flex items-center">
                      <div className="loading-spinner mr-2"></div>
                      Posting...
                    </div>
                  ) : (
                    'Post'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Posts Feed */}
          <div>
            {posts.length === 0 ? (
              <div className="card p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>

                <p className="text-gray-500">Be the first to share something with the community!</p>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  currentUser={currentUser}
                  onDelete={handleDeletePost}
                />
              ))
            )}
          </div>

          {/* Load More Button */}
          {pagination?.hasNextPage && (
            <div className="text-center py-8">
              <button className="btn-outline">
                Load More Posts
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}