import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiBankFill } from "react-icons/ri";
import { MdOutlineAttachMoney } from "react-icons/md";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash,  FaHistory,FaExchangeAlt, FaEnvelope, FaPhone, } from "react-icons/fa";

// Balance Card Component
const BalanceCard = ({ label, amount, showState, toggleShow }) => (
  <motion.div 
    className="bg-white/80 p-5 rounded-2xl shadow-lg flex justify-between items-center"
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center space-x-3">
      <MdOutlineAttachMoney className="text-green-500 text-4xl" />
      <span className="text-lg font-semibold">{label}</span>
    </div>
    <div className="flex items-center">
      <span className={`text-2xl font-bold text-[#1A237E] ${!showState ? "blur-md" : ""}`}>
        {amount} Taka
      </span>
      <button onClick={toggleShow} className="ml-3 text-gray-700 focus:outline-none">
        {showState ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
      </button>
    </div>
  </motion.div>
);

const UserHomePage = ({ data }) => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 mt-12">
      <motion.div 
        className="max-w-5xl mx-auto bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] shadow-2xl rounded-3xl p-10 backdrop-blur-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-5xl font-extrabold text-white text-center mb-8">
          Welcome, {data?.name} 🎉
        </h2>

        <motion.div 
                  className="bg-white p-6 rounded-2xl shadow-lg mb-6"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4">
                      <FaEnvelope className="text-blue-500 text-3xl" />
                      <div>
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="text-lg font-semibold">{data?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FaPhone className="text-green-500 text-3xl" />
                      <div>
                        <p className="text-gray-500 text-sm">Phone</p>
                        <p className="text-lg font-semibold">{data?.phone}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
        


        {/* User Actions */}
        <motion.div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-6">
        {/* Balance Card */}
        <BalanceCard 
          label="Account Balance"
          amount={data?.balance}
          showState={showBalance}
          toggleShow={() => setShowBalance(!showBalance)}
        />
          <Link to="/send-money">
            <motion.button 
              className="flex flex-col items-center justify-center bg-blue-600 text-white p-5 rounded-xl font-bold shadow-lg hover:bg-blue-700 w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaExchangeAlt className="text-3xl mb-2" />
              Send Money
            </motion.button>
          </Link>

          <Link to="/cash-out">
            <motion.button 
              className="flex flex-col items-center justify-center bg-red-600 text-white p-5 rounded-xl font-bold shadow-lg hover:bg-red-700 w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <RiBankFill className="text-3xl mb-2" />
              Cash-Out
            </motion.button>
          </Link>

          <Link to="/transactions">
            <motion.button 
              className="flex flex-col items-center justify-center bg-gray-900 text-white p-5 rounded-xl font-bold shadow-lg hover:bg-gray-800 w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaHistory className="text-3xl mb-2" />
              View Transactions
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserHomePage;
