

import React from "react";
import { FaCheckCircle, FaGoogle, FaMicrosoft, FaApple, FaAmazon, FaEllipsisH } from "react-icons/fa";
import { motion } from "framer-motion";
const StaticBanner = () => {
  return (
    <div className="w-11/12 max-w-screen-xl mx-auto py-10 flex flex-col lg:flex-row items-center gap-32 lg:gap-16 my-8 sm:my-20">
      {/* Left Image */}
      <div className="flex-1">
        <div className="relative">
          <img
            src="https://images.ctfassets.net/7qqwgjna58ct/3WEd2JUHd2kdYfY34FanGj/ec7084674c3fd7420911240de5a9c5d7/get-a-job-with-no-experience.png" // Replace with your image URL
            alt="Working on Laptop"
            className="rounded-lg shadow-md w-full"
          />
          {/* Overlay with icons */}
          <motion.div className="absolute  md:bottom-[400px] md:left-[500px] xl:bottom-[400px] xl:left-[400px] bg-white p-6 rounded-lg shadow-2xl flex items-center gap-3 "
       
          animate={{ y:[ 0, 25, 0]}}
          
          transition={{ duration: 10, repeat: Infinity,  }}
          
          >
         <div className="relative">
            <p className="absolute md:-top-12 sm:-left-10 -left-8 -top-10  bg-white rounded-full">  <FaCheckCircle className="text-blue-600 text-3xl md:text-5xl" /></p>
            <div>
              <p className="text-sm text-gray-800 font-medium">300k+ Employers</p>
              <div className="flex items-center gap-2 mt-2">
                <FaGoogle className="text-blue-500 text-2xl" />
                <FaMicrosoft className="text-blue-700 text-2xl" />
                <FaApple className="text-black text-2xl" />
                <FaAmazon className="text-orange-500 text-2xl" />
                <FaEllipsisH className="text-gray-500 text-2xl" />
              </div>
            </div>
         </div>
          </motion.div>
        </div>
      </div>

      {/* Right Text Section */}
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 leading-tight">
          Millions of Jobs. <br />
          Find the one that suits you.
        </h1>
        <p className="text-gray-600 mt-4">
          Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over
          600,000 companies worldwide.
        </p>
        <ul className="mt-6 space-y-3 text-gray-800">
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            Bring to the table win-win survival
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            Capitalize on low-hanging fruit to identify
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            But I must explain to you how all this
          </li>
        </ul>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default StaticBanner;
