// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import Autoplay
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import SectionHeading from "../../SectionHeading/SectionHeading";
// import quoteLeft from "../../../../public/home/quote-left.png";
// import { FaRegStarHalfStroke } from "react-icons/fa6";
// import { FaStar } from "react-icons/fa6";
// import { FaRegStar } from "react-icons/fa";
// import ApiComponent from "../../../API/ApiComponent";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../../Loading/Loading";
// import ErrorPage from "../../../pages/ErrorPage";
// import { useDarkMode } from "../../../Context/DarkModeContext";



// const TestimonialSlider = () => {

// const {getReviews} = ApiComponent();
// const {darkMode} = useDarkMode();

// const {data : testimonials, isLoading, isError, error} = useQuery({
//   queryKey:["reviews"],
//   queryFn:getReviews,
// })


// if(isLoading) return <Loading></Loading>;
// if(isError) return <ErrorPage></ErrorPage>


//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const halfStars = rating % 1 !== 0 ? 1 : 0;
//     const emptyStars = 5 - fullStars - halfStars;

//     return (
//       <div className="flex justify-center mt-4">
//         {Array(fullStars)
//           .fill(0)
//           .map((_, i) => (
//             <span key={i} className="text-[#5544d9] text-4xl"><FaStar /></span>
//           ))}
//         {halfStars === 1 && <span className="text-[#5544d9] text-4xl"><FaRegStarHalfStroke /></span>}
//         {Array(emptyStars)
//           .fill(0)
//           .map((_, i) => (
//             <span key={i} className="text-gray-300 text-4xl"><FaRegStar /></span>
//           ))}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 text-center">
//     <h2
//         className={`text-3xl md:text-4xl font-bold mb-8 text-center ${
//           darkMode ? 'text-[#5544d9]' : 'text-[#4335a7]'
//         }`}
//       >
//         Testimonials
//       </h2>

//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]} // Add Autoplay module
//         navigation
//         pagination={{ clickable: true }}
//         loop={true}
//         autoplay={{
//           delay: 3000, // Delay between slides in milliseconds
//           disableOnInteraction: false, // Keeps autoplay running after user interaction
//         }}
//         className="mt-8"
//       >
//         {testimonials.map((testimonial, index) => (
//           <SwiperSlide key={testimonial?._id}>
//             <div className="flex flex-col justify-center items-center p-6 h-[400px]  gap-4">
//               <span>{renderStars(testimonial?.rating)}</span>
//               <img src={quoteLeft} className="w-16 h-16" alt="Quote" />
//               <p className="text-gray-600 italic">{testimonial?.campName}</p>
//               <p className="text-gray-600 text-2xl italic">{testimonial?.feedback}</p>
//               <h4 className="text-xl new_heading_font font-semibold text-[#5544d9] mt-4">
//                 {testimonial?.participantName}
//               </h4>
//               <p className="text-gray-600 italic">{new Date(testimonial?.createdAt).toLocaleDateString()}</p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TestimonialSlider;






import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionHeading from "../../SectionHeading/SectionHeading";
import quoteLeft from "../../../../public/home/quote-left.png";
import { FaRegStarHalfStroke, FaStar, FaRegStar } from "react-icons/fa6";
import ApiComponent from "../../../API/ApiComponent";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import ErrorPage from "../../../pages/ErrorPage";
import { useDarkMode } from "../../../Context/DarkModeContext";

const TestimonialSlider = () => {
  const { getReviews } = ApiComponent();
  const { darkMode } = useDarkMode();

  const { data: testimonials, isLoading, isError, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="flex justify-center mt-4">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <span key={`full-${i}`} className="text-[#FACC15] text-3xl">
              <FaStar />
            </span>
          ))}
        {halfStars === 1 && (
          <span className="text-[#FACC15] text-3xl">
            <FaRegStarHalfStroke />
          </span>
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <span key={`empty-${i}`} className="text-gray-300 text-3xl">
              <FaRegStar />
            </span>
          ))}
      </div>
    );
  };

  return (
    <div
      className={`w-full mx-auto p-8  ${
        darkMode ? "bg-gray-900" : "bg-white"
      } `}
    >
      <h2
        className={`text-4xl font-bold mb-12 text-center ${
          darkMode ? "text-white" : "text-[#4335a7]"
        }`}
      >
        What Our Participants Say
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="testimonial-swiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial?._id}>
            <div
              className={`flex flex-col items-center p-8 rounded-lg ${
                darkMode ? " text-gray-200" : " text-gray-700"
              } shadow-lg`}
            >
              {renderStars(testimonial?.rating)}
              <img
                src={quoteLeft}
                className="w-10 h-10 my-4"
                alt="Quote Icon"
              />
              <p className="text-lg italic mb-2">{testimonial?.campName}</p>
              <p className="text-lg text-center leading-relaxed italic">
                {testimonial?.feedback}
              </p>
              <h4
                className={`text-2xl font-semibold mt-6 ${
                  darkMode ? "text-[#FACC15]" : "text-[#5544d9]"
                }`}
              >
                {testimonial?.participantName}
              </h4>
              <p className="text-sm mt-2">
                {new Date(testimonial?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
