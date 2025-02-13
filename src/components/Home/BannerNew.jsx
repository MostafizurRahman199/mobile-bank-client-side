



import React, { useState } from 'react';
import banner1 from "../../../public/m1.png";
import banner2 from "../../../public/m2.png";
import banner3 from "../../../public/m3.png";
import banner4 from "../../../public/m4.png";
import banner5 from "../../../public/m5.png";
import banner6 from "../../../public/m6.png";
import banner7 from "../../../public/mm1.jpg";

import banner9 from "../../../public/mm3.webp";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const BannerNew = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: banner7, heading: "Welcome to BeHealthy" , heading2: "Medical Camp", text: "Efficiently manage medical camps and provide better care." },
    { src: banner9, heading: "Organize with Ease", text: "Streamline operations and focus on patient care." },
    { src: banner1, heading: "Empowering Healthcare Teams", text: "Enhance collaboration and maximize efficiency." },
    { src: banner4, heading: "Data-Driven Decisions", text: "Access critical insights to improve outcomes." },
    { src: banner5, heading: "Scalable Solutions", text: "Adapt to your needs with flexible features." },
    { src: banner6, heading: "Join the Revolution in Healthcare", text: "Be a part of transformative medical camp management." },
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const selectSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[600px] sm:h-[600px] lg:h-[600px] mt-16">
      {/* Main Carousel Image with Overlay */}
      <div className="w-full h-full relative overflow-hidden">
        <img
          src={images[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center md:justify-end text-center text-white p-4 pb-20">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4">{images[currentIndex].heading}</h1>
          {
            images[currentIndex]?.heading2 &&   <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4">{images[currentIndex]?.heading2}</h1>
          }
          <p className="text-sm sm:text-2xl max-w-2xl">{images[currentIndex].text}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 btn btn-circle z-10"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 btn btn-circle z-10"
      >
        <FaChevronRight />
      </button>

      {/* Thumbnail Carousel */}
      <div className="flex justify-center gap-2 sm:gap-4 mt-4">
        {images.map((image, index) => (
          <div key={index} className="cursor-pointer">
            <img
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 border-transparent hover:border-gray-500 transition duration-300"
              onClick={() => selectSlide(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerNew;


