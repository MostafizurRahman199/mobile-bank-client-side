import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { FaUserMd } from 'react-icons/fa';

// Demo doctor data
const doctorData = [
  {
    id: 1,
    name: "Dr. Maria Lopez",
    specialization: "Cardiologist",
    imageUrl: "https://www.scripps.org/sparkle-assets/images/primary_care_physician_1200x750-163ed71c4c87820817101e72ab78901d.jpg",
    description: "Expert in cardiovascular diseases with over 20 years of experience in the field.",
  },
  {
    id: 2,
    name: "Dr. John Smith",
    specialization: "Orthopedic Surgeon",
    imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    description: "Specialized in joint and spine surgery, providing advanced treatment techniques.",
  },
  {
    id: 3,
    name: "Dr. Sarah Williams",
    specialization: "Pediatrician",
    imageUrl: "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=926&fit=clip",
    description: "Skilled in treating children's illnesses and ensuring their well-being.",
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    specialization: "Dermatologist",
    imageUrl: "https://www.mua.edu/uploads/sites/10/2023/03/board-certified-doctor-meaning.webp",
    description: "Specializes in treating skin conditions and promoting skincare wellness.",
  },
  {
    id: 5,
    name: "Dr. Jennifer Davis",
    specialization: "Endocrinologist",
    imageUrl: "https://www.postbaccprogramguide.com/app/uploads/2022/07/iStock-1189304032.jpg",
    description: "Focused on hormonal disorders and managing metabolic conditions.",
  },
  {
    id: 6,
    name: "Dr. Richard Harris",
    specialization: "Neurologist",
    imageUrl: "https://meddoc.ie/wp-content/uploads/Male-doctor-1-947x1024.jpg",
    description: "Expert in treating neurological disorders like Alzheimer's and Parkinson's.",
  },
  {
    id: 7,
    name: "Dr. Emma Clark",
    specialization: "Gastroenterologist",
    imageUrl: "https://images.healthshots.com/healthshots/en/uploads/2022/07/02195043/doctor-stress.jpg",
    description: "Specializes in digestive system disorders and overall gastrointestinal health.",
  },
  {
    id: 8,
    name: "Dr. David Martinez",
    specialization: "Ophthalmologist",
    imageUrl: "https://www.citizenshospitals.com/static/uploads/130789a4-764e-4ee3-88fe-68f9278452d6-1692966652977.png",
    description: "Expert in eye care and vision correction surgeries.",
  },
  {
    id: 9,
    name: "Dr. Elizabeth Taylor",
    specialization: "Psychiatrist",
    imageUrl: "https://www.scripps.org/sparkle-assets/images/new_doctor_fb-32abb9ba141c8223aadebce90782ac68.jpeg",
    description: "Dedicated to mental health treatment, providing both therapy and medication management.",
  },
  {
    id: 10,
    name: "Dr. William Wilson",
    specialization: "Pulmonologist",
    imageUrl: "https://snibbs.co/cdn/shop/articles/What_are_the_Challenges_of_Being_a_Doctor.jpg?v=1684314843",
    description: "Focused on the treatment of respiratory diseases like asthma and COPD.",
  }
];

const BestDoctors = () => {
  return (
    <div className="bg-[#4335A7] text-white py-14 px-6 md:px-16">
       <h2
        className={`text-3xl md:text-4xl font-bold mb-8 text-center text-white`}
      >
        Our Best Doctors
      </h2>
      <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto mb-16">
        Meet the top doctors who are making a difference in healthcare with their expertise and care.
      </p>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={30}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={{
            prevEl: '.prev',
            nextEl: '.next',
          }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {doctorData.map((doctor) => (
          <SwiperSlide key={doctor.id}>
            <div className=" rounded-3xl  transition-shadow duration-300 overflow-hidden p-6">
              {/* <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              /> */}
                <div className='flex justify-center w-full my-4'>
                <img
                className="mask mask-squircle mx-auto w-full h-24 md:h-48 object-contain"
                src={doctor.imageUrl}
                alt={doctor.name} />
                </div>

              <h3 className="text-2xl  text-center font-semibold text-white mb-2">{doctor.name}</h3>
              <p className="text-white  text-center font-semibold mb-4">{doctor.specialization}</p>
              <p className="text-gray-300 mb-4 text-center">{doctor.description}</p>
              {/* <button className="block w-full bg-[#4335A7] text-white text-center py-3 rounded-md font-medium hover:bg-[#5544d9] transition-colors">
                View Profile
              </button> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons below the cards */}
      <div className="flex justify-center gap-4 mt-1 md:mt-6">
        <button className="prev  text-white p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="next  text-white p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BestDoctors;
