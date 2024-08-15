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
        const loginResponse = await fetch('https://backend-qtcmsat0c-rahulstark2s-projects.vercel.app/api/v1/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const loginData = await loginResponse.json();
        if (loginResponse.ok) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("userPhoneNumber", loginData.user.phoneNumber);
          localStorage.setItem("userEmail", loginData.user.email);
          let addressWords = loginData.user.address.split(' ');
          let shortAddress = addressWords.slice(0, 3).join(' ');
          localStorage.setItem("userAddress", shortAddress);
          
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
    <div className="flex flex-col md:flex-row h-screen">
      <div 
        className="hidden md:block md:w-2/4 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: 'url("src/assets/image-4.webp")' }}
      />
      <div className="w-full md:w-3/4 bg-[#DFEDCC] flex items-center justify-center p-8 min-h-screen">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-2">Welcome Back! 👋</h1>
          <p className="text-black mb-8 mt-4 md:mt-8">Continue with Google to Proceed</p>
          
          <button 
            onClick={() => login()} 
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md mb-4 flex items-center justify-center space-x-2"
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </button>
          
          <p className="text-black mt-4 md:mt-8 text-center">
            Already have an account? <span className="text-black hover:underline cursor-pointer hover:text-gray-700" onClick={handleSignup}>Sign up here!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
