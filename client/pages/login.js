import Head from 'next/head';
import AuthForm from '../components/AuthForm';

export default function Login() {
  return (
    <>
      <Head>
        <title>LinkedIn Clone - Sign In</title>
        <meta name="description" content="Sign in to your LinkedIn Clone account" />
      </Head>
      
      <AuthForm type="login" />
    </>
  );
}