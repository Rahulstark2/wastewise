
const TestimoCard = ({src}) => {
    return (
      <div className="relative w-[450px] h-[450px]">
          <div className="absolute z-10 shadow-lg left-[25%] top-[10%] w-[50%] bg-white h-[50%] p-2 rounded-full " >
              <img src={src} className="object-cover w-full h-full rounded-full overflow-hidden"  alt="" />
          </div>
          <div className="absolute shadow-lg bottom-0 bg-[#E1EED0] w-full h-[65%] pt-[125px] px-4 ">
              <div className="text-center text-[18px]" >
                  I have been using their Service for years and couldn't be happier .
                  They are always on time and very reliable. Highly recommeded !
              </div>
              <div className="text-center pt-4 text-[20px] font-semibold">
                  Jhon Doe
              </div>
          </div>
      </div>
    )
  }
  
  export default TestimoCard
  