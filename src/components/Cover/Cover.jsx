import React from "react";
import chefService from "../../../public/home/chef-service.jpg";

const Cover = ({image, title1, title2}) => {
  return (
    <div
      className="bg-fixed w-full  h-[572px] bg-cover bg-center bg-no-repeat   mx-auto flex justify-center items-center  px-2  py-4 sm:p-16  md:p-24 "
      style={{ backgroundImage: `url(${image})` }} // Set the background image dynamically
    >
      <div className=" p-8 md:p-8 w-10/12 mx-auto h-10/12 md:h-[333.67px]   bg-black/50 flex flex-col justify-center items-center gap-4">
        <h2 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold text-center new_heading_font">{title1}</h2>
        <p className="text-center text-white new_heading_font text-2xl">
        {title2}
        </p>
      </div>
    </div>
  );
};

export default Cover;
