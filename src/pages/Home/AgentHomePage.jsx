import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCreditCard, FaUserShield, FaHistory, FaEnvelope, FaPhone, FaWallet } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// Balance Card Component
const BalanceCard = ({ label, amount, showState, toggleShow }) => (
  <motion.div 
    className="bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] p-5 rounded-2xl shadow-lg flex justify-between items-center"
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center space-x-3">
      <MdOutlineAttachMoney className="text-green-500 text-4xl" />
      <span className="text-md md:text-lg font-semibold">{label}</span>
    </div>
    <div className="flex items-center">
      <span className={`text-md md:text-2xl font-bold text-[#1A237E] ${!showState ? "blur-md" : ""}`}>
        {amount} Taka
      </span>
      <button onClick={toggleShow} className="ml-3 text-gray-700 focus:outline-none">
        {showState ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
      </button>
    </div>
  </motion.div>
);

const AgentHomePage = ({ data }) => {
  const [showBalance, setShowBalance] = useState(false);
  const [showEarnings, setShowEarnings] = useState(false);
  const api = useAxiosSecure();



  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] shadow-2xl md:rounded-3xl px-2 py-6 md:p-10 backdrop-blur-lg mt-16 md:mt-32 md:mb-24">
      <motion.div 
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-3xl p-4 md:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl md:text-5xl font-extrabold text-[#90CAF9] text-center mb-8">
          Welcome, {data?.name} 🎉
        </h2>

        {/* Agent Info Card */}
        <motion.div 
          className="bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] p-6 rounded-2xl shadow-lg mb-6"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-500 text-xl md:text-3xl" />
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-md md:text-lg font-semibold">{data?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-green-500 text-xl md:text-3xl" />
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="text-md md:text-lg font-semibold">{data?.phone}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Balance & Earnings Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BalanceCard label="Account Balance" amount={data?.balance} showState={showBalance} toggleShow={() => setShowBalance(!showBalance)} />
          <BalanceCard label="Total Earnings" amount={data?.earnings} showState={showEarnings} toggleShow={() => setShowEarnings(!showEarnings)} />
        </div>

        {/* Agent Actions */}
        <motion.div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-6">
          {/* Cash-In for User */}
        
          <Link to="/cash-in-user">
            <motion.button 
              className="flex flex-col items-center justify-center bg-blue-300 text-blue-800   py-5 rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:text-white w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCreditCard className="text-xl md:text-3xl mb-2" />
              Cash-In for User
            </motion.button>
          </Link>

          <Link to="/balance-request">
            <motion.button 
              className="flex flex-col items-center justify-center bg-green-300 text-green-800   py-5 rounded-xl font-bold shadow-lg hover:bg-green-700 hover:text-white w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCreditCard className="text-xl md:text-3xl mb-2" />
              Request Balance
            </motion.button>
          </Link>


          <Link to="/withdraw-request">
            <motion.button 
              className="flex flex-col items-center justify-center bg-yellow-300 text-yellow-800   py-5 rounded-xl font-bold shadow-lg hover:bg-yellow-700 hover:text-white w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCreditCard className="text-xl md:text-3xl mb-2" />
              Withdraw Request
            </motion.button>
          </Link>

        

          {/* View Transactions */}
          <Link to="/transactions">
            <motion.button 
              className="flex flex-col items-center justify-center bg-black/80 text-white   py-5 rounded-xl font-bold shadow-lg hover:bg-black hover:text-white w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaHistory className="text-xl md:text-3xl mb-2" />
              View Transactions
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AgentHomePage;
