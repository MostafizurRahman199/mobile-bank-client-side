import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave, FaExchangeAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";

const SingleUserTransaction = () => {
  const { email } = useParams();
  const api = useAxiosSecure();

  // Fetch User Transactions
  const { data: transactions, isLoading, isError } = useQuery({
    queryKey: ["transactions", email],
    queryFn: async () => {
      const res = await api.get(`/transactions?email=${email}`);
      // return res.data;
      return res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
    },
    enabled: !!email, // Prevents query if email is undefined
  });



  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-[#1A237E] text-center mb-6">User Transactions</h2>

        {/* Loading & Error Handling */}
        {isLoading ? (
         <Loading height="screen"></Loading>
        ) : isError ? (
          <p className="text-center text-red-500">Error fetching transactions.</p>
        ) : transactions?.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-[#1A237E] text-white">
                  <th className="p-3 text-left">Transaction ID</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((txn, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-3">{txn.transactionId}</td>
                    <td className="p-3">{txn.type}</td>
                    <td className="p-3">{txn.amount} Taka</td>
                    <td className="p-3">{txn.status}</td>
                    <td className="p-3">{new Date(txn.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SingleUserTransaction;
