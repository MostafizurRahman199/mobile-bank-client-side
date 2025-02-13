// import React from "react";
// import { FaUtensils, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
// import { FaClipboardList, FaStar, FaCalendarAlt, FaMoneyCheckAlt } from "react-icons/fa";
// import { useFirebaseAuth } from "../../../hooks/useAuth";

// const UserHome = () => {

// const {user} = useFirebaseAuth();
// const userName = user?.displayName;
// const userImage = user?.photoURL;



//   return (
//     <div className="w-full p-4 md:p-8 bg-gray-50">
//       {/* Welcome Section */}
//       <h2 className="text-xl md:text-2xl font-bold mb-6 new_heading_font">Hi, Welcome Back!</h2>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//         {/* Menu Card */}
//         <div className="flex flex-row gap-4 items-center justify-center bg-gradient-to-r from-purple-500 to-gray-100 rounded-lg p-4">
//           <FaUtensils className="text-5xl text-purple-700 mb-2" />
//           <div>
//           <p className="text-4xl font-bold text-purple-700">205</p>
//           <p className="text-2xl font-medium">Menu</p>
//           </div>
//         </div>

//         {/* Shop Card */}
//         <div className="flex flex-row gap-4 items-center justify-center bg-gradient-to-r from-[#D1A054] to-gray-100 rounded-lg p-4">
//           <FaShoppingCart className="text-5xl text-yellow-800 mb-2" />
//           <div>
//           <p className="text-4xl font-bold text-yellow-800">103</p>
//           <p className="text-2xl font-medium">Shop</p>
//           </div>
//         </div>

//         {/* Contact Card */}
//         <div className="flex flex-row gap-4 items-center justify-center bg-gradient-to-r from-pink-200 to-gray-100 rounded-lg p-4">
//           <FaPhoneAlt className="text-5xl text-pink-700 mb-2" />
//           <div>
//           <p className="text-4xl font-bold text-pink-700">03</p>
//           <p className="text-2xl font-medium">Contact</p>
//           </div>
//         </div>
//       </div>

//       {/* User Info and Activities */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {/* User Info */}
//         <div className="bg-orange-100 p-12 rounded-lg flex flex-col gap-4 items-center justify-center text-center">
//           <div className="w-24 h-24 rounded-full border-4 border-orange-400 mb-4">
//            {
//             user &&  <img src={userImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtF3o2PvqxOMHgdrpj_YRItsLBjxyTeNZu_Q&s"} className="rounded-full" alt="" />
//            }
//           </div>
//           <p className="text-2xl font-bold new_heading_font text-2xl md:text-4xl">{userName}</p>
//         </div>

//         {/* Activities */}
//         <div className="bg-yellow-100 p-12 rounded-lg new_heading_font">
//           <h3 className=" font-bold mb-4 text-2xl md:text-4xl">Your Activities</h3>
//           <ul className="space-y-2">
//             <li className="flex text-blue-500 items-center space-x-2 text-2xl">
//               <FaClipboardList className="text-blue-500" />
//               <span className="text-blue-500 font-medium ">Orders: </span> 6
//             </li>
//             <li className="flex text-yellow-500 items-center space-x-2 text-2xl">
//               <FaStar className="text-yellow-500" />
//               <span className="text-yellow-500 font-medium ">Reviews: </span> 2
//             </li>
//             <li className="flex text-orange-500 items-center space-x-2 text-2xl">
//               <FaCalendarAlt className="text-orange-500" />
//               <span className="text-orange-500 font-medium ">Bookings: </span> 1
//             </li>
//             <li className="flex text-red-500  items-center space-x-2 text-2xl">
//               <FaMoneyCheckAlt className="text-red-500" />
//               <span className="text-red-500 font-medium ">Payment: </span> 3
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserHome;



import React from "react";
import { FaUtensils, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { FaClipboardList, FaStar, FaCalendarAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { useFirebaseAuth } from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useFirebaseAuth();
  const userName = user?.displayName;
  const userImage = user?.photoURL;

  return (
    <div className="w-full p-6 md:p-12 bg-gray-50">
      {/* Welcome Section */}
      <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-800 new_heading_font">Hi, Welcome Back!</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Menu Card */}
        <div className="flex items-center bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-lg shadow-md p-6">
          <FaUtensils className="text-6xl mr-4" />
          <div>
            <p className="text-4xl font-bold">205</p>
            <p className="text-xl">Menu</p>
          </div>
        </div>

        {/* Shop Card */}
        <div className="flex items-center bg-gradient-to-r from-yellow-600 to-yellow-400 text-white rounded-lg shadow-md p-6">
          <FaShoppingCart className="text-6xl mr-4" />
          <div>
            <p className="text-4xl font-bold">103</p>
            <p className="text-xl">Shop</p>
          </div>
        </div>

        {/* Contact Card */}
        <div className="flex items-center bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-lg shadow-md p-6">
          <FaPhoneAlt className="text-6xl mr-4" />
          <div>
            <p className="text-4xl font-bold">03</p>
            <p className="text-xl">Contact</p>
          </div>
        </div>
      </div>

      {/* User Info and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Info */}
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <div className="w-28 h-28 mx-auto rounded-full border-4 border-orange-400 mb-4 overflow-hidden">
            {user && (
              <img
                src={
                  userImage ||
                  "https://via.placeholder.com/150"
                }
                alt="User"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <p className="text-xl font-semibold text-gray-800">{userName || "Guest User"}</p>
        </div>

        {/* Activities */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Activities</h3>
          <ul className="space-y-4">
            <li className="flex items-center text-xl">
              <FaClipboardList className="text-blue-500 text-3xl mr-4" />
              <span className="text-gray-700">Orders: <span className="font-bold">6</span></span>
            </li>
            <li className="flex items-center text-xl">
              <FaStar className="text-yellow-500 text-3xl mr-4" />
              <span className="text-gray-700">Reviews: <span className="font-bold">2</span></span>
            </li>
            <li className="flex items-center text-xl">
              <FaCalendarAlt className="text-orange-500 text-3xl mr-4" />
              <span className="text-gray-700">Bookings: <span className="font-bold">1</span></span>
            </li>
            <li className="flex items-center text-xl">
              <FaMoneyCheckAlt className="text-red-500 text-3xl mr-4" />
              <span className="text-gray-700">Payment: <span className="font-bold">3</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
