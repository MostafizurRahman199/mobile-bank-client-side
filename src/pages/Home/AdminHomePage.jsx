// // import React from "react";
// // import { useFirebaseAuth } from "../../hooks/useAuth";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // import { useQuery } from "@tanstack/react-query";
// // import { Link } from "react-router-dom";
// // import Swal from "sweetalert2";
// // import {
// //   FaUsers,
// //   FaMoneyBillWave,
// //   FaUserShield,
// //   FaExchangeAlt,
// //   FaBalanceScale,
// // } from "react-icons/fa";
// // import { motion } from "framer-motion";

// // const AdminHomePage = () => {
// //   const { user } = useFirebaseAuth();
// //   const api = useAxiosSecure();

// //   // Fetch Admin Dashboard Data
// //   const { data: dashboardData, isLoading } = useQuery({
// //     queryKey: ["adminDashboard"],
// //     queryFn: async () => {
// //       const res = await api.get("/admin-dashboard");
// //       return res.data;
// //     },
// //   });

// //   return (
// //     <div className="container mx-auto px-4 py-8 mt-12">
// //       <motion.div
// //         className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6"
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5, ease: "easeOut" }}
// //       >
// //         <h2 className="text-3xl font-bold text-[#4335a7] text-center mb-6">
// //           Admin Dashboard
// //         </h2>

// //         {/* Admin Stats */}
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-6">
// //           <motion.div
// //             className="p-4 bg-blue-500 text-white rounded-lg shadow-md"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <FaUsers className="text-3xl mx-auto" />
// //             <p className="text-lg font-bold">Users: {dashboardData?.totalUsers}</p>
// //           </motion.div>

// //           <motion.div
// //             className="p-4 bg-green-500 text-white rounded-lg shadow-md"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <FaUserShield className="text-3xl mx-auto" />
// //             <p className="text-lg font-bold">Agents: {dashboardData?.totalAgents}</p>
// //           </motion.div>

// //           <motion.div
// //             className="p-4 bg-yellow-500 text-white rounded-lg shadow-md"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <FaMoneyBillWave className="text-3xl mx-auto" />
// //             <p className="text-lg font-bold">Total System Balance: {dashboardData?.totalMoney} Taka</p>
// //           </motion.div>

// //           <motion.div
// //             className="p-4 bg-purple-500 text-white rounded-lg shadow-md"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <FaExchangeAlt className="text-3xl mx-auto" />
// //             <p className="text-lg font-bold">Admin Earnings: {dashboardData?.adminEarnings} Taka</p>
// //           </motion.div>
// //         </div>

// //         {/* Quick Links */}
// //         <h3 className="text-xl font-bold mt-6 text-center">Quick Access</h3>
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
// //           <Link to="/all-users">
// //             <motion.button
// //               className="flex flex-col items-center justify-center bg-blue-600 text-white py-4 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition w-full"
// //               whileHover={{ scale: 1.07 }}
// //             >
// //               <FaUsers className="text-3xl mb-2" />
// //               All Users
// //             </motion.button>
// //           </Link>

// //           <Link to="/all-agents">
// //             <motion.button
// //               className="flex flex-col items-center justify-center bg-green-600 text-white py-4 rounded-lg font-bold shadow-lg hover:bg-green-700 transition w-full"
// //               whileHover={{ scale: 1.07 }}
// //             >
// //               <FaUserShield className="text-3xl mb-2" />
// //               All Agents
// //             </motion.button>
// //           </Link>

// //           <Link to="/balance-requests">
// //             <motion.button
// //               className="flex flex-col items-center justify-center bg-yellow-500 text-white py-4 rounded-lg font-bold shadow-lg hover:bg-yellow-600 transition w-full"
// //               whileHover={{ scale: 1.07 }}
// //             >
// //               <FaMoneyBillWave className="text-3xl mb-2" />
// //               Balance Requests
// //             </motion.button>
// //           </Link>

// //           <Link to="/withdraw-requests">
// //             <motion.button
// //               className="flex flex-col items-center justify-center bg-red-500 text-white py-4 rounded-lg font-bold shadow-lg hover:bg-red-600 transition w-full"
// //               whileHover={{ scale: 1.07 }}
// //             >
// //               <FaBalanceScale className="text-3xl mb-2" />
// //               Withdraw Requests
// //             </motion.button>
// //           </Link>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default AdminHomePage;



// import React from "react";
// import { useFirebaseAuth } from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaUsers,
//   FaMoneyBillWave,
//   FaUserShield,
//   FaExchangeAlt,
//   FaBalanceScale,
// } from "react-icons/fa";

// const AdminHomePage = () => {
//   const { user } = useFirebaseAuth();
//   const api = useAxiosSecure();

//   // Fetch Admin Dashboard Data
//   const { data: dashboardData, isLoading } = useQuery({
//     queryKey: ["adminDashboard"],
//     queryFn: async () => {
//       const res = await api.get("/admin-dashboard");
//       return res.data;
//     },
//   });

//   return (
//     <div className="container mx-auto px-4 py-10 mt-12">
//       <motion.div
//         className="max-w-6xl mx-auto bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] shadow-2xl rounded-3xl p-8 backdrop-blur-lg"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <h2 className="text-4xl font-bold text-[#1A237E] text-center mb-6">
//           Admin Dashboard 🎛️
//         </h2>

//         {/* Admin Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
//           <StatCard
//             icon={<FaUsers className="text-4xl" />}
//             label="Total Users"
//             value={dashboardData?.totalUsers}
//             color="bg-blue-500"
//           />
//           <StatCard
//             icon={<FaUserShield className="text-4xl" />}
//             label="Total Agents"
//             value={dashboardData?.totalAgents}
//             color="bg-green-500"
//           />
//           <StatCard
//             icon={<FaMoneyBillWave className="text-4xl" />}
//             label="System Balance"
//             value={`${dashboardData?.totalMoney} Taka`}
//             color="bg-yellow-500"
//           />
//           <StatCard
//             icon={<FaExchangeAlt className="text-4xl" />}
//             label="Admin Earnings"
//             value={`${dashboardData?.adminEarnings} Taka`}
//             color="bg-purple-500"
//           />
//         </div>

//         {/* Quick Links */}
//         <h3 className="text-2xl font-bold text-center mt-4 mb-4">Quick Access 🚀</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           <QuickLink to="/all-users" icon={<FaUsers className="text-3xl" />} text="All Users" color="bg-blue-600 hover:bg-blue-700" />
//           <QuickLink to="/all-agents" icon={<FaUserShield className="text-3xl" />} text="All Agents" color="bg-green-600 hover:bg-green-700" />
//           <QuickLink to="/balance-requests" icon={<FaMoneyBillWave className="text-3xl" />} text="Balance Requests" color="bg-yellow-500 hover:bg-yellow-600" />
//           <QuickLink to="/withdraw-requests" icon={<FaBalanceScale className="text-3xl" />} text="Withdraw Requests" color="bg-red-500 hover:bg-red-600" />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// /** 📌 Card Component for Statistics */
// const StatCard = ({ icon, label, value, color }) => (
//   <motion.div
//     className={`p-6 ${color} text-white rounded-xl shadow-lg`}
//     whileHover={{ scale: 1.05 }}
//     transition={{ duration: 0.3 }}
//   >
//     {icon}
//     <p className="text-xl font-bold mt-2">{label}</p>
//     <p className="text-lg font-semibold">{value || 0}</p>
//   </motion.div>
// );

// /** 📌 Quick Access Button Component */
// const QuickLink = ({ to, icon, text, color }) => (
//   <Link to={to}>
//     <motion.button
//       className={`flex flex-col items-center justify-center ${color} text-white py-5 rounded-xl font-bold shadow-lg w-full`}
//       whileHover={{ scale: 1.07 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       {icon}
//       <span className="text-lg">{text}</span>
//     </motion.button>
//   </Link>
// );

// export default AdminHomePage;

import React from "react";
import { useFirebaseAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaMoneyBillWave,
  FaUserShield,
  FaExchangeAlt,
  FaBalanceScale,
} from "react-icons/fa";

const AdminHomePage = () => {
  const { user } = useFirebaseAuth();
  const email = user?.email;
  const api = useAxiosSecure();

  // Fetch Admin Dashboard Data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const res = await api.get("/admin-dashboard");
      return res.data;
    },
  });

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] shadow-2xl rounded-3xl p-10 backdrop-blur-lg mt-24">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-3xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-[#1A237E] text-center mb-6">
          Admin Dashboard 
        </h2>

        {/* Admin Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
          <StatCard
            icon={<FaUsers className="text-4xl text-[#1A237E]" />}
            label="Total Users"
            value={dashboardData?.totalUsers}
          />
          <StatCard
            icon={<FaUserShield className="text-4xl text-[#1A237E]" />}
            label="Total Agents"
            value={dashboardData?.totalAgents}
          />
          <StatCard
            icon={<FaMoneyBillWave className="text-4xl text-[#1A237E]" />}
            label="System Balance"
            value={`${dashboardData?.totalMoney} Taka`}
          />
          <StatCard
            icon={<FaExchangeAlt className="text-4xl text-[#1A237E]" />}
            label="Earnings"
            value={`${dashboardData?.adminEarnings} Taka`}
          />
        </div>

        {/* Quick Links */}
        <h3 className="text-2xl font-bold text-[#1A237E] text-center mt-4 mb-4">Quick Access 🚀</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <QuickLink to="/all-users" icon={<FaUsers className="text-3xl text-[#1A237E]" />} text="All Users" />
          <QuickLink to="/all-agents" icon={<FaUserShield className="text-3xl text-[#1A237E]" />} text="All Agents" />
          <QuickLink to="/balance-requests" icon={<FaMoneyBillWave className="text-3xl text-[#1A237E]" />} text="Balance Requests" />
          <QuickLink to="/withdraw-requests" icon={<FaBalanceScale className="text-3xl text-[#1A237E]" />} text="Withdraw Requests" />
        </div>
      </motion.div>
    </div>
  );
};

/** 📌 Card Component for Statistics */
const StatCard = ({ icon, label, value }) => (
  <motion.div
    className="p-6 bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] text-[#1A237E] rounded-xl shadow-lg flex flex-col justify-center items-center "
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <p className="text-center">{icon}</p>
    <p className="text-xl font-bold mt-2">{label}</p>
    <p className="text-lg font-semibold">{value || 0}</p>
  </motion.div>
);

/** 📌 Quick Access Button Component */
const QuickLink = ({ to, icon, text }) => (
  <Link to={to}>
    <motion.button
      className="flex flex-col items-center justify-center bg-white  text-[#1A237E] py-5 rounded-xl font-bold shadow-lg w-full hover:shadow-md transition"
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="text-lg">{text}</span>
    </motion.button>
  </Link>
);

export default AdminHomePage;
