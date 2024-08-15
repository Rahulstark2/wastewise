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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [renderAdditionalInfo, setRenderAdditionalInfo] = useState(false);

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
      navigate('/');
    }
  }, [isLoggedIn, toast, navigate]);

  if (isLoggedIn) {
    return null;
  }

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const { access_token } = credentialResponse;
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const userInfo = await response.json();
        const { email, given_name, family_name } = userInfo;

        const signupResponse = await fetch('http://localhost:3000/api/v1/user/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': JSON.stringify({
              email,
            }).length.toString()
          },
          body: JSON.stringify({ email }),
        });

        const signupData = await signupResponse.json();
        console.log(signupData)
        if (signupResponse.ok) {
          toast({
            title: 'Sign-up Successful',
            description: 'Your sign-up was successful!',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setEmail(email);
          setFirstName(given_name);
          setLastName(family_name);
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
      } catch (error) {
        console.error('Error during signup:', error);
      }
    },
    onError: () => {
      console.log('Signup Failed');
    },
  });

  useEffect(() => {
    let timeout;
    if (email && firstName && lastName) {
      timeout = setTimeout(() => {
        setRenderAdditionalInfo(true);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [email, firstName, lastName]);

  const handleLogin = () => {
    navigate('/login');
  };


  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className={`w-full md:w-3/4 bg-[#DFEDCC] flex items-center justify-center p-8 min-h-screen order-2 md:order-1 ${renderAdditionalInfo ? 'blur-sm' : ''}`}>
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 whitespace-nowrap">Create your account 🌟</h1>
          <p className="text-black mb-8 mt-4 md:mt-8">Continue with Google to Proceed</p>

          <button
            onClick={() => login()}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md mb-4 flex items-center justify-center space-x-2"
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </button>

          <p className="text-black mt-4 md:mt-8 text-center">
            Already have an account? <span className="text-black hover:underline cursor-pointer hover:text-gray-700" onClick={handleLogin}>Login here!</span>
          </p>
        </div>
      </div>
      <div
        className={`hidden md:block md:w-2/4 bg-cover bg-center bg-no-repeat order-1 md:order-2 ${renderAdditionalInfo ? 'blur-sm' : ''}`}
        style={{ backgroundImage: 'url("https://i.ibb.co/FDz64tz/image-5.webp")' }}
      />

      {renderAdditionalInfo && (
        <div className={`fixed inset-0 flex items-center justify-center z-10 animate-fade-in`}>
          <AdditionalInfo email={email} firstName={firstName} lastName={lastName} />
        </div>
      )}
    </div>
  );
};

export default Signup;
