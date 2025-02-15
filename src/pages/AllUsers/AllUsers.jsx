import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUser, FaUnlock, FaLock, FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";

const AllUsers = () => {
  const api = useAxiosSecure();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await api.get("/all-users");
      return res.data.users;
    },
  });

  // Filter users by phone number
  const filteredUsers = users?.filter((user) =>
    user.phone.includes(searchTerm)
  );

  // Block / Unblock User
  const toggleBlockUser = async (userId, isBlocked) => {

    console.log(userId);

    Swal.fire({
      title: `Are you sure you want to ${isBlocked ? "unblock" : "block"} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${isBlocked ? "Unblock" : "Block"}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.post("/block-user", { userId, isBlocked: !isBlocked });
          Swal.fire("Success!", `User ${isBlocked ? "unblocked" : "blocked"} successfully!`, "success");
          refetch();
        } catch (error) {
          Swal.fire("Error", "Failed to update user status!", "error");
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
        <h2 className="text-3xl font-bold text-[#1A237E] text-center mb-6">All Users</h2>

        {/* Search Box */}
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

        {/* Users Table */}
        {isLoading ? (
          <Loading ></Loading>
        ) : (
          <div className="overflow-x-auto overflow-y-scroll h-[400px]">
            <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-[#1A237E] text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Balance</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100">
                    
                    <td className="p-3 ">
                    <div className="flex items-center">
                        <FaUser className="text-blue-500 mr-2" />
                        <p>{user.name}</p>
                    </div>
                    </td>

                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 font-semibold">{user.balance} Taka</td>
                    <td className="p-3 text-gray-600">{user.isBlocked ? "Blocked" : "Active"}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => toggleBlockUser(user._id, user.isBlocked)}
                        className={`px-4 py-2 rounded-lg font-bold ${
                          user.isBlocked ? "bg-red-500" : "bg-green-500" 
                        } text-white`}
                      >
                        {user.isBlocked ?<FaLock />: <FaUnlock />  }
                      </button>

                      {/* View Transactions Button */}
                      <button
                        onClick={() => navigate(`/user-transactions/${user.phone}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                      >
                        <div className="flex gap-2 items-center">
                        <FaEye /> 
                        <p>View </p>
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

export default AllUsers;
