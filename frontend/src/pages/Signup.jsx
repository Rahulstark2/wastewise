import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useToast } from '@chakra-ui/react';
import AdditionalInfo from '../components/AdditionalInfo';

const Signup = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [renderAdditionalInfo, setRenderAdditionalInfo] = useState(false);
  
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('token');
  
    useEffect(() => {
      if (isLoggedIn) {
        toast({
          title: 'Already Logged In',
          description: 'You are already logged in. Please log out to sign up with a different account.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
        navigate('/'); // redirect to the home page
      }
    }, [isLoggedIn, toast, navigate]);
  
    if (isLoggedIn) {
      return null; // don't render the Signup component if the user is already logged in
    }

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const { access_token } = credentialResponse;
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const userInfo = await response.json();
      const { email, given_name, family_name } = userInfo;

      const signupResponse = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName: given_name, lastName: family_name }),
      });

      const signupData = await signupResponse.json();
      if (signupResponse.ok) {
        toast({
          title: 'Sign-up Successful',
          description: 'Your sign-up was successful!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setEmail(email);
      } else if (signupData.message === 'Email already exists') {
        toast({
          title: 'Email Already Exists',
          description: 'The email address is already in use.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        console.error('Sign-up failed');
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  useEffect(() => {
    let timeout;
    if (email) {
      timeout = setTimeout(() => {
        setRenderAdditionalInfo(true);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [email]);

  const handleLogin = () => {
    navigate('/login');
  };

  if (renderAdditionalInfo) {
    return <AdditionalInfo email={email} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-[#DFEDCC] p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <button
          onClick={() => login()}
          className="w-full bg-white text-gray-700 font-semibold py-2 px-4 rounded-md border border-gray-300 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-center space-x-2 mb-4 mx-auto"
        >
          <FcGoogle className="text-2xl" />
          <span>Sign up with Google</span>
        </button>
        <div className="text-center">
          <span className="text-gray-600">Already have an account?</span>
          <button onClick={handleLogin} className="ml-2 text-blue-600 hover:underline focus:outline-none">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
