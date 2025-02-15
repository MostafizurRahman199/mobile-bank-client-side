import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetUser from "../../hooks/useGetUser";
import { useFirebaseAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave, FaExchangeAlt, FaCheckCircle, FaTimesCircle, FaUser, FaIdBadge } from "react-icons/fa";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error.jsx/ErrorPage";

const Transactions = () => {

  
  const { user } = useFirebaseAuth();
  const api = useAxiosSecure();
  const email = user?.email;
  const {data} = useGetUser();
  const phone = data?.phone;

  // Fetch Transactions using TanStack Query
  const { data: transactions, isLoading, isError, refetch } = useQuery({
    queryKey: ["transactions", email],
    queryFn: async () => {
      const res = await api.get(`/transactions?phone=${phone}`);
      // return res.data;
      return res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
    },
    enabled: !!email, // Prevents query if email is undefined
  });


  console.log(transactions);

  return (
    <div className="container mx-auto px-4 py-12 mt-12">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-[#4335a7] text-center mb-6">Transaction History</h2>

        {/* Loading & Error Handling */}
        {isLoading ? (
          <Loading height="screen"></Loading>
        ) : isError ? (
          <ErrorPage></ErrorPage>
        ) : transactions?.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto h-[400px] overflow-y-scroll">
            <table className="w-full min-w-[900px] border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-[#4335a7] text-white">
                  <th className="p-3 text-left">Transaction ID</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Sender</th>
                  <th className="p-3 text-left">Recipient</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Fee</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((txn, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100 text-gray-700 text-sm">
                    {/* Transaction ID */}
                    <td className="p-3">
                      <div className="flex items-center">
                        <FaIdBadge className="text-gray-500 mr-2" />
                        <span className="whitespace-nowrap">{txn.transactionId || "N/A"}</span>
                      </div>
                    </td>

                    {/* Transaction Type */}
                    <td className="p-3">
                      <div className="flex items-center">
                        {txn.type === "Send Money" ? (
                          <FaExchangeAlt className="text-blue-500 mr-2" />
                        ) : (
                          <FaMoneyBillWave className="text-green-500 mr-2" />
                        )}
                        {txn?.type || "Not found"}
                      </div>
                    </td>

                    {/* Recipient */}
                    <td className="p-3">
                      <div className="flex items-center">
                        <FaUser className="text-gray-600 mr-2" />
                        {txn.senderPhone || "N/A"}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <FaUser className="text-gray-600 mr-2" />
                        {txn.recipient || "N/A"}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="p-3 font-semibold text-gray-800">{txn.amount} Taka</td>

                    {/* Fee */}
                    <td className="p-3 text-gray-600">{txn.fee} Taka</td>

                    {/* Status */}
                    <td className="p-3">
                      {txn.status === "Completed" ? (
                        <span className="text-green-500 flex items-center font-medium">
                          <FaCheckCircle className="mr-1" /> {txn.status}
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center font-medium">
                          <FaTimesCircle className="mr-1" /> {txn.status}
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="p-3 text-gray-500 whitespace-nowrap">
                      {new Date(txn.date).toLocaleString()}
                    </td>
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

export default Transactions;
