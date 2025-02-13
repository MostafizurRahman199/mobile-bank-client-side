

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import Lottie from "lottie-react";
import { useFirebaseAuth } from "../hooks/useAuth";
import { useDarkMode } from "../Context/DarkModeContext";
import useGetUser from "../hooks/useGetUSer";
import updatePic from "../../public/updatePic.png";  // Add your custom image

const getProfileImage = (user) => {
  return (
    user?.photoURL ||
    user?.providerData?.[0]?.photoURL ||
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
};

const Profile = () => {
  const { data, refetch } = useGetUser();
  const { darkMode } = useDarkMode();
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000 });
    refetch();
  }, []);

  const handleUpdateClick = () => {
    navigate("/dashboard/update-profile");
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div
        className={`w-11/12 md:w-8/12 lg:w-6/12 shadow-2xl rounded-2xl p-8 transform transition-transform duration-500 ${
          darkMode ? "bg-black text-white" : "bg-white text-gray-800"
        }`}
        data-aos="zoom-in"
      >
        {/* Profile Section */}
        <div className="relative mt-6 flex flex-col items-center justify-center">
          {/* Profile Picture */}
          <div className="w-fit mx-auto p-1 bg-gradient-to-r from-[#4335A7] to-[#5544d9] rounded-full shadow-lg">
            <img
              src={getProfileImage(user)}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          {/* User Details */}
          <div className="text-center mt-8 space-y-2">
            <h2 className="text-3xl font-bold">{user?.displayName}</h2>
            <p className="text-lg">{user?.email}</p>
            <p className="text-sm text-gray-500">Joined on {new Date(data?.createAt).toLocaleDateString()}</p>
            <p className="text-sm">{data?.contactNumber ? `Contact: ${data?.contactNumber}` : "Contact: N/A"}</p>
            <p className="text-sm">{data?.address ? `Address: ${data?.address}` : "Address: N/A"}</p>
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleUpdateClick}
            className="bg-gradient-to-r from-[#4335A7] to-[#5544d9] text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
