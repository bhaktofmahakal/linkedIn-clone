import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import PostCard from '../../components/PostCard';
import { postsAPI, authAPI } from '../../services/api';
import toast from 'react-hot-toast';
import moment from 'moment';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  
  const [profileUser, setProfileUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    if (id) {
      fetchProfileData();
    }
  }, [id]);

  const fetchProfileData = async () => {
    try {
      const [postsResponse, currentUserResponse] = await Promise.all([
        postsAPI.getPostsByUser(id),
        authAPI.getCurrentUser()
      ]);
      
      setProfileUser(postsResponse.user);
      setPosts(postsResponse.posts);
      setPagination(postsResponse.pagination);
      setCurrentUser(currentUserResponse.user);
    } catch (error) {

      console.error('Failed to fetch profile data:', error);
      toast.error('Failed to load profile');
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId));
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>LinkedIn Clone - Profile</title>
        </Head>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto pt-8 px-4">
            {/* Loading skeleton */}
            <div className="card p-8 mb-6">
              <div className="animate-pulse">
                <div className="flex items-center mb-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mr-6"></div>
                  <div>
                    <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!profileUser) {
    return (
      <>
        <Head>
          <title>LinkedIn Clone - Profile Not Found</title>
        </Head>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
            <p className="text-gray-600 mb-4">The user you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/')}
              className="btn-primary"
            >
              Go Home
            </button>
          </div>
        </div>
      </>
    );
  }

  const isOwnProfile = currentUser && currentUser.id === profileUser.id;

  return (
    <>
      <Head>
        <title>{`${profileUser.name} - LinkedIn Clone`}</title>
        <meta name="description" content={`View ${profileUser.name}'s profile and posts`} />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto pt-8 px-4">
          {/* Header */}
          <div className="card p-8 mb-6">
            <div className="flex items-start space-x-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-linkedin-600 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                {profileUser.name.charAt(0).toUpperCase()}
              </div>
              
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                      {profileUser.name}
                    </h1>
                    <p className="text-gray-600 mb-2">{profileUser.email}</p>
                    <p className="text-sm text-gray-500">
                      Member since {moment(profileUser.createdAt).format('MMMM YYYY')}
                    </p>
                  </div>
                  
                  {isOwnProfile && (
                    <button className="btn-outline">
                      Edit Profile
                    </button>
                  )}
                </div>
                
                {/* Bio */}
                {profileUser.bio && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {profileUser.bio}
                    </p>
                  </div>
                )}
                
                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold text-gray-900">{posts.length}</span> posts
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      {moment(profileUser.createdAt).fromNow()}
                    </span> joined
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {isOwnProfile ? 'Your Posts' : `${profileUser.name}'s Posts`}
            </h2>
            
            {posts.length === 0 ? (
              <div className="card p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500">
                  {isOwnProfile 
                    ? "You haven't shared anything yet. Start by creating your first post!"
                    : `${profileUser.name} hasn't shared anything yet.`
                  }
                </p>
                {isOwnProfile && (
                  <button
                    onClick={() => router.push('/')}
                    className="btn-primary mt-4"
                  >
                    Create Your First Post
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    currentUser={currentUser}
                    onDelete={handleDeletePost}
                  />
                ))}
              </div>
            )}
          </div>

          {/*  More Button */}
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