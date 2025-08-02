import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../services/api';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
   
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      const publicRoutes = ['/login', '/register'];
      const isPublicRoute = publicRoutes.includes(router.pathname);

      if (!authenticated && !isPublicRoute) {
        router.push('/login');
      } else if (authenticated && isPublicRoute) {
        router.push('/');
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: '#ff4b4b',
            },
          },
        }}
      />
    </>
  );
}

export default MyApp;