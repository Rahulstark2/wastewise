import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the server-side API to send the email
      await axios.post('https://backend-qtcmsat0c-rahulstark2s-projects.vercel.app/api/v1/contact/mail', { name, topic, message });

      // Display a success toast notification
      toast({
        title: 'Message sent successfully!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);

      // Display an error toast notification
      toast({
        title: 'An error occurred while sending the message.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="bg-custom-light-green p-4 md:p-8 rounded-lg">
      {/* Section for "Say Hi!" and introductory text */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-custom-blacky">Say Hi!</h2>
        <p className="text-base mt-2">We'd like to talk with you.</p>
      </div>

      {/* Section for form fields */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-custom-blacky mb-2">My name is</label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border border-gray-300 rounded h-10"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        {/* What you love Field */}
        <div>
          <label className="block text-sm font-medium text-custom-blacky mb-2">I'm looking for</label>
          <input
            type="text"
            placeholder="What you love"
            className="w-full p-2 border border-gray-300 rounded h-16"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          />
        </div>

        {/* Your message Field */}
        <div>
          <label className="block text-sm font-medium text-custom-blacky mb-2">Your message</label>
          <textarea
            placeholder="I want to say that..."
            className="w-full p-2 border border-gray-300 rounded h-44"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>

        {/* Send Message Button */}
        <div className="flex justify-end">
          <button type="submit" className="bg-custom-deep-green text-white font-semibold py-3 px-6 rounded-full w-full md:w-auto text-lg transition-colors duration-300">
            SEND MESSAGE
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
