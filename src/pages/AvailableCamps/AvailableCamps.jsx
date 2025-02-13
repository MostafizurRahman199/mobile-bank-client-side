


import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserMd, FaUsers, FaDollarSign } from 'react-icons/fa';
import Pagination from '../../components/Pagination/Pagination';
import useCamp from '../../hooks/useCamp';
import { BsLayoutThreeColumns } from "react-icons/bs";
import { TfiLayoutColumn2 } from "react-icons/tfi";
import { useDarkMode } from '../../Context/DarkModeContext';
import Aos from "aos";

const AvailableCamps = () => {

const {darkMode} = useDarkMode();
const {campData, isLoading, isError, error } = useCamp();
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('alphabetical');
  const [layout, setLayout] = useState('three'); // Layout state

  const totalPages = Math.ceil((campData?.length || 0) / itemsPerPage);

  const filteredData = campData?.filter(
    (camp) =>
      camp?.campName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp?.dateTime?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp?.healthcareProfessional?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortCriteria === 'mostRegistered') {
      return (b?.participantCount || 0) - (a?.participantCount || 0);
    } else if (sortCriteria === 'campFees') {
      return (a?.campFees || 0) - (b?.campFees || 0);
    } else if (sortCriteria === 'alphabetical') {
      return (a?.campName || '').localeCompare(b?.campName || '');
    }
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Determine layout class
  const layoutClass =
    layout === 'three'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'grid grid-cols-1 sm:grid-cols-2 gap-6';


  useEffect(() => {
    Aos.init({ duration: 1000,  });
  }, []);


  return (
    <div className="w-full md:w-10/12 mx-auto  p-6  my-16">
         <h1 className="text-3xl font-bold text-center text-[#4335A7] mb-8">
        Available Camps
     </h1>
      <div className="flex flex-col sm:flex-row justify-between items-center pb-4 mb-4 gap-4">
        
        <div className='flex flex-wrap gap-2 justify-center'>
        <input
          type="text"
          placeholder="Search Camps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${darkMode ? "bg-black border-gray-300  text-white": "text-black border-[#5544d9]" } border  rounded-md py-2 px-4 text-black`} />

        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className={`${darkMode ? "bg-black border-gray-300  text-white": "text-black border-[#5544d9]" }  border  rounded-md py-2 px-4 k`}
        >
          <option value="alphabetical">Alphabetical Order</option>
          <option value="mostRegistered">Most Registered</option>
          <option value="campFees">Camp Fees</option>
        </select>

        </div>
        <button
          onClick={() => {
            setLayout(layout === 'three' ? 'two' : 'three')
            setItemsPerPage(layout === 'three' ? 8 : 9)

          }}
          className="bg-[#4335A7] text-white py-2 px-4 rounded-md transition-all duration-300"
        >
          {layout === 'three' ? <><TfiLayoutColumn2 />
            </> : <><BsLayoutThreeColumns /></>}
        </button>
      </div>

      <div
      
      data-aos="zoom-in-up"
      className={layoutClass}>
        {paginatedData.map((camp) => (
          <div
            key={camp?._id}
            className={`${
              darkMode ? 'bg-gray-900 text-white' : 'bg-white text-[#4335A7]'
            }  rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 p-4 flex flex-col justify-between`}
          >
            <img
              src={camp?.imageUrl}
              alt={camp?.campName}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-[#5544d9] mb-4 text-start">
                {camp?.campName}
              </h2>
             <div className='flex flex-wrap items-center gap-2'>
             <p className="text-gray-700 text-sm mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-[#4335A7]" />
                {new Date(camp?.dateTime).toLocaleString('en-US', {
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
                {camp?.location}
              </p>
              <p className="text-gray-700 text-sm mb-2 flex items-center">
                <FaUserMd className="mr-2 text-[#4335A7]" />
                {camp?.healthcareProfessional}
              </p>
              <p className="text-gray-700 text-sm mb-2 flex items-center">
                <FaUsers className="mr-2 text-[#4335A7]" />
                {camp?.participantCount || 0} Participants
              </p>
              <p className="text-gray-700 text-sm mb-2 flex items-center">
                <FaDollarSign className="mr-2 text-[#4335A7]" />
                {camp?.campFees || 0} BDT
              </p>
             </div>
            </div>
          <div className='flex w-full justify-center'>
          <Link
              to={`/camp-details/${camp?._id}`}
              className="bg-gradient-to-r from-[#4335A7] to-[#5544d9] text-white py-2 px-8 rounded-2xl font-semibold  hover:scale-105 transition-transform duration-300 text-center w-fit"
            >
              See Details
            </Link>
          </div>
          </div>
        ))}
      </div>

      {searchQuery === '' && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AvailableCamps;
