import ServiceCard from "./ServiceCard";
import img from "../assets/landing_photo/battery.png"
import img2 from "../assets/landing_photo/Frame 32.png"
import img3 from "../assets/landing_photo/Frame 34.png"
import img4 from "../assets/landing_photo/Frame 32 (1).png"
import img5 from "../assets/landing_photo/Frame 32 (2).png"
import img6 from "../assets/landing_photo/frame31.png"

const Services = () => {

    const cards = [
        {
            title:"Waste Management",
            src:img6,
        },
        {
            title:"E-Waste EPR",
            src:img4,
        },
        {
            title:"Plastic Waste EPR",
            src:img5,
        },
        {
            title:"Battery Waste EPR",
            src:img,
        },
        {
            title:"Tyre Waste EPR",
            src:img2,
        },
        {
            title:"Recycler Registration",
            src:img3,
        },
    ]

  return (
    <div className="p-4  ">
      <div className=" flex flex-col items-center justify-center  text-[26px] font-semibold">
        Our Service
        <div className="border-2 w-[6%] border-gray-600 "></div>
      </div>
      <div className="flex justify-center gap-10 p-4 pt-10 flex-wrap   "  >
        {
            cards.map( (ele) => {
                return <ServiceCard src={ele.src} title={ele.title} />
            } )
        }
      </div>
      <div className="flex justify-end p-8 px-12 text-[20px] font-semibold" >
        
      </div>
    </div>
  );
};

export default Services;
