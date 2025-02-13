import React from 'react'
import { GrEmoji } from "react-icons/gr";
import { Link } from 'react-router-dom';

const NotFound = ({title="Not Found", link="/", buttonText="Back To Home"}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="flex flex-col items-center">
      <GrEmoji  className="text-gray-400 text-6xl mb-4"/>
      <p className="text-lg md:text-xl text-gray-700 font-medium">{title}</p>
      <Link to={`${link}`}
        className="mt-4 px-6 py-2 bg-[#4335A7] text-white rounded-lg shadow-md font-semibold hover:bg-[#5544d9] transition-all"
      >
        {buttonText}
      </Link>
    </div>
  </div>
  )
}

export default NotFound