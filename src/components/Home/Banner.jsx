import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import banner12 from '../../assets/banner3.jpeg'
import banner13 from '../../assets/banner4.jpeg'
import banner14 from '../../assets/banner5.jpeg'
import banner15 from '../../assets/banner6.jpeg'
import { useEffect } from "react";
import Aos from "aos";
 
export default function Banner() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


  return (
    <div className="h-[300px] md:h-[500px]"  data-aos="fade-left">
      <Carousel className="h-full">
        <div className="relative h-full w-full">
          <img
            src={banner15}
            alt="image 1"
            className="h-full w-full object-cover object-center"
          />
         
        </div>
        <div className="relative h-full w-full">
          <img
            src={banner12}
            alt="image 1"
            className="h-full w-full object-cover object-center"
          />
         
        </div>
        <div className="relative h-full w-full">
          <img
            src={banner13}
            alt="image 2"
            className="h-full w-full object-cover object-center"
          />
     
        </div>
        <div className="relative h-full w-full">
          <img
            src={banner14}
            alt="image 2"
            className="h-full w-full  object-cover sm:object-center"
          />
     
        </div>
      
      </Carousel>
    </div>
  );
}
