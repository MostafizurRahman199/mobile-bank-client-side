import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserShield, FaUnlock, FaLock, FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AllAgent = () => {
  const api = useAxiosSecure();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all agents
  const { data: agents, isLoading, refetch } = useQuery({
    queryKey: ["allAgents"],
    queryFn: async () => {
      const res = await api.get("/all-agents");
      return res.data.users;
    },
  });


  console.log(agents)

  // Block / Unblock Agent
  const toggleBlockAgent = async (userId, isBlocked) => {
    Swal.fire({
      title: `Are you sure you want to ${isBlocked ? "unblock" : "block"} this agent?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${isBlocked ? "Unblock" : "Block"}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.post("/block-user", { userId, isBlocked: !isBlocked });
          Swal.fire("Success!", `Agent ${isBlocked ? "unblocked" : "blocked"} successfully!`, "success");
          refetch();
        } catch (error) {
          Swal.fire("Error", "Failed to update agent status!", "error");
        }
      }
    });
  };

  // Filter Agents based on Search Query (Phone)
  const filteredAgents = agents?.filter((agent) =>
    agent.phone.includes(searchQuery)
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-[#1A237E] text-center mb-6">All Agents</h2>

        {/* Search Box */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="w-full p-3 border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#1A237E]"
              placeholder="Search by phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-4 text-gray-500" />
          </div>
        </div>

        {/* Agents Table */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading agents...</p>
        ) : (
          <div className="overflow-x-auto h-[400px] overflow-y-scroll">
            <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-[#1A237E] text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Balance</th>
                  <th className="p-3 text-left">Earnings</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents?.map((agent) => (
                  <tr key={agent._id} className="border-b hover:bg-gray-100">
                    <td className="p-3 ">
                      <div className="flex items-center">
                      <FaUserShield className="text-green-500 mr-2" />
                      {agent.name}
                      </div>
                    </td>
                    <td className="p-3">{agent.phone}</td>
                    <td className="p-3">{agent.email}</td>
                    <td className="p-3 font-semibold">{agent.balance} Taka</td>
                    <td className="p-3 font-semibold">{agent.earnings} Taka</td>
                    <td className="p-3 text-gray-600">{agent.isBlocked ? "Blocked" : "Active"}</td>
                    <td className="p-3 flex gap-2">
                      {/* Block/Unblock Button */}
                      <button
                        onClick={() => toggleBlockAgent(agent._id, agent.isBlocked)}
                        className={`px-4 py-2 rounded-lg font-bold ${
                            agent.isBlocked ? "bg-red-500" : "bg-green-500" 
                        } text-white`}
                      >
                        {agent.isBlocked ? <FaLock />: <FaUnlock />  }
                      </button>



                      {/* View Agent Transactions Button */}
                      <button
                        onClick={() => navigate(`/agent-transactions/${agent.email}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                      >
                       <div className="flex gap-2 items-center">
                       <FaEye /> 
                       <p>

                       View
                       </p>
                       </div>
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

export default AllAgent;
