
import React from "react";
import useMenu from "../../hooks/useMenu";


const SharedMenu = ({menuItems}) => {
   

  return (
    <div className="w-full p-8 sm:w-10/12 md:p-0 mx-auto my-12">

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2  items-center">
        {menuItems?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center  sm:grid sm:grid-cols-12 sm:items-start   md:h-[104px] md:items-center   rounded-lg hover:scale-105 transition-all duration-300 gap-6"
          >
            <div className="col-span-3 rounded-bl-none rounded-full  bg-[#D9D9D9] sm:rounded-full  sm:rounded-tl-none overflow-hidden ">
                <img src={item?.image || item.imageUrls[0]} alt="" className="w-full h-24 object-cover " />
            </div>
           
            <div className="col-span-7 flex flex-col sm:flex sm:flex-row justify-center sm:justify-start">
            <div>
              <h3 className="text-lg font-semibold new_heading_font text-center sm:text-start">{item?.name}</h3>
              <p className="text-gray-600 text-sm text-center sm:text-start">{item?.recipe.slice(0,100)}</p>
            </div>
          </div>


            <div className="col-span-2 text-xl font-bold text-[#BB8506] text-center sm:text-start ">${item?.price}</div>


            </div>
        ))}
      </div>
     
    </div>
  );
};

export default SharedMenu;




