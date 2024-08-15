import React from 'react';
import Card1 from '../assets/e-waste.webp';
import Card2 from '../assets/plastic-waste.webp';
import Card3 from '../assets/battery.webp';
import Card4 from '../assets/tyre.webp';

import Avatar1 from '../assets/avatar1.webp';
import Avatar2 from '../assets/avatar2.webp';
import Avatar3 from '../assets/avatar3.webp';
import Avatar4 from '../assets/avatar4.webp';

const BlogCard = ({ image, title, author, date, shares, excerpt }) => (
  <div className="bg-custom-light-green rounded-lg overflow-hidden shadow-md w-full md:w-[48%] lg:w-[575px] h-auto relative custom-blog-card">
    <img src={image} alt={title} className="w-full h-[240px] md:h-[300px] lg:h-[420px] object-cover custom-blog-image" />
    <div className="p-4">
      <h3 className="font-normal text-xl md:text-2xl lg:text-4xl mb-2">{title}</h3>
      <div className="flex items-center mb-2 my-5">
        <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full mr-2" />
        <span className="text-sm text-custom-blackyy mr-4 md:mr-16">{author.name}</span>
        <span className="text-sm text-custom-blackyy mr-4 md:mr-8">{date}</span>
        <span className="text-sm text-custom-blackyy">{shares} shares</span>
      </div>
      <p className="text-sm text-custom-blackyy mb-4">{excerpt}</p>
      <button className="text-custom-blackish hover:underline">View Post</button>
    </div>
  </div>
);

const BlogCards = () => {
  const blogs = [
    {
      image: Card1,
      title: 'The Impact of E-Waste on the Environment',
      author: { name: 'Amit Sharma', avatar: Avatar1 },
      date: 'July 1, 2022',
      shares: '5.1K',
      excerpt: 'E-waste is a growing problem worldwide. Learn about its environmental impact and what we can do to address it.'
    },
    {
      image: Card2,
      title: 'Plastic Waste Recycling: A Comprehensive Guide',
      author: { name: 'Priya Patel', avatar: Avatar2 },
      date: 'July 5, 2022',
      shares: '3.8K',
      excerpt: 'Discover the different methods of plastic waste recycling and their benefits for the environment and society.'
    },
    {
      image: Card3,
      title: 'The Role of Batteries in Renewable Energy Storage',
      author: { name: 'Rajesh Kumar', avatar: Avatar3 },
      date: 'July 10, 2022',
      shares: '4.5K',
      excerpt: 'Explore how batteries are being used to store renewable energy and contribute to a more sustainable future.'
    },
    {
      image: Card4,
      title: 'Tyre Waste Management: From Disposal to Recycling',
      author: { name: 'Meena Singh', avatar: Avatar4 },
      date: 'July 15, 2022',
      shares: '3.2K',
      excerpt: 'Learn about the challenges and solutions in managing tyre waste, from disposal to recycling and repurposing.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-[30px]">
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogCards;
