

// export default Galleryimport React from 'react';
import { useQuery } from '@tanstack/react-query';
import ApiComponent from '../../API/ApiComponent';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import Aos from "aos";
import { useEffect } from 'react';
import Loading from "../../components/Loading/Loading";

const Gallery = () => {
  const { getPhotos } = ApiComponent();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['photos'],
    queryFn: getPhotos,
  });


  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);


  if (isLoading) {
    return <Loading height="screen"></Loading>;
  }

  if (isError) {
    return <></>;
  }

  return (
    <div className="w-full md:w-10/12 mx-auto py-20">
      <h1 className="text-3xl font-bold text-center text-[#4335A7] mb-8">
      Photo Gallery
     </h1>


      {/* Gallery Container */}
      <div className="space-y-12">
        {data?.map((photoGroup) => (
          <div
          
          key={photoGroup._id} className="space-y-4 px-1">
            {/* Title */}
            <h3 className="text-xl md:text-3xl front-bold text-[#4335A7] text-center  mb-4">{photoGroup.title}</h3>
            
            <h3 className="text-xl md:text-2xl font-semibold text-[#4335A7] text-center  mb-4">{new Date(photoGroup.createdAt).toLocaleDateString()}</h3>


            {/* Swiper for Photos */}
            <Swiper
              slidesPerView={3}  
              spaceBetween={20}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              breakpoints={{
                300: {
                  slidesPerView: 1,  // For small screens, show 2 images
                },
                640: {
                  slidesPerView: 2,  // For small screens, show 2 images
                },
                1024: {
                  slidesPerView: 3,  // For medium screens, show 3 images
                },
                1280: {
                  slidesPerView: 4,  // For large screens, show 4 images
                },
              }}
              className="mySwiper"
            >
              {photoGroup.photos.map((photo, index) => (
                <SwiperSlide key={index}>
                  <div
                  data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="1000"
                  className="relative group overflow-hidden rounded-lg shadow-lg ">
                    <img
                      src={photo}
                      alt={`Gallery Image ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform transform group-hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
