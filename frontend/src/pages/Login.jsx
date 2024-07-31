import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useToast } from '@chakra-ui/react';

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const { access_token } = credentialResponse;

      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const userInfo = await response.json();
        const { email } = userInfo;

        const loginResponse = await fetch('http://localhost:3000/api/v1/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          // Store the token in local storage
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("userPhoneNumber", loginData.user.phoneNumber);
          localStorage.setItem("userEmail", loginData.user.email);
          let addressWords = loginData.user.address.split(' '); // Split the address into words
          let shortAddress = addressWords.slice(0, 3).join(' '); // Join the first three words back into a string
          localStorage.setItem("userAddress", shortAddress); // Store the shortened address
          

          

          toast({
            title: 'Login Successful',
            description: 'You have been logged in successfully.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          toast({
            title: 'Login Failed',
            description: loginData.message,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
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
