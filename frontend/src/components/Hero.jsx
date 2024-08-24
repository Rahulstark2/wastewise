import { useState, useEffect } from 'react';
import frame1 from "../assets/s2.jpeg";
import frame2 from "../assets/landing_photo/Designer (4).jpeg";
import frame3 from "../assets/s1.jpg";

const Hero = () => {
  const images = [frame1, frame2, frame3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 10000); // 10 seconds

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className='flex flex-col justify-center items-center h-[700px] w-full p-10 mt-[-6rem] md:mt-0'>
      <div 
        className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            alt={`carousel slide ${index + 1}`}
          />
        ))}
      </div>
      <div className='flex mt-4'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ease-in-out ${
              currentIndex === index ? 'bg-gray-800 scale-125' : 'bg-gray-400 hover:bg-gray-600'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
