import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  VStack,
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Icon,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const AdditionalInfo = ({ email,token,type }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(type)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneError && address) {
      setIsLoading(true);

      try {
        


        const response = await fetch('https://backend-qtcmsat0c-rahulstark2s-projects.vercel.app/api/v1/user/additional-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, phoneNumber, address }),
        });
  
        if (response.ok) {
          // Additional details saved successfully
          if(type==="login") {
          toast({
            title: 'Login successful',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          localStorage.setItem('token',token)
          localStorage.setItem('userEmail',email)
          localStorage.setItem('userPhoneNumber',phoneNumber)
          let addressWords = address.split(' ');
          let shortAddress = addressWords.slice(0, 3).join(' ');
          localStorage.setItem('userAddress', shortAddress);
        }
        else {
          toast({
            title: 'Registration Complete',
            description: 'Please login to continue.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          })

        }
  
          // Delay the redirection for 2 seconds
          setTimeout(() => {
            navigate('/'); // Redirect to the home page
          }, 2000);
        } else if (response.status === 411) {
          // Phone number already exists
          const errorData = await response.json();
          toast({
            title: 'Error',
            description: errorData.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          // Handle other error responses
          const errorData = await response.json();
          console.error('Error:', errorData.message);
        }
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;
    setPhoneError(!phoneRegex.test(value));
  };

  const detectLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            setAddress(data.display_name);
          } catch (error) {
            console.error('Error fetching address:', error);
            toast({
              title: 'Error detecting location',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          } finally {
            setIsLoading(false);
          }
        },
        () => {
          setIsLoading(false);
          toast({
            title: 'Unable to detect location',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      );
    } else {
      setIsLoading(false);
      toast({
        title: 'Geolocation is not supported by your browser',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    // Focus on the phone number input when the component mounts
    document.getElementById('phone-input').focus();
  }, []);

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box p={8} borderRadius="xl" boxShadow="xl" width={['90%', '80%', '400px']} bg="#1f2937">
        <VStack spacing={6}>
          <Heading as="h1" size="xl" textAlign="center" color="white">
            Additional Information
          </Heading>
          <Text textAlign="center" color="white">
            Please provide your phone number and address to complete your registration.
          </Text>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isRequired isInvalid={phoneError}>
                <FormLabel color="white">Phone Number</FormLabel>
                <Input
                  id="phone-input"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    validatePhoneNumber(e.target.value);
                  }}
                  placeholder="Enter your phone number"
                  bg="white"
                />
                {phoneError && <FormErrorMessage>Please enter a valid 10-digit phone number.</FormErrorMessage>}
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="white">Address</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    bg="white"
                  />
                  <InputRightElement>
                    <Icon
                      as={FaMapMarkerAlt}
                      color="green.500"
                      cursor="pointer"
                      onClick={detectLocation}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
              type="submit"
              colorScheme="green"
              bg="purple.500" // Change this to your desired background color
              _hover={{ bg: 'purple.600' }} // Optional: Add a hover effect
              width="full"
              mt={4}
              isLoading={isLoading}
              loadingText="Submitting"
              isDisabled={phoneError || !address}
            >
              Submit
            </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default AdditionalInfo;
