import { useState, useEffect } from 'react';
import frame1 from "../assets/s2.jpeg";
import frame2 from "../assets/landing_photo/Designer (4).jpeg";
import frame3 from "../assets/s1.jpg";

const Hero = () => {
  const images = [frame1, frame2, frame3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval); 
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className='flex flex-col justify-center items-center h-[700px] w-full p-10 mt-[-6rem] md:mt-0'>
      <div className="relative w-full h-[400px] md:h-[600px]">
        <img
          src={images[currentIndex]}
          className='w-full h-full object-cover rounded-xl'
          alt="carousel slide"
        />
      </div>
      <div className='flex mt-4'>
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
