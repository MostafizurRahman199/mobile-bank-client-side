import React, { useState } from "react";
import { useFirebaseAuth } from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaMoneyBillWave, FaPhone, FaLock, FaCalculator } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CashOut = () => {
  const { user } = useFirebaseAuth();
  const { data, refetch } = useGetUser();
  const [agentPhone, setAgentPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const api = useAxiosSecure();

  const balance = data?.balance || 0;

  // Calculate cash-out fee dynamically
  const cashOutFee = amount ? (amount * 1.5) / 100 : 0;
  const totalDeduction = amount ? parseFloat(amount) + cashOutFee : 0;
 

  // Handle Cash-Out Transaction
  const handleCashOut = async (e) => {
    e.preventDefault();

    if (!agentPhone || agentPhone.length < 5) {
      return Swal.fire("Error", "Enter a valid agent phone number!", "error");
    }
    if (!amount || amount < 1) {
      return Swal.fire("Error", "Minimum cash-out amount is 1 Taka!", "error");
    }
    if (!pin || pin.length !== 5) {
      return Swal.fire("Error", "Enter a valid 5-digit PIN!", "error");
    }
    if (totalDeduction > balance) {
      return Swal.fire("Error", "Insufficient balance!", "error");
    }

    setLoading(true);

    try {
      const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/cash-out`, {
        userEmail: user.email,
        agentPhone,
        amount: parseFloat(amount),
        pin,
      });

      if (response.data.success) {
        Swal.fire("Success", `Cash-out of ${parseFloat(amount).toFixed(2)} Taka successful!`, "success");
        refetch();
        setAgentPhone("");
        setAmount("");
        setPin("");
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Cash-out transaction failed!", "error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-10/12 flex justify-center items-center mx-auto px-4 py-12 mt-8">
      <motion.div 
        className="w-6/12 mx-auto bg-white shadow-lg rounded-2xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-[#4335a7] text-center mb-6">Cash-Out</h2>

        {/* Balance Display */}
        <div className="mb-4 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600 text-lg">Available Balance</p>
          <p className="text-2xl font-bold text-[#4335a7]">{balance.toFixed(2)} Taka</p>
        </div>

        {/* Form */}
        <form onSubmit={handleCashOut} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={agentPhone}
              onChange={(e) => setAgentPhone(e.target.value)}
              placeholder="Agent Phone Number"
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335a7]"
            />
            <FaPhone className="absolute right-4 top-4 text-gray-400 text-lg" />
          </div>

          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Cash-Out Amount"
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

          {/* Transaction Fee & Total Amount */}
          {amount && (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
                <FaCalculator className="text-red-500" />
                Transaction Fee: <span className="font-bold text-red-500">{cashOutFee.toFixed(2)} Taka</span>
              </p>
              <p className="text-gray-700 text-xl font-bold">
                Total Deduction: <span className="text-[#4335a7]">{totalDeduction.toFixed(2)} Taka</span>
              </p>
              {/* <p className="text-gray-700 text-xl font-bold">
                You Will Receive: <span className="text-green-500">{userReceives.toFixed(2)} Taka</span>
              </p> */}
            </div>
          )}

          <motion.button
            type="submit"
            className={`w-full text-white font-bold py-3 rounded-lg transition ${
              loading ? "bg-gray-400" : "bg-[#4335a7] hover:bg-[#5544d9]"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? "Processing..." : "Cash-Out"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CashOut;
