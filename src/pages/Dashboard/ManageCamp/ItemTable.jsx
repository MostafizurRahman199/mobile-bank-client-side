

import React, { useState } from 'react';
import Pagination from '../../../components/Pagination/Pagination';
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import Aos from "aos";
import { useEffect } from 'react';

const ItemTable = ({ campData, handleModalOpen, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');

  const totalPages = Math.ceil(campData.length / itemsPerPage);

  const filteredData = campData.filter(
    (item) =>
      item?.campName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.dateTime?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.healthcareProfessional?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

if(campData?.length == 0){
  return  <NotFound title='No Camp Found' link='/dashboard/add-a-camp' buttonText='Add Camp'></NotFound>
}


useEffect(() => {
  Aos.init({ duration: 1000, once: true });
}, []);


  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6 my-8">
      <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-[#4335a7]">
          Total Camps: {filteredData.length}
        </h2>
        <input
          type="text"
          placeholder="Search Camps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4"
        />
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table
        
        className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#4335A7] text-white font-normal">
              <th className="py-2 px-4 text-center">No.</th>
              <th className="py-2 px-4 text-center">Camp Name</th>
              <th className="py-2 px-4 text-center">Date & Time</th>
              <th className="py-2 px-4 text-center">Location</th>
              <th className="py-2 px-4 text-center">Fees</th>
              <th className="py-2 px-4 text-center">Healthcare Prof.</th>
              <th className="py-2 px-4 text-center">Edit</th>
              <th className="py-2 px-4 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
              
    
              key={item._id} className="border-b hover:bg-gray-100">
                <td className="text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-4 px-4 text-center">{item.campName}</td>
                <td className="py-4 px-4 text-center">
                  {new Date(item.dateTime).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </td>
                <td className="py-4 px-4 text-center">{item.location}</td>
                <td className="py-4 px-4 text-center">{item.campFees}</td>
                <td className="py-4 px-4 text-center">{item.healthcareProfessional}</td>
                <td className="py-4 px-4 text-center ">
                 <button
                  onClick={() => handleModalOpen(item)}
                  className="bg-[#4335A7] btn hover:bg-[#5544d9] text-xl text-white"
                >
          
                 <FaRegEdit />
                </button>
              </td>
              <td className="py-4 px-4 text-center">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 btn hover:bg-red-800"
                >
                  <FaTrashAlt size={18} className="text-white" />
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    <div className="block md:hidden">
    {paginatedData?.map((item, index) => (
      <div
        key={item._id}
        className="flex flex-col bg-gray-100 p-4 mb-4 rounded-lg shadow-sm"
      >
        <div className="flex flex-col sm:flex sm:flex-row gap-4 items-center mb-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full">
            <img
              src={item.imageUrl }
              alt={item.campName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-800  text-center break-word">
              {item.campName}
            </h3>
            <p className="text-gray-600 text-center">{item.healthcareProfessional}</p>
            <p className="text-gray-600 text-center">{item.location}</p>
            <p className="text-gray-600  text-center">{item.campFees} Taka</p>
            {/* <p className="text-gray-600 text-center">{item.dateTime}</p> */}
            <div className="text-gray-600 text-center flex items-center justify-center gap-2">
                 <SlPeople />
               <p> : {item.participantCount}</p>
                
                </div>
          </div>
          <div className="text-right text-lg font-semibold text-gray-800">
           
          </div>
         <div className="flex items-center gap-2">
         <div>
         <button
                  onClick={() => handleModalOpen(item)}
                  className="bg-[#4335a7] hover:bg-[#5544d9] btn  text-xl text-white"
                >
          
                 <FaRegEdit />
                </button>
          </div>
          <div>
          <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 p-3 rounded-lg hover:bg-red-800"
              >
                <FaTrashAlt size={18} className="text-white" />
              </button>
          </div>
         </div>
        </div>
      </div>
    ))}
  </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ItemTable;
