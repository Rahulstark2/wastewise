

const ServiceCard = ({src,title}) => {
    return (
      <div className=' shadow-lg bg-[#DFEDCC]  w-[450px] rounded-xl h-[350px]' >
          <div className='h-[70%] w-[100%]'>
              <img src={src} className=' rounded-t-xl w-full  object-cover' alt="" />
          </div>
          <div className="p-4 rounded-b-xl bg-[#DFEDCC] flex flex-col gap-5 ">
              <div className="text-[18px]">
                  {title}
              </div>
              <div className="  cursor-pointer " >
                  Know More →
              </div>
          </div>
      </div>
    )
  }
  
  export default ServiceCard
  