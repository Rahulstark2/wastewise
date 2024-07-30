import TestimoCard from "./TestimoCard";
import img1 from "../assets/landing_photo/test1.jpeg"
import img2 from "../assets/landing_photo/test2.jpeg";
import img3 from "../assets/landing_photo/test3.jpeg";
import img4 from "../assets/landing_photo/test4.jpeg";
import img5 from "../assets/landing_photo/test5.jpeg";
import img6 from "../assets/landing_photo/test6.jpeg";

const Testimonial = () => {
  const cards = [
    {
      src: img1,
      testimo:
        "I have been using their Service for years and couldn't be happier .They are always on time and very reliable. Highly recommeded",
    },
    {
      src: img6,
      testimo:
        "I have been using their Service for years and couldn't be happier .They are always on time and very reliable. Highly recommeded",
    },
    {
      src: img3,
      testimo:
        "I have been using their Service for years and couldn't be happier .They are always on time and very reliable. Highly recommeded",
    },
    {
      src: img4,
      testimo:
        "I have been using their Service for years and couldn't be happier .They are always on time and very reliable. Highly recommeded",
    },
    {
      src: img5,
      testimo:
        "I have been using their Service for years and couldn't be happier .They are always on time and very reliable. Highly recommeded",
    },
    {
      src: img2,
      testimo:
        "I have been using their Service for years and couldn't be happier .They are always on time and very reliable. Highly recommeded",
    },
  ];

  return (
    <div className=" ">
      <div className="  flex flex-col items-center justify-center  text-[26px] font-semibold">
        Testimonials
        <div className="border-2 w-[7%] border-gray-600 "></div>
      </div>
      <div>
        <div className="flex justify-center gap-10 p-4 pt-10 flex-wrap   ">
          {cards.map((ele) => {
            return <TestimoCard src={ele.src} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
