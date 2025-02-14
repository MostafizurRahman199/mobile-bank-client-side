import React, { useState } from "react";
import { useFirebaseAuth } from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const BalanceRequest = () => {
  const { user } = useFirebaseAuth();
  const { data, refetch } = useGetUser();
  const api = useAxiosSecure();

  // Fetch balance requests
  const { data: requests, isLoading, refetch:reqRefetch } = useQuery({
    queryKey: ["balanceRequests", user?.email],
    queryFn: async () => {
      const res = await api.get(`/agent-requests?email=${user?.email}&type=Request Balance`);
      return res.data.requests;
    },
    enabled: !!user?.email,
  });

  // Handle Request Balance
  const handleBalanceRequest = async () => {
    Swal.fire({
      title: "Confirm Balance Request?",
      text: "Are you sure you want to request balance recharge?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Request",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.post("/agent-request", {
            agentEmail: user?.email,
            requestType: "Request Balance",
          });

          if (response.data.success) {
            Swal.fire("Success!", "Balance request submitted.", "success");
            refetch();
            reqRefetch();
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
        <h2 className="text-3xl font-bold text-[#4335a7] text-center mb-6">Balance Requests</h2>

        {/* Request Balance Button */}
        <div className="flex flex-wrap justify-center items-center text-center mb-6 gap-4">
       
        <p
           
            
            className="border p-3 rounded-lg bg-gray-100 w-full max-w-md focus:ring-2 focus:ring-[#4335a7] focus:outline-none"
          >100,000 Taka</p>
         
          <motion.button
            onClick={handleBalanceRequest}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Balance
          </motion.button>
        </div>

        {/* Balance Requests Table */}
        {isLoading ? (
          <Loading height="screen"></Loading>
        ) : requests?.length === 0 ? (
          <p className="text-center text-gray-500">No balance requests found.</p>
        ) : (
          <div className="overflow-x-auto h-[400px] overflow-y-scroll">
            <table className="w-full  bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-[#4335a7] text-white">
                  <th className="p-3 text-left">Request ID</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests?.map((req, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-3">{req._id}</td>
                    <td className="p-3">{new Date(req.createdAt).toLocaleString()}</td>
                    <td className={`p-3 font-bold ${req.status === "Approved" ? "text-green-600" : req.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                      {req.status}
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

export default BalanceRequest;
