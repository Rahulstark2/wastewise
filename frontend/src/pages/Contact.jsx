import React from 'react';
import Header from '../components/Header';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center mt-16">
        <div className="text-left font-inter font-semibold text-3xl flex justify-center items-center" style={{ width: '217px', height: '48px' }}>
          Contact Us
        </div>
        <div className="mt-4" style={{ width: '100px', height: '2px', borderTop: '0.5px solid black' }}></div>
      </div>
      <main className="p-8">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
