import React from 'react'
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { Button } from "@material-tailwind/react";


const ItemTable = ({ menuData, handleModalOpen, handleDelete }) => {



  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6 my-8">
    <div className="flex justify-between items-center border-b pb-4 mb-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Total Users: {menuData.length}
      </h2>
    </div>

    {/* Users Table */}
    <div className="hidden md:block overflow-x-auto md:h-[300px] lg:h-[400px] overflow-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#D1A054] text-white font-normal">
            <th className="py-2 px-4 text-center">No.</th>
            <th className="py-2 px-4 text-center">Image</th>
            <th className="py-2 px-4 text-center">Name</th>
            <th className="py-2 px-4 text-center">Category</th>
            <th className="py-2 px-4 text-center">Price</th>
            <th className="py-2 px-4 text-center ">Edit</th>
            <th className="py-2 px-4 text-center ">Delete</th>
         
          </tr>
        </thead>
        <tbody>
          {menuData?.map((item, index) => (
            <tr key={item._id}
          
            className="border-b hover:bg-gray-100">
              <td className="text-center">{index + 1}</td>
              <td className="py-4 px-4 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-lg">
                  <img
                    src={item.image || item.imageUrls[0]                        }
                    alt={item.name}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
              </td>
              <td className="py-4 px-4 text-center">{item.name}</td>
              <td className="py-4 px-4 text-center">{item.category}</td>
              <td className="py-4 px-4 text-center">{item.price}</td>
             
              <td className="py-4 px-4 text-center ">
              <button
                  onClick={() => handleModalOpen(item)}
                  className="bg-[#d1a054] btn hover:bg-[#d68916] text-xl text-white"
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
    {menuData?.map((item, index) => (
      <div
        key={item._id}
        className="flex flex-col bg-gray-100 p-4 mb-4 rounded-lg shadow-sm"
      >
        <div className="flex flex-col sm:flex sm:flex-row gap-4 items-center mb-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full">
            <img
              src={item.image || item.imageUrls[0]}
              alt={item.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-800  text-center break-word">
              {item.name}
            </h3>
            <p className="text-gray-600  text-center">{item.price} Taka</p>
            <p className="text-gray-600 text-center">{item.category}</p>
          </div>
          <div className="text-right text-lg font-semibold text-gray-800">
           
          </div>
         <div className="flex items-center gap-2">
         <div>
         <button
                  onClick={() => handleModalOpen(item)}
                  className="bg-[#d1a054] btn hover:bg-[#d68916] text-xl text-white"
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


  </div>
  )
}

export default ItemTable