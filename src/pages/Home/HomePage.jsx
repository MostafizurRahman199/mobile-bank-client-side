


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaEye, FaEyeSlash, FaMoneyBillWave, FaCreditCard,
//   FaExchangeAlt, FaHistory, FaUserShield, FaPhone, FaEnvelope
// } from "react-icons/fa";
// import { RiBankFill } from "react-icons/ri";
// import { MdOutlineAttachMoney } from "react-icons/md";
// import { useFirebaseAuth } from "../../hooks/useAuth";
// import useGetUser from "../../hooks/useGetUser";
// import { motion } from "framer-motion";

// const BalanceCard = ({ label, amount, showState, toggleShow }) => (
//   <motion.div 
//     className="bg-white/80 p-5 rounded-2xl shadow-lg flex justify-between items-center "
//     whileHover={{ scale: 1.03 }}
//     transition={{ type: "spring", stiffness: 300 }}
//   >
//     <div className="flex items-center space-x-3">
//       <MdOutlineAttachMoney className="text-green-500 text-4xl" />
//       <span className="text-lg font-semibold">{label}</span>
//     </div>
//     <div className="flex items-center">
//       <span className={`text-2xl font-bold text-[#1A237E] ${!showState ? "blur-md" : ""}`}>
//         {amount} Taka
//       </span>
//       <button onClick={toggleShow} className="ml-3 text-gray-700 focus:outline-none">
//         {showState ? <FaEye size={24} /> :<FaEyeSlash size={24} />  }
//       </button>
//     </div>
//   </motion.div>
// );

// const ActionButton = ({ to, bgColor, icon, text }) => (
//   <Link to={to}>
//     <motion.button 
//       className={`flex flex-col items-center justify-center ${bgColor} text-white py-5 rounded-xl font-bold shadow-lg hover:scale-110 w-full`}
//       whileHover={{ scale: 1.03 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       {icon}
//       <span className="text-lg">{text}</span>
//     </motion.button>
//   </Link>
// );

// const HomePage = () => {
//   const { user } = useFirebaseAuth();
//   const { data } = useGetUser();

//   // Balance Blur State
//   const [showBalance, setShowBalance] = useState(false);
//   const [showEarnings, setShowEarnings] = useState(false);

//   // User Data
//   const balance = data?.balance || 0;
//   const earnings = data?.earnings || 0;
//   const userName = data?.name || "User";
//   const userEmail = data?.email || "user@example.com";
//   const userPhone = data?.phone || "N/A";

//   return (
//     <div className="container mx-auto px-4 py-12 mt-12">
//       <motion.div 
//         className="max-w-5xl mx-auto bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] shadow-2xl rounded-3xl p-10 backdrop-blur-lg"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <h2 className="text-5xl font-extrabold text-white text-center mb-8">
//           Welcome, {userName} 🎉
//         </h2>

//         {/* User Info Card */}
//         <motion.div 
//           className="bg-white/80 p-6 rounded-2xl shadow-lg mb-6"
//           whileHover={{ scale: 1.03 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="flex items-center space-x-4">
//               <FaEnvelope className="text-blue-500 text-3xl" />
//               <div>
//                 <p className="text-gray-500 text-sm">Email</p>
//                 <p className="text-lg font-semibold">{userEmail}</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <FaPhone className="text-green-500 text-3xl" />
//               <div>
//                 <p className="text-gray-500 text-sm">Phone</p>
//                 <p className="text-lg font-semibold">{userPhone}</p>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Balance & Earnings Section (Agent) */}
//         {data?.accountType === "Agent" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <BalanceCard label="Account Balance" amount={balance} showState={showBalance} toggleShow={() => setShowBalance(!showBalance)} />
//             <BalanceCard label="Total Earnings" amount={earnings} showState={showEarnings} toggleShow={() => setShowEarnings(!showEarnings)} />
//           </div>
//         )}

//         {/* User Actions */}
//         {data?.accountType === "User" && (
//           <motion.div className="grid grid-cols-2 md:grid-cols-2 gap-6">
//             <BalanceCard label="Account Balance" amount={balance} showState={showBalance} toggleShow={() => setShowBalance(!showBalance)} />
//             <ActionButton to="/send-money" bgColor="bg-blue-600 hover:bg-blue-700" icon={<FaExchangeAlt className="text-3xl mb-2" />} text="Send Money" />
//             <ActionButton to="/cash-out" bgColor="bg-red-600 hover:bg-red-700" icon={<RiBankFill className="text-3xl mb-2" />} text="Cash-Out" />
//             <ActionButton to="/transactions" bgColor="bg-gray-900 hover:bg-gray-800" icon={<FaHistory className="text-3xl mb-2" />} text="View Transactions" />
//           </motion.div>
//         )}

//         {/* Agent Actions */}
//         {data?.accountType === "Agent" && (
//           <motion.div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-4">
//             <ActionButton to="/cash-in-user" bgColor="bg-blue-600 hover:bg-blue-700" icon={<FaCreditCard className="text-3xl mb-2" />} text="Cash-In for User" />
//             <ActionButton to="/request-balance" bgColor="bg-green-600 hover:bg-green-700" icon={<FaUserShield className="text-3xl mb-2" />} text="Request Balance" />
//             <ActionButton to="/transactions" bgColor="bg-gray-900 hover:bg-gray-800" icon={<FaHistory className="text-3xl mb-2" />} text="View Transactions" />
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default HomePage;



import React from "react";
import { useFirebaseAuth } from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import UserHomePage from "./UserHomePage";
import AgentHomePage from "./AgentHomePage";

const HomePage = () => {
  const { data } = useGetUser();

  return (
    <>
      {data?.accountType === "User" ? <UserHomePage data={data} /> : <AgentHomePage data={data} />}
    </>
  );
};

export default HomePage;

