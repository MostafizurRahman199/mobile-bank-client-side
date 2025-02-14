import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AdminWithdrawRequest = () => {
  const api = useAxiosSecure();

  // Fetch all withdraw requests and associated agent details
  const { data: withdrawRequests, isLoading, refetch } = useQuery({
    queryKey: ["withdrawRequests"],
    queryFn: async () => {
      const res = await api.get("/admin/withdraw-requests");
      return res.data.requests;
    },
  });

  // Handle Approve or Reject Withdraw Request
  const handleAction = async (requestId, agentEmail, amount, action) => {
    Swal.fire({
      title: `Confirm ${action}?`,
      text: `Are you sure you want to ${action.toLowerCase()} this withdraw request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.post("/admin/update-withdraw-request", { requestId, agentEmail, amount, action });

          if (response.data.success) {
            Swal.fire("Success!", `Withdraw request ${action.toLowerCase()}ed.`, "success");
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

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-[#1A237E] text-center mb-6">
          Agent Withdraw Requests
        </h2>

        {/* Withdraw Requests Table */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading requests...</p>
        ) : withdrawRequests?.length === 0 ? (
          <p className="text-center text-gray-500">No withdraw requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-[#1A237E] text-white">
                  <th className="p-3 text-left">Agent Name</th>
                  <th className="p-3 text-left">Agent Email</th>
                  <th className="p-3 text-left">Requested Amount</th>
                  <th className="p-3 text-left">Earnings</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawRequests?.map((req) => (
                  <tr key={req._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{req?.agentDetails?.name || "N/A"}</td>
                    <td className="p-3">{req?.agentEmail}</td>
                    <td className="p-3 font-semibold">{req?.amount} Taka</td>
                    <td className="p-3 font-semibold">{req?.agentDetails?.earnings || 0} Taka</td>
                    <td className="p-3">{new Date(req?.createdAt).toLocaleString()}</td>
                    <td
                      className={`p-3 `}
                    >
                      <span className={` font-bold text-sm p-3 rounded-xl ${
                        req?.status === "Approve"
                          ? "text-green-600 bg-green-200 "
                          : req?.status === "Reject"
                          ? "text-red-600 bg-red-200 px-5"
                          : "text-yellow-800 bg-yellow-200"
                      }`}>
                            {req?.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleAction(req._id, req?.agentEmail, req?.amount, "Approve")}
                        className={`px-4 py-2 rounded-lg font-bold ${
                          req?.status !== "Pending" ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                        disabled={req?.status !== "Pending"}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req._id, req?.agentEmail, req?.amount, "Reject")}
                        className={`px-4 py-2 rounded-lg font-bold ${
                          req?.status !== "Pending" ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                        } text-white`}
                        disabled={req?.status !== "Pending"}
                      >
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

export default AdminWithdrawRequest;
