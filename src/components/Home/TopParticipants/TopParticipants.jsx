

import React, { useState, useEffect } from "react";
import useJoinCamp from "../../../hooks/useJoinCamp";
import { FaTrophy, FaMedal, FaRegStar, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa"; // Icons for fees and location
import { GiCampingTent } from "react-icons/gi";
import Loading from "../../Loading/Loading";
import ErrorPage from "../../Error.jsx/ErrorPage";
import { useDarkMode } from "../../../Context/DarkModeContext";
import { RiMedal2Fill } from "react-icons/ri";
import { BiMedal } from "react-icons/bi";
import { TfiMedall } from "react-icons/tfi";



import Aos from "aos";

const TopParticipants = () => {
  const { campData, isLoading, isError, error, refetch } = useJoinCamp();
  const [topParticipants, setTopParticipants] = useState([]);
  const { darkMode } = useDarkMode(); // Get dark mode status

  useEffect(() => {
    if (campData) {
      const participantStats = {};

      // Step 1: Group by participant email
      campData.forEach((camp) => {
        const { participantEmail, campFees, location, participantName } = camp;

        // Ensure campFees is a valid number
        const feeAmount = parseFloat(campFees);

        // Initialize the participant if not already in the object
        if (!participantStats[participantEmail]) {
          participantStats[participantEmail] = {
            name: participantName,
            totalFees: 0,
            locations: new Set(), // Using Set to track unique locations
            count: 0,
          };
        }

        // Step 2: Calculate total camp fees
        participantStats[participantEmail].totalFees += feeAmount;

        // Step 3: Add the location (to count unique locations)
        participantStats[participantEmail].locations.add(location);

        // Step 4: Increment participation count
        participantStats[participantEmail].count += 1;
      });

      // Step 5: Convert the stats object to an array and sort by participation count
      const sortedParticipants = Object.keys(participantStats)
        .map((email) => ({
          email,
          ...participantStats[email],
        }))
        .sort((a, b) => b.count - a.count); // Sort by the number of times they participated

      // Step 6: Get the top 5 participants
      setTopParticipants(sortedParticipants.slice(0, 6));
    }
  }, [campData]);

  if (isLoading) {
    return <Loading height="screen"></Loading>;
  }

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }




  return (
    <div className="w-full md:w-10/12 mx-auto py-12">
      <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center text-[#4335A7]`}>
        Our Top Participants
      </h2>
      <p className="text-center text-lg text-[#4335A7] max-w-2xl mx-auto mb-16">
        Celebrating the outstanding contributions of our top participants!
      </p>

      <div
     
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topParticipants.map((participant, index) => (
         <div  data-aos="flip-left" key={participant.email}>
           <div
           
            className={`flex flex-col p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 ${
              darkMode ? "bg-gray-900 text-white" : "bg-white text-[#4335A7]"
            }`} // Conditional dark mode background and text color
          >
            <div className="flex items-center mb-4">
              {/* Conditionally render different icons based on position */}
              {index === 0 && (
                <FaTrophy className="text-[#4335A7] text-5xl mr-4" />
              )}
              {index === 1 && (
                <FaMedal className="text-[#4335A7] text-5xl mr-4" />
              )}
              {index === 2 && (
                <FaRegStar className="text-[#4335A7] text-5xl mr-4" />
              )}
              {index === 3 && (
                <RiMedal2Fill  className="text-[#4335A7] text-5xl mr-4"/>
              )}
              {index === 4 && (
                
                <BiMedal className="text-[#4335A7] text-5xl mr-4"/>
                
              )}
              {index === 5 && (
                
                
                <TfiMedall   className="text-[#4335A7] text-5xl mr-4"/>
                
              )}
              <h3 className="text-xl font-semibold">{participant.name.slice(0,25)}</h3>
            </div>

            <div className="flex items-center mb-2">
              <FaDollarSign className="text-[#4335A7] mr-2" />
              <p className="text-sm text-gray-600 mb-2">Total Camp Fees: {participant.totalFees} BDT</p>
            </div>

            <div className="flex items-center mb-2">
              <GiCampingTent className="text-[#4335A7] mr-2" />
              <p className="text-sm text-gray-600 mb-2">Total Participation Count: {participant.count}</p>
            </div>

            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-[#4335A7] mr-2" />
              <p className="text-sm text-gray-600">
                Number of Unique Locations: {participant.locations.size}
              </p>
            </div>
          </div>
         </div>
        ))}
      </div>
    </div>
  );
};

export default TopParticipants;
