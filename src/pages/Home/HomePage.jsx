import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEye, FaEyeSlash, FaMoneyBillWave, FaCreditCard,
  FaExchangeAlt, FaHistory, FaUserShield, FaPhone, FaEnvelope
} from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { MdOutlineAttachMoney } from "react-icons/md";
import Swal from "sweetalert2";
import { useFirebaseAuth } from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import { motion } from "framer-motion";

const HomePage = () => {
  const { user } = useFirebaseAuth();
  const [showBalance, setShowBalance] = useState(false);
  const { data } = useGetUser();

  // User Data (Replace with API Call)
  const balance = data?.balance || 0;
  const earnings = data?.earnings || 0;
  const userName = data?.name || "User";
  const userEmail = data?.email || "user@example.com";
  const userPhone = data?.phone || "N/A";

  return (
    <div className="container mx-auto px-4 py-12 mt-12">
      <motion.div 
        className="max-w-5xl mx-auto bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] shadow-2xl rounded-3xl p-10 backdrop-blur-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-5xl font-extrabold text-white text-center mb-8">
          Welcome, {userName} 🎉
        </h2>

        {/* User Info Card */}
        <motion.div 
          className="bg-white/80 p-6 rounded-2xl shadow-lg mb-6"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-500 text-3xl" />
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-lg font-semibold">{userEmail}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-green-500 text-3xl" />
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="text-lg font-semibold">{userPhone}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Balance Section */}
        <motion.div 
          className="bg-white/80 p-6 rounded-2xl shadow-lg flex justify-between items-center mb-6"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center space-x-3">
            <MdOutlineAttachMoney className="text-green-500 text-4xl" />
            <span className="text-lg font-semibold">
              {data?.accountType === "User" ? "Account Balance" : "Total Earnings"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-[#1A237E]">
              {showBalance ? `${data?.accountType === "User" ? balance : earnings} Taka` : "******"}
            </span>
            <button onClick={() => setShowBalance(!showBalance)} className="ml-3 text-gray-700 focus:outline-none">
              {showBalance ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
            </button>
          </div>
        </motion.div>

        {/* User Actions */}
        {data?.accountType === "User" && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/send-money" className="w-full">
              <motion.button 
                className="flex flex-col items-center justify-center bg-blue-600 text-white p-5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition transform hover:scale-110 w-full"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExchangeAlt className="text-3xl mb-2 " />
                Send Money
              </motion.button>
            </Link>
            <Link to="/cash-in">
              <motion.button 
                className="flex flex-col items-center justify-center bg-green-600 text-white p-5 rounded-xl font-bold shadow-lg hover:bg-green-700 transition transform hover:scale-110 w-full"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMoneyBillWave className="text-3xl mb-2" />
                Cash-In
              </motion.button>
            </Link>
            <Link to="/cash-out">
              <motion.button 
                className="flex flex-col items-center justify-center bg-red-600 text-white p-5 rounded-xl font-bold shadow-lg hover:bg-red-700 transition transform hover:scale-110 w-full"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiBankFill className="text-3xl mb-2" />
                Cash-Out
              </motion.button>
            </Link>
            <Link to="/transactions">
              <motion.button 
                className="flex flex-col items-center justify-center bg-gray-900 text-white p-5 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition transform hover:scale-110 w-full"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHistory className="text-3xl mb-2" />
                View Transactions
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Agent Actions */}
        {data?.accountType === "Agent" && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/cash-in-user">
              <motion.button 
                className="flex flex-col items-center justify-center bg-blue-600 text-white py-5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition transform hover:scale-110"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCreditCard className="text-3xl mb-2" />
                Cash-In for User
              </motion.button>
            </Link>
            <Link to="/request-balance">
              <motion.button 
                className="flex flex-col items-center justify-center bg-green-600 text-white py-5 px-10 rounded-xl font-bold shadow-lg hover:bg-green-700 transition transform hover:scale-110"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUserShield className="text-3xl mb-2" />
                Request Balance Recharge
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HomePage;
