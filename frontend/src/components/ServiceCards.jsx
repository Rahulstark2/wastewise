import React from 'react';
import Card1 from '../assets/Card1.jpeg';
import Card2 from '../assets/Card2.jpeg';
import Card3 from '../assets/Card3.jpeg';
import Card4 from '../assets/Card4.jpeg';
import Card5 from '../assets/Card5.jpeg';
import Card6 from '../assets/Card6.jpeg';
import Card7 from '../assets/Card7.jpeg';
import Card8 from '../assets/Card8.jpeg';
import Card9 from '../assets/Card9.jpeg';
import Card10 from '../assets/Card10.jpeg';
import Card11 from '../assets/Card11.jpeg';

const ServiceCards = () => {
  const services = [
    { title: 'RECYCLER REGISTRATION', image: Card1 },
    { title: 'TYRE WASTE EPR', image: Card2 },
    { title: 'Battery waste EPR', image: Card3 },
    { title: 'Plastic waste EPR', image: Card4 },
    { title: 'E-waste EPR', image: Card5 },
    { title: 'Waste Management', image: Card6 },
    { title: 'CGWA NOC', image: Card7 },
    { title: 'UPGWD NOC', image: Card8 },
    { title: 'HWRA NOC', image: Card9 },
    { title: 'LMPC', image: Card10 },
    { title: 'BIS, WPC, ISO', image: Card11 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-custom-light-green rounded-lg overflow-hidden shadow-md">
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
  
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;
