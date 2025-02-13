import React, { useState } from "react";
import useMessage from "../../hooks/useMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiComponent from "../../API/ApiComponent";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import NotFound from "../../components/NotFound/NotFound";
import { useDarkMode } from "../../Context/DarkModeContext";
import Aos from "aos";
import { useEffect } from 'react';


const Message = () => {


  const { getAllUsers, uploadReplyMessage, deleteMessage } = ApiComponent();
  const { data: messageData, refetch:messageRefetch, isLoading:messageLoading } = useMessage();


  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  // messageDate have createdAt 
  //sort it by date new message stay at the top
  // messageDate have createdAt 
  //sort it by date new message stay at the top
  const sortedMessages = messageData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));




  const {darkMode} = useDarkMode();

  const { data: userData, isLoading, isError, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });
  
  // Track individual reply messages for each message ID
  const [replies, setReplies] = useState({});







  const sendReplyMessageMutation = useMutation({

    mutationFn: (data) => uploadReplyMessage(data), 
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Reply Sent",
        text: "Reply Message has been sent successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      setReplies({});
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to  sent message. ${
          error.response?.data?.message || error.message
        }`,
        showConfirmButton: false,
        timer: 1500,
      });
     
    },
  });



  const deleteUserMutation = useMutation({
    mutationFn: (id) => deleteMessage(id),
    onSuccess: () => {
        messageRefetch(); 
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





  // Handler for sending a reply (saving to DB)
  const handleReply = (messageId, userEmail, userMessage) => {
    const messageReply = {
      userMessage: userMessage,
      email: userEmail,
      createdAt: new Date().toISOString(),
      userId: userData?.id,
      messageId: messageId,
      adminMessage: replies[messageId],  // Get the reply from the state for that message
    };

    console.log(messageReply);
    sendReplyMessageMutation.mutate(messageReply);
    // Here, you can call your API to save the reply
  };

  const isSignedInUser = (messageEmail) => {
    // Check if the message email exists in the users' list
    const signedInUser = userData?.find((user) => {
        if(user.email === messageEmail){
            return user.photoURL;
        }else{
            return false;
        }
    });
    return signedInUser;
  };

  // Update the reply state for a specific message
  const handleChangeReply = (messageId, value) => {
    setReplies({
      ...replies,
      [messageId]: value,
    });
  };


  if(messageLoading){
    return <Loading height="screen"></Loading>
  }

  return (
    <div className="w-full md:w-10/12 mx-auto py-20">
      <h2 className={`text-3xl font-semibold text-center  ${darkMode ? " text-[#5544d9]" : "text-[#4335A7]"}  mb-8`}>
        Messages
      </h2>

      {/* Scrollable Container */}
      <div className="mt-8 p-4">
        <div className="space-y-8">
            {
                messageData?.length == 0 && <NotFound title="Inbox is Empty" link="/" buttonText="Back Home "></NotFound>
            }
          {sortedMessages?.map((message) => {
            const isUserExist = isSignedInUser(message.email); // Check if the message's email exists in the user data

            // console.log(isUserExist);
            
            return (
              <div
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
              key={message._id} className={`relative ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"} flex flex-col  shadow-md  p-4 rounded-xl`}>
             

                <div className="flex flex-col md:flex md:flex-row md:justify-between gap-2 md:items-center mb-4">
                    <div className="flex gap-2 items-center">
                        <div>
                            {
                                isUserExist ? <> 
                                <img src={"https://files.softicons.com/download/business-icons/flatastic-icons-part-4-by-custom-icon-design/png/512x512/male-user-accept.png"} className="w-10 h-10" alt="" /> </> :
                                 <>
                                <img src="https://cdn-icons-png.freepik.com/512/7718/7718888.png" className="w-10 h-10" alt="" />
                                </>
                            }
                        </div>
                        <div>

                        <h3 className={`${darkMode ? " text-white" : "text-[#4335A7]"}   text-xl font-semibold `}>{message.name}</h3>
                        </div>
                    </div>

                  <div className=" flex flex-col md:flex md:flex-row gap-2 md:items-center">
                    <p className="text-sm text-gray-600">{message.email.slice(0,20)+".."}</p>
                    <p className="text-sm text-gray-600">{message.phone}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>

                    <div>
                      {/* Delete Button */}
                      <button onClick={()=>handleDelete(message._id)} className="absolute -right-4 -top-4 btn btn-circle  text-white   text-sm flex items-center">
                        ❌
                      </button>
                    </div>

                    
                  </div>
                </div>

                {/* Message Content */}
                <p className={` ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"}  mb-4  p-4 rounded-lg`}>{message.message}</p>

                {/* Action Buttons */}
                <div className="w-full">
                  {isUserExist && (
                    <div>
                      <textarea
                        className={`w-full p-2 border border-gray-300 rounded-md  ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"} `}
                        value={replies[message._id] || ""}
                        onChange={(e) => handleChangeReply(message._id, e.target.value)}
                        placeholder="Write your reply..."
                      />
                    </div>
                  )}

                  <div className="flex justify-between items-baseline w-full">
                    {isUserExist ? (
                      <>
                        <div>
                          <button
                            onClick={() => handleReply(message._id, message.email, message.message)}
                            className="bg-gradient-to-r from-[#4335A7] to-[#5544d9] text-white py-2 px-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                          >
                            Send Reply
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <a
                          href={`mailto:${message.email}`}
                         className="bg-gradient-to-r from-[#4335A7] to-[#5544d9] text-white py-2 px-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                          Mail Reply
                        </a>
                      </>
                    )}

                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Message;

