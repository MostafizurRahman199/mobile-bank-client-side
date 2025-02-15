



import React from "react";
import ApiComponent from "../../API/ApiComponent";
import { useFirebaseAuth } from "../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import Contact from "../Contact/Contact";
import Swal from "sweetalert2";
import { useDarkMode } from "../../Context/DarkModeContext";
import NotFound from "../../components/NotFound/NotFound";
import useGetUser from "../../hooks/useGetUser";

const ReplyMessage = () => {

   const {darkMode}  = useDarkMode();
  const { getReplyMessage, deleteReplyMessage } = ApiComponent();
  const { user } = useFirebaseAuth();
  const email = user?.email;

  const {data:userFromDb} = useGetUser();
  const phone = userFromDb?.phone;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getReplyMessage", email],
    queryFn: () => getReplyMessage(email),
    enabled: !!email,
  });




  const deleteUserMutation = useMutation({
    mutationFn: (id) => deleteReplyMessage(id),
    onSuccess: () => {
      refetch(); 
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The item has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the item. Please try again.",
      });
    },
  });




const handleDelete = (id) => {
    // console.log("hello");
    // SweetAlert2 Confirmation Dialog
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
        deleteUserMutation.mutate(id); // Trigger deletion if confirmed
      }
    });
  };


  if (isLoading) return <div>Loading...</div>; // Loading state

  return (
    <div className="w-full  mx-auto py-20 px-4 sm:px-6 lg:px-8">
    

     <div className="md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">

     <div className="md:col-span-1 lg:col-span-1  overflow-y-auto border-r-2 border-dashed border-[#4335A7] p-2">
        <h2 className={`text-3xl font-semibold text-center  mb-8 
            ${darkMode ? "text-[#5544d9]" : "text-[#4335A7]"}`}>Admin Replies</h2>
       <div className="h-[600px] overflow-y-auto flex flex-col gap-4 py-2 px-2">

       {
                data?.length == 0 && <NotFound title="Inbox is Empty" link="/" buttonText="Back Home "></NotFound>
            }
       {data?.map((message) => (
          <div
            key={message._id}
            className={`relative ${darkMode ? "bg-gray-800" : "bg-gray-100"}  p-6 rounded-lg shadow-lg transition-all hover:shadow-xl `}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-xl font-semibold  ${darkMode ? "text-white" : " text-[#4335A7]"}`}>{message.userMessage}</h3>
                <p className="text-sm text-gray-600">{message.email}</p>
                <p className="text-xs text-gray-500">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-[#5544d9] text-white p-4 rounded-lg mt-4">
              <h4 className="text-lg font-semibold">Admin Reply:</h4>
              <p>{message.adminMessage}</p>
            </div>
            <div className="absolute -top-2 -right-2">
                <button onClick={()=>handleDelete(message._id)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm">❌</button>
            </div>
          </div>
        ))}
       </div>
      </div>

      <div className="md:col-span-1 lg:col-span-2">
      <Contact flag={true}></Contact>
      </div>
     </div>

      {/* If no messages */}
      {data?.length === 0 && (
        <div className="text-center text-lg text-gray-600 mt-8">
          You don't have any messages yet.
        </div>
      )}
    </div>
  );
};

export default ReplyMessage;
