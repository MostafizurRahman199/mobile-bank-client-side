import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";


import useGetUser from "../hooks/useGetUser";
import { useFirebaseAuth } from "../hooks/useAuth";

const getProfileImage = (user) => {
  return user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
};

const Profile = () => {
  const { data, refetch } = useGetUser();
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000 });
    refetch();
  }, []);

  const handleUpdateClick = () => {
    navigate("/update-profile");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-11/12 md:w-8/12 lg:w-6/12 bg-white shadow-xl rounded-2xl p-8 transform transition-transform duration-500" data-aos="zoom-in">
        
        {/* Profile Section */}
        <div className="relative mt-6 flex flex-col items-center justify-center">
          
          {/* Profile Picture */}
          <div className="w-fit mx-auto p-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full shadow-lg">
            <img
              src={getProfileImage(user)}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          {/* User Details */}
          <div className="text-center mt-8 space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">{data?.name || "User"}</h2>
            <p className="text-lg text-gray-700">{user?.email}</p>
            <p className="text-sm text-gray-500">Joined: {new Date(data?.createdAt).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Phone: {data?.phone || "N/A"}</p>
            
            {/* Show balance & earnings if the user is an Agent */}
            {data?.accountType === "Agent" && (
              <div className="mt-4 space-y-1 text-gray-700">
                <p className="text-lg font-semibold">Balance: <span className="text-blue-600">{data?.balance || 0} Taka</span></p>
                <p className="text-lg font-semibold">Earnings: <span className="text-green-600">{data?.earnings || 0} Taka</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleUpdateClick}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
