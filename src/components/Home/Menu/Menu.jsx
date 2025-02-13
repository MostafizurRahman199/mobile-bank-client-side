

import React from "react";
import SectionHeading from "../../SectionHeading/SectionHeading";
import image1 from "../../../../public/menu/dessert-bg.jpeg"
import image2 from "../../../../public/menu/pizza-bg.jpg"
import image3 from "../../../../public/menu/salad-bg.jpg"
import image4 from "../../../../public/menu/soup-bg.jpg"
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";

const Menu = () => {

  const {menuData} = useMenu();
  // console.log(menuData);

  const data = menuData?.slice(0,6);
  const popularMenu = menuData?.filter((item)=>item.category === "popular");

  return (
    <div className="w-full p-8 sm:w-10/12 md:p-0 mx-auto my-12">
       <SectionHeading title1={"---Check it out---"} title2={"FROM OUR MENU"}></SectionHeading>
   
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {popularMenu?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center sm:flex sm:flex-row md:h-[104px] sm:items-start justify-between   rounded-lg hover:scale-105 transition-all duration-300 gap-4 md:gap-8"
          >
            <div className="rounded-bl-none rounded-full h-40 w-40 sm:h-full sm:w-24 md:h-full md:w-40 bg-[#D9D9D9] sm:rounded-full  sm:rounded-tl-none overflow-hidden ">
                <img src={item?.image || item.imageUrls[0]} alt="" className="h-40 w-40 sm:h-full sm:w-24 md:h-full md:w-40 object-cover" />
            </div>

     

           
            <div className="flex flex-col sm:flex sm:flex-row sm:justify-between md:justify-start ">
            <div>
              <h3 className="text-lg font-semibold new_heading_font text-center sm:text-start">{item?.name}</h3>
              <p className="text-gray-600 text-sm text-center sm:text-start">{item?.recipe.slice(0,100)+".."}</p>
            </div>
            </div>

            <div className="text-xl font-bold text-[#BB8506] text-center sm:text-start">
              ${item?.price}
              </div>


          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to={"/menu"} className="px-6 py-2 text-black rounded-2xl border-b-4 border-black">
          View Full Menu
        </Link>
      </div>
    </div>
  );
};

export default Menu;




