import TestimoCard from "./TestimoCard";
import img1 from "../assets/landing_photo/test1.jpeg";
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
        "Their waste management services have been a game-changer for our business. They're efficient, eco-friendly, and always meet our needs.",
      name: "Amit Sharma",
    },
    {
      src: img2,
      testimo:
        "I've been using their e-waste EPR services for a while now, and I'm incredibly satisfied. They handle the entire process seamlessly.",
      name: "Vikram Gupta",
    },
    {
      src: img3,
      testimo:
        "Their battery waste EPR service is top-notch. They ensure that the batteries are recycled responsibly, and I appreciate their commitment to sustainability.",
      name: "Rajesh Kumar",
    },
    {
      src: img4,
      testimo:
        "Their plastic waste EPR service has significantly reduced our carbon footprint. Their team is professional and dedicated to providing excellent service.",
      name: "Meena Singh",
    },
    {
      src: img5,
      testimo:
        "I've been a customer of their recycler registration service for years. They're always up-to-date with the latest regulations and provide excellent support.",
      name: "Priya Patel",
    },
    {
      src: img6,
      testimo:
        "Their tyre waste EPR service is outstanding. They've helped us dispose of our old tyres in an environmentally friendly manner, and we're very satisfied with their service.",
      name: "Anjali Verma",
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
          {cards.map((ele, index) => {
            return <TestimoCard key={index} src={ele.src} testimo={ele.testimo} name={ele.name} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
