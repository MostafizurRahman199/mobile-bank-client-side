


import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import ApiComponent from "../../../API/ApiComponent";
import Loading from "../../../components/Loading/Loading";
import ErrorPage from "../../../components/Error.jsx/ErrorPage";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import Pagination from "../../../components/Pagination/Pagination";

const AllUsers = () => {
  const { getAllUsers, deleteUser, updateUserRole } = ApiComponent();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allUsers, isLoading, isError, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });

console.log(allUsers);

  const deleteUserMutation = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The user has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the user. Please try again.",
      });
    },
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Role Updated!",
        text: "The user role has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update the user role. Please try again.",
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(id);
      }
    });
  };

  const handleRoleChange = (id, newRole) => {
    Swal.fire({
      title: "Change Role?",
      text: `Are you sure you want to change the role to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserRoleMutation.mutate({ id, role: newRole });
      }
    });
  };

  if (isLoading) {
    return <Loading height="screen" />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  // Filter and paginate users
  const filteredUsers = allUsers.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full md:w-11/12 mx-auto">
      <SectionHeading
       
        title2={"Manage All Users"}
      ></SectionHeading>

      <div className="w-full bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Total Users: {filteredUsers.length}
          </h2>
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4"
          />
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#4335a7] text-white font-normal">
                <th className="py-2 px-4 text-center">Image</th>
                <th className="py-2 px-4 text-center">Name</th>
                <th className="py-2 px-4 text-center">Email</th>
                <th className="py-2 px-4 text-center">Created At</th>
                <th className="py-2 px-4 text-center">Role</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-4 text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full">
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">{user.name}</td>
                  <td className="py-4 px-4 text-center">{user.email}</td>
                  <td className="py-4 px-4 text-center">
                    {new Date(user.createAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <select
                      className="bg-gray-100 border rounded-lg p-2"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                      <option value="Moderator">Moderator</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 btn hover:bg-red-800"
                    >
                      <FaTrashAlt size={18} className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block md:hidden">
        {paginatedUsers?.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-col bg-gray-100 p-4 mb-4 rounded-lg shadow-sm"
          >
            <div className="flex flex-col sm:flex sm:flex-row gap-4 items-center mb-4">
              <div className="w-24 h-24 bg-gray-300 rounded-full">
                <img
                  src={item.photoURL}
                  alt={item.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800  text-center break-word">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-center text-sm">{item.email}</p>
                <p className="text-gray-600 text-center">{new Date(item.createAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right text-lg font-semibold text-gray-800">
               
              </div>
             <div className="flex items-center gap-2">
             <div>
             <select
                      className="bg-gray-200 border rounded-lg p-2"
                      value={item.role}
                      onChange={(e) => handleRoleChange(item._id, e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                      <option value="Moderator">Moderator</option>
                    </select>
              </div>
              <div>
              <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 p-3 rounded-lg hover:bg-red-800"
                  >
                    <FaTrashAlt size={18} className="text-white" />
                  </button>
              </div>
             </div>
            </div>
          </div>
        ))}
      </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllUsers;


