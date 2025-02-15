// import React, { useState } from "react";
// import { useFirebaseAuth } from "../../../hooks/useAuth";
// import useGetUser from "../../../hooks/useGetUser";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { FaMoneyBillWave, FaPhone } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const SendMoney = () => {
//   const { user } = useFirebaseAuth();
//   const { data, refetch } = useGetUser();
//   const [phone, setPhone] = useState("");
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const api = useAxiosSecure();

//   // User Balance
//   const balance = data?.balance || 0;

//   // Transaction Handler
//   const handleSendMoney = async (e) => {
//     e.preventDefault();

//     // Basic Validations
//     if (!phone || phone.length < 5) {
//       return Swal.fire("Error", "Enter a valid recipient phone number!", "error");
//     }
//     if (amount < 50) {
//       return Swal.fire("Error", "Minimum amount to send is 50 Taka!", "error");
//     }
//     if (amount > balance) {
//       return Swal.fire("Error", "Insufficient balance!", "error");
//     }

//     setLoading(true);

//     try {
//       // Transaction fee logic
//       const transactionFee = amount > 100 ? 5 : 0;
//       const finalAmount = amount - transactionFee;

//       // API Call (Simulated)
//       const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/send-money`, {
//         senderEmail: user.email,
//         recipientPhone: phone,
//         amount: finalAmount,
//         fee: transactionFee,
//       });

//       if (response.data.success) {
//         Swal.fire("Success", `You have sent ${finalAmount} Taka!`, "success");
//         refetch(); // Refresh balance
//         setPhone("");
//         setAmount("");
//       } else {
//         Swal.fire("Error", response.data.message, "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Transaction failed!", "error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen w-10/12 flex justify-center items-center mx-auto px-4 py-12">
//       <motion.div 
//         className="w-6/12 mx-auto bg-white shadow-lg rounded-2xl p-6"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//       >
//         <h2 className="text-3xl font-bold text-[#4335a7] text-center mb-6">Send Money</h2>

//         {/* Balance Display */}
//         <div className="mb-4 p-4 bg-gray-100 rounded-lg text-center">
//           <p className="text-gray-600 text-lg">Available Balance</p>
//           <p className="text-2xl font-bold text-[#4335a7]">{balance} Taka</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSendMoney} className="space-y-4">
//           <div className="relative">
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Recipient Phone Number"
//               className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335a7]"
//             />
//             <FaPhone className="absolute right-4 top-4 text-gray-400 text-lg" />
//           </div>

//           <div className="relative">
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter Amount (Min 50 Taka)"
//               className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335a7]"
//             />
//             <FaMoneyBillWave className="absolute right-4 top-4 text-green-500 text-lg" />
//           </div>

//           <motion.button
//             type="submit"
//             className={`w-full text-white font-bold py-3 rounded-lg transition ${
//               loading ? "bg-gray-400" : "bg-[#4335a7] hover:bg-[#5544d9]"
//             }`}
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Send Money"}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default SendMoney;



import React, { useState } from "react";
import { useFirebaseAuth } from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaMoneyBillWave, FaPhone } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendMoney = () => {
  const { user } = useFirebaseAuth();
  const { data, refetch } = useGetUser();
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const api = useAxiosSecure();

  const balance = data?.balance || 0;

  // Calculate transaction fee dynamically
  const transactionFee = amount > 100 ? 5 : 0;
  const totalAmount = amount ? parseFloat(amount) + transactionFee : 0;

  // Transaction Handler
  const handleSendMoney = async (e) => {
    e.preventDefault();

    if (!phone || phone.length < 5) {
      return Swal.fire("Error", "Enter a valid recipient phone number!", "error");
    }
    if (amount < 50) {
      return Swal.fire("Error", "Minimum amount to send is 50 Taka!", "error");
    }
    if (totalAmount > balance) {
      return Swal.fire("Error", "Insufficient balance!", "error");
    }

    setLoading(true);

    try {
      const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/send-money`, {
        senderEmail: user.email,
        SenderPhone:user.data,
        recipientPhone: phone,
        amount: parseFloat(amount),
        fee: transactionFee,
      });

      if (response.data.success) {
        Swal.fire("Success", `You have sent ${amount} Taka!`, "success");
        refetch(); // Refresh balance
        setPhone("");
        setAmount("");
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Transaction failed!", "error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full md:w-10/12 flex justify-center items-center mx-auto px-4 py-12">
      <motion.div 
        className="w-full sm:8/12 md:w-6/12 mx-auto bg-white shadow-lg rounded-2xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-[#4335a7] text-center mb-6">Send Money</h2>

        {/* Balance Display */}
        <div className="mb-4 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600 text-lg">Available Balance</p>
          <p className="text-2xl font-bold text-[#4335a7]">{balance} Taka</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendMoney} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Recipient Phone Number"
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335a7]"
            />
            <FaPhone className="absolute right-4 top-4 text-gray-400 text-lg" />
          </div>

          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount (Min 50 Taka)"
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4335a7]"
            />
           
          </div>

          {/* Transaction Fee & Total Amount */}
          {amount && (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-lg">
                Transaction Fee: <span className="font-bold text-red-500">{transactionFee} Taka</span>
              </p>
              <p className="text-gray-700 text-xl font-bold">
                Total Amount: <span className="text-[#4335a7]">{totalAmount} Taka</span>
              </p>
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
            {loading ? "Processing..." : "Send Money"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SendMoney;
