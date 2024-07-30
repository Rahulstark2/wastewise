import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log('Credential Response:', credentialResponse);
      const { access_token } = credentialResponse;

      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const userInfo = await response.json();
        console.log('User Info:', userInfo);

        const { email }= userInfo;
        console.log('Email:', email);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => {
      console.log('Login Failed');
    }
  });

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-[#DFEDCC] p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <button
          onClick={() => login()}
          className="w-full bg-white text-gray-700 font-semibold py-2 px-4 rounded-md border border-gray-300 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-center space-x-2 mb-4"
        >
          <FcGoogle className="text-2xl" />
          <span>Login with Google</span>
        </button>
        <div className="text-center">
          <span className="text-gray-600">Don't have an account yet?</span>
          <button
            onClick={handleSignup}
            className="ml-2 text-blue-600 hover:underline focus:outline-none"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
