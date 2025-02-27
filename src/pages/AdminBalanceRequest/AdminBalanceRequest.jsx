


import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";

const AdminBalanceRequest = () => {
  const api = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all balance requests and associated agent details
  const { data: balanceRequests, isLoading, refetch } = useQuery({
    queryKey: ["balanceRequests"],
    queryFn: async () => {
      const res = await api.get("/admin/balance-requests");
      return res.data.requests;
    },
  });

  // Handle Approve or Reject Balance Request
  const handleAction = async (requestId, agentEmail, action) => {
    Swal.fire({
      title: `Confirm ${action}?`,
      text: `Are you sure you want to ${action.toLowerCase()} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.post("/admin/update-balance-request", { requestId, agentEmail, action });

          if (response.data.success) {
            Swal.fire("Success!", `Balance request ${action.toLowerCase()}ed.`, "success");
            refetch();
          } else {
            Swal.fire("Error", response.data.message, "error");
          }
        } catch (error) {
          Swal.fire("Error", "Request processing failed!", "error");
        }
      }
    });
  };

  // **Filter Data Based on Phone Search**
  const filteredRequests = balanceRequests?.filter((req) =>
    req?.agentDetails?.phone.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-[#1A237E] text-center mb-6">
          Agent Balance Requests
        </h2>

      

                <div className="mb-4 flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      placeholder="Search by Phone Number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                  </div>
                </div>

        {/* Balance Requests Table */}
        {isLoading ? (
          <Loading ></Loading>
        ) : filteredRequests?.length === 0 ? (
          <p className="text-center text-gray-500">No matching requests found.</p>
        ) : (
          <div className="overflow-x-auto h-[400px] overflow-y-scroll">
            <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-[#1A237E] text-white">
                  <th className="p-3 text-left">Agent Phone</th>
                  <th className="p-3 text-center">Agent Email</th>
                  <th className="p-3 text-left">Balance</th>
                  <th className="p-3 text-left">Earnings</th>
                  <th className="p-3 text-center">Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests?.map((req) => (
                  <tr key={req._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{req?.agentDetails?.phone || "N/A"}</td>
                    <td className="p-3">{req?.agentEmail}</td>
                    <td className="p-3 font-semibold">{req?.agentDetails?.balance || 0} </td>
                    <td className="p-3 font-semibold">{req?.agentDetails?.earnings || 0} </td>
                    <td className="p-3">{new Date(req?.createdAt).toLocaleString()}</td>
                    <td>
                      <span className={` text-sm p-3 rounded-xl ${
                        req?.status === "Approve"
                          ? "text-green-600 bg-green-200"
                          : req?.status === "Reject"
                          ? "text-red-600 bg-red-200 px-5"
                          : "text-yellow-800 bg-yellow-200"
                      }`}>
                        {req?.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleAction(req._id, req?.agentEmail, "Approve")}
                        className={`px-5 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                            req?.status !== "Pending"
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg text-white"
                        }`}
                        disabled={req?.status !== "Pending"}
                        >
                        <FaCheckCircle className="text-lg" />
                        Approve
                      </button>

                      <button
                        onClick={() => handleAction(req._id, req?.agentEmail, "Reject")}
                        className={`px-5 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                            req?.status !== "Pending"
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg text-white"
                        }`}
                        disabled={req?.status !== "Pending"}
                        >
                        <FaTimesCircle className="text-lg" />
                        Reject
                      </button>
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

export default AdminBalanceRequest;

