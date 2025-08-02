import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authAPI, setAuthToken } from '../services/api';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {

    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    
    setAuthToken(null);
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-linkedin-600 text-white font-bold text-xl px-3 py-1 rounded">
                Li
              </div>
              <span className="text-xl font-semibold text-gray-900">
                LinkedIn Clone
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                router.pathname === '/'
                  ? 'text-linkedin-600 bg-linkedin-50'
                  : 'text-gray-700 hover:text-linkedin-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>

            {user && (
              <>
                <Link
                  href={`/profile/${user.id}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    router.pathname.startsWith('/profile')
                      ? 'text-linkedin-600 bg-linkedin-50'
                      : 'text-gray-700 hover:text-linkedin-600 hover:bg-gray-50'
                  }`}
                >
                  Profile
                </Link>

                {/* User Menu */}
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-700">
                    Welcome, <span className="font-medium">{user.name}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;