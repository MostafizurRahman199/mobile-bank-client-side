

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserMd, FaUsers, FaDollarSign } from 'react-icons/fa';
import useCamp from '../../../hooks/useCamp';
import { useDarkMode } from '../../../Context/DarkModeContext';
import Loading from '../../Loading/Loading';
import ErrorPage from '../../Error.jsx/ErrorPage';
import Aos from "aos";

import AOS from 'aos';
import 'aos/dist/aos.css';


const HighestParticipantsCamps = () => {
  const { campData, isLoading, isError, error, refetch } = useCamp();
  const { darkMode } = useDarkMode();

  // Sort the camps by participant count in descending order and take the top 6
  const sortedCamps = campData?.sort((a, b) => b.participantCount - a.participantCount)?.slice(0, 6);

  if (isLoading) {
    return <Loading height='screen'></Loading>;
  }

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }




  return (
    <div className="w-full px-4 md:w-10/12 mx-auto pb-12">
      <h2
        className={`text-3xl md:text-4xl font-bold mb-8 text-center ${
          darkMode ? 'text-[#5544d9]' : 'text-[#4335a7]'
        }`}
      >
        Popular Medical Camps
      </h2>

      <div  className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCamps.map((camp) => (
          
          
          <div  data-aos="zoom-in">
            <div
           
            key={camp._id}
            className={`hover:scale-aos-override rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 p-4 flex flex-col justify-between ${
              darkMode ? 'bg-gray-900 text-white' : 'bg-white text-[#4335A7]'
            }`} // Conditional dark mode background and text color
          >
            <img
              src={camp.imageUrl}
              alt={camp.campName}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex flex-col flex-grow">
              <h2 className="text-xl font-bold mb-4 text-start">{camp.campName.slice(0,30)}</h2>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-gray-700 text-sm mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-[#4335A7]" />
                  {new Date(camp.dateTime).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
                <p className="text-gray-700 text-sm mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-[#4335A7]" />
                  {camp.location}
                </p>
                <p className="text-gray-700 text-sm mb-2 flex items-center">
                  <FaUserMd className="mr-2 text-[#4335A7]" />
                  {camp.healthcareProfessional}
                </p>
                <p className="text-gray-700 text-sm mb-2 flex items-center">
                  <FaUsers className="mr-2 text-[#4335A7]" />
                  {camp.participantCount || 0} Participants
                </p>
                <p className="text-gray-700 text-sm mb-2 flex items-center">
                  <FaDollarSign className="mr-2 text-[#4335A7]" />
                  {camp.campFees || 0} BDT
                </p>
              </div>
            </div>
            <div className="flex w-full justify-center mt-4">
              <Link
                to={`/camp-details/${camp?._id}`}
                className="bg-gradient-to-r from-[#4335A7] to-[#5544d9] text-white py-2 px-8 rounded-2xl font-semibold hover:scale-105 transition-transform duration-300 text-center w-fit"
              >
                See Details
              </Link>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighestParticipantsCamps;
