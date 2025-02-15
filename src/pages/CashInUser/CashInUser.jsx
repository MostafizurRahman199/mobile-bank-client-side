import React, { useState } from "react";
import { useFirebaseAuth } from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaMoneyBillWave, FaPhone, FaLock } from "react-icons/fa";

const CashInUser = () => {
  const { user } = useFirebaseAuth();
  const { data, refetch } = useGetUser();
  const [userPhone, setUserPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const api = useAxiosSecure();

  const agentBalance = data?.balance || 0;

  // Handle Cash-In Transaction
  const handleCashIn = async (e) => {
    e.preventDefault();

    if (!userPhone || userPhone.length < 5) {
      return Swal.fire("Error", "Enter a valid user phone number!", "error");
    }
    if (!amount || amount < 1) {
      return Swal.fire("Error", "Minimum cash-in amount is 1 Taka!", "error");
    }
    if (!pin || pin.length !== 5) {
      return Swal.fire("Error", "Enter a valid 5-digit PIN!", "error");
    }
    if (amount > agentBalance) {
      return Swal.fire("Error", "Insufficient balance!", "error");
    }

    setLoading(true);

    try {
      const response = await api.post(`/cash-in-user`, {
        agentEmail: user.email,
        userPhone,
       
        amount: parseFloat(amount),
        pin,
      });

      if (response.data.success) {
        Swal.fire("Success", `Cash-in of ${amount} Taka successful!`, "success");
        refetch();
        setUserPhone("");
        setAmount("");
        setPin("");
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Cash-in transaction failed!", "error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full md:w-10/12 flex justify-center items-center mx-auto px-4 py-12 mt-12">
      <motion.div 
        className="w-full sm:w-8/12 md:w-6/12 mx-auto bg-white shadow-lg rounded-2xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-[#4335a7] text-center mb-6">Cash-In for User</h2>

        {/* Balance Display */}
        <div className="mb-4 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600 text-lg">Your Available Balance</p>
          <p className="text-2xl font-bold text-[#4335a7]">{agentBalance} Taka</p>
        </div>

        {/* Form */}
        <form onSubmit={handleCashIn} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="User Phone Number"
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335a7]"
            />
            <FaPhone className="absolute right-4 top-4 text-gray-400 text-lg" />
          </div>

          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Cash-In Amount"
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335a7]"
            />
            <FaMoneyBillWave className="absolute right-4 top-4 text-green-500 text-lg" />
          </div>

          <div className="relative">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter 5-digit PIN"
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335a7]"
            />
            <FaLock className="absolute right-4 top-4 text-gray-400 text-lg" />
          </div>

          <motion.button
            type="submit"
            className={`w-full text-white font-bold py-3 rounded-lg transition ${
              loading ? "bg-gray-400" : "bg-[#4335a7] hover:bg-[#5544d9]"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? "Processing..." : "Cash-In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CashInUser;
