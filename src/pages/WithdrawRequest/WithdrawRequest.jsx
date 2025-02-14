import React, { useState } from "react";
import { useFirebaseAuth } from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const WithdrawRequest = () => {
  const { user } = useFirebaseAuth();
  const { data, refetch } = useGetUser();
  const api = useAxiosSecure();
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Fetch all withdraw requests
  const { data: withdrawRequests, isLoading, refetch: reqRefetch } = useQuery({
    queryKey: ["withdrawRequests", user?.email],
    queryFn: async () => {
      const res = await api.get(`/agent-requests?email=${user?.email}&type=Withdraw Request`);
      return res.data.requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
    },
    enabled: !!user?.email,
  });

  // Handle Withdraw Request
  const handleWithdrawRequest = async () => {
    const earnings = data?.earnings || 0;
    const amount = parseFloat(withdrawAmount);

    if (!amount || amount <= 0) {
      return Swal.fire("Error", "Enter a valid withdrawal amount!", "error");
    }
    if (earnings === 0) {
      return Swal.fire("Error", "You have zero earnings!", "error");
    }
    if (amount > earnings) {
      return Swal.fire("Error", "Withdrawal amount exceeds earnings!", "error");
    }

    Swal.fire({
      title: "Confirm Withdrawal Request?",
      text: `Are you sure you want to withdraw ${amount} Taka?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Request",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.post("/withdraw-request", {
            agentEmail: user?.email,
            requestType: "Withdraw Request",
            amount,
            agentName : data?.name,
            agentId:data?._id,
          });

          if (response.data.success) {
            Swal.fire("Success!", "Withdraw request submitted.", "success");
            setWithdrawAmount(""); // Clear input field
            reqRefetch(); // ✅ Immediately update the table
          } else {
            Swal.fire("Error", response.data.message, "error");
          }
        } catch (error) {
          Swal.fire("Error", "Request failed!", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <motion.div
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-[#4335a7] text-center mb-6">Withdraw Requests</h2>

        {/* Withdraw Request Form */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter withdrawal amount"
            className="border p-3 rounded-lg w-full max-w-md focus:ring-2 focus:ring-[#4335a7] focus:outline-none"
          />
          <motion.button
            onClick={handleWithdrawRequest}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Withdraw
          </motion.button>
        </div>

        {/* Withdraw Requests Table */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading requests...</p>
        ) : withdrawRequests?.length === 0 ? (
          <p className="text-center text-gray-500">No withdrawal requests found.</p>
        ) : (
          <div className="overflow-x-auto h-[400px] overflow-y-scroll">
            <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-[#4335a7] text-white">
                  <th className="p-3 text-left">Request ID</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawRequests?.map((req, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-3">{req._id}</td>
                    <td className="p-3 font-semibold">{req.amount} Taka</td>
                    <td className="p-3">{new Date(req.createdAt).toLocaleString()}</td>
                    <td className={``}>
                     <span  className={` p-2 rounded-xl ${req.status === "Approve" ? "text-green-600 bg-green-200" : req.status === "Reject" ? "text-red-600 bg-red-200 px-4" : "text-yellow-800 bg-yellow-200"}`}> {req.status}</span>
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

export default WithdrawRequest;
