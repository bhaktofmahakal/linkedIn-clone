import Head from 'next/head';
import AuthForm from '../components/AuthForm';

export default function Register() {
  return (
    <>
      <Head>
        <title>LinkedIn Clone - Sign Up</title>
        <meta name="description" content="Create your LinkedIn Clone account" />
      </Head>
      
      <AuthForm type="register" />
    </>
  );
}