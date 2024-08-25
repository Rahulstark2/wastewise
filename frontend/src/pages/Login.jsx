import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useToast } from '@chakra-ui/react';
import AdditionalInfo from '../components/AdditionalInfo';

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [renderAdditionalInfo, setRenderAdditionalInfo] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(null);

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
        const loginResponse = await fetch('https://backend-zeta-ashen.vercel.app/api/v1/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const loginData = await loginResponse.json();
        if (loginResponse.ok) {
          setToken(loginData.token);
          localStorage.setItem('token', loginData.token);
          localStorage.setItem('userPhoneNumber', loginData.user.phoneNumber);
          localStorage.setItem('userEmail', loginData.user.email);
          localStorage.setItem('userAddressFull', loginData.user.address);
          let addressWords = loginData.user.address.split(' ');
          let shortAddress = addressWords.slice(0, 3).join(' ');
          localStorage.setItem('userAddress', shortAddress);

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
          if (loginData.message === 'Additional details not found for this user') {
            setRenderAdditionalInfo(true);
            setEmail(email);
            setToken(loginData.token)
          } else {
            toast({
              title: 'Login Failed',
              description: loginData.message,
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const loginWithDemoUser = async () => {
    const demoUserEmail = 'johndoe@example.com'; // Replace with the demo user's email
    try {
      const loginResponse = await fetch('https://backend-zeta-ashen.vercel.app/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: demoUserEmail }),
      });
      const loginData = await loginResponse.json();
      if (loginResponse.ok) {
        setToken(loginData.token);
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('userPhoneNumber', loginData.user.phoneNumber);
        localStorage.setItem('userEmail', loginData.user.email);
        localStorage.setItem('userAddressFull', loginData.user.address);
        let addressWords = loginData.user.address.split(' ');
        let shortAddress = addressWords.slice(0, 3).join(' ');
        localStorage.setItem('userAddress', shortAddress);

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
      }
    } catch (error) {
      console.error('Error logging in as demo user:', error);
    }
  };

  useEffect(() => {
    if (renderAdditionalInfo) {
      toast({
        title: 'Enter Additional Details',
        description: 'Please enter additional details to continue.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [renderAdditionalInfo, toast]);

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen relative">
      <div
        className={`hidden md:block md:w-2/4 bg-cover bg-center bg-no-repeat ${renderAdditionalInfo ? 'blur-sm' : ''}`}
        style={{ backgroundImage: 'url("https://i.ibb.co/Myv97n1/image-4.webp")' }}
      />
      <div className={`w-full md:w-3/4 bg-[#DFEDCC] flex flex-col items-center justify-center p-8 min-h-screen relative ${renderAdditionalInfo ? 'blur-sm' : ''}`}>
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
            Don't have an account?{' '}
            <span className="text-black hover:underline cursor-pointer hover:text-gray-700" onClick={handleSignup}>
              Sign up here!
            </span>
          </p>
        </div>
  
        {/* Move Demo User Button to the Bottom */}
        <div className="absolute inset-x-0 bottom-4 p-4 w-full max-w-md mx-auto">
          <button
            onClick={() => loginWithDemoUser()}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
          >
            <span>Login as Demo User</span>
          </button>
        </div>
      </div>
  
      {renderAdditionalInfo && (
        <div className="fixed inset-0 flex items-center justify-center z-10 animate-fade-in">
          <AdditionalInfo email={email} token={token} type={"login"} />
        </div>
      )}
    </div>
  );
  
};

export default Login;
