import React, { useEffect } from "react";
import axios from "axios";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { useFirebaseAuth } from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ApiComponent = () => {
  
  const api = useAxiosSecure();
  const apiPublic = useAxiosPublic();
  const { logOut } = useFirebaseAuth();




  useEffect(() => {
    api.interceptors.response.use(
      (response) => {
        // console.log(response);
        return response;
      },

      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("Session expired or unauthorized access!");
          // handleLogout();
          // logOut();
        }
        return Promise.reject(error);
      }
    );
  }, []);



  const handleLogout = async () => {
    try {
      console.log("inside handle logout");
      await logOut();
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };




  // Helper function to handle responses
  const handleResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error(`HTTP Error: ${response.status}`);
  };

  // Helper function to handle errors
  // const handleError = (error) => {
  //   console.error("API Error:", error.message);
  //   throw error; // Rethrow the error for the caller to handle
  // };

  const handleError = (error) => {
    if (error.response) {
      // Server responded with a status code out of 2xx range
      console.error(
        "API Error:",
        error.response.data?.message || error.response.statusText
      );
      throw new Error(
        error.response.data?.message || `HTTP Error: ${error.response.status}`
      );
    } else if (error.request) {
      // Request was made but no response was received
      console.error("API Error (No Response):", error.message);
      throw new Error(
        "No response received from server. Please check your network."
      );
    } else {
      // Something happened in setting up the request
      console.error("API Error (Request Setup):", error.message);
      throw new Error(error.message || "Unexpected error occurred.");
    }
  };

  // JWT Token Validation
  //AuthProvider.jsx
  // TODO : make api apiPublic

  const jwtTokenValidation = async (data) => {
    try {
      const response = await api.post(`/jwt`, { email: data });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };



  // Logout route
  const logoutRoute = async () => {
    try {
      const response = await api.post(`/logout`, {});
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };



  // menu page
  //public api call
  const getMenuData = async () => {
    try {
      const response = await apiPublic.get(`/menu`);
      return handleResponse(response); // Simplified handling
    } catch (error) {
      console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
    }
  };


  const getCampData = async () => {
    try {
      const response = await apiPublic.get(`/camp`);
      return handleResponse(response); // Simplified handling
    } catch (error) {
      console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
    }
  };

  // testimonialSlide
  const getReviews = async () => {
    try {
      const response = await apiPublic.get(`/reviews`);
      return handleResponse(response); // Simplified handling
    } catch (error) {
      console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
    }
  };

  // order card
  const addToCart = async (cartItem) => {
    try {
      const response = await apiPublic.post("/cart", cartItem);
      return response.data;
      ata;
    } catch (error) {
      console.error("Error adding the item to the cart:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to add the item to the cart."
      );
    }
  };


  // order card
  const joinToCamp = async (data) => {
    try {
      const response = await apiPublic.post("/join-camp", data);
      return response.data;
    
    } catch (error) {
      console.error("Error adding the item to the cart:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to add the item to the cart."
      );
    }
  };



  const getCart = async (email) => {
    try {
      const response = await apiPublic.get(`/cart/${email}`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
    }
  };


  const getRegisterCamp = async (email) => {
    try {
      const response = await api.get(`/registered-camps/${email}`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
    }
  };



  const getMessage = async () => {
    try {
      const response = await api.get(`/get-message`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
    }
  };


  const getJoinCamp = async () => {
    try {
      console.log("Hit join api");
      const response = await api.get(`/join-camps`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
    }
  };



  // AdminHome.jsx
  const adminStats = async (email) => {
    try {
      const response = await apiPublic.get(`/admin-stats/${email}`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
    }
  };



    const deleteFromCart = async (id) => {
      try {
        console.log(id);
        const response = await apiPublic.delete(`/cart/${id}`);
        return handleResponse(response);
      } catch (error) {
        handleError(error);
      }
    };

    const deleteFromJoinCamp = async (id, campId) => {
      try {
        console.log(id, campId);
        const data = {
          id,
          campId,
        }
        const response = await apiPublic.post(`/deleteFromJoinCamp`, data);
        return handleResponse(response);
      } catch (error) {
        handleError(error);
      }
    };


    // register page
    const createUser = async (user) => {
      try {
        const response = await apiPublic.post("/users", user);
      //  console.log(response);
        return response.data;
       
      } catch (error) {
        console.error("Error adding the item to the cart:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to add the item to the cart."
        );
      }
    };



    const checkUserApproved = async (email)=>{
      try {

        console.log(email);
        const response = await api.get(`/checkUser/${email}`);
        return handleResponse(response);
      } catch (error) {
        console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
      }
    }


    const updateUser = async (user) => {
      try {
        const response = await api.post("/update-users", user);
      //  console.log(response);
        return response.data;
       
      } catch (error) {
        console.error("Error adding the item to the cart:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to add the item to the cart."
        );
      }
    };


    const updateConfirmationStatus = async (id, status) => {
      try {

        const data = {
          id: id,
          status: status
        }

        console.log(data);
        const response = await api.post("/update-confirmation-status", {data});
       console.log(response);
        return response.data;
       
      } catch (error) {
        console.error("Error adding the item to the cart:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to add the item to the cart."
        );
      }
    };


    // AllUsers.jsx page
    const getAllUsers = async ()=>{
      try {
        const response = await api.get("/users");
        return handleResponse(response);
      } catch (error) {
        console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
      }
    }


    const getPhotos = async ()=>{
      try {
        const response = await api.get("/get-photos");
        return handleResponse(response);
      } catch (error) {
        console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
      }
    }


// Dashboard.jsx
    const verifyAdmin = async (email)=>{
      try {

        console.log(email);
        const response = await api.get(`/user/admin/${email}`);
        return handleResponse(response);
      } catch (error) {
        console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
      }
    }


    const getSingleUser = async (email)=>{
      try {

        console.log(email);
        const response = await api.get(`/single-user/${email}`);
        return handleResponse(response);
      } catch (error) {
        console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
      }
    }


    const getReplyMessage = async (email)=>{
      try {

        console.log(email);
        const response = await api.get(`/get-reply-message/${email}`);
        return handleResponse(response);
      } catch (error) {
        console.error("Error fetching volunteer requests:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch requests"
      );
      }
    }





 // AllUsers.jsx page
    const deleteUser = async (id) => {
      // console.log(id);
      try {
        const response = await api.delete(`/users/${id}`);
        return handleResponse(response);
      } catch (error) {
        handleError(error);
      }
    };

 // AllUsers.jsx page
    const deleteMenuItem = async (id) => {
      // console.log(id);
      try {
        const response = await api.delete(`/menu-item/${id}`);
        return handleResponse(response);
      } catch (error) {
        handleError(error);
      }
    };


    //ManageCamp.jsx
    const deleteCampItem = async (id) => {
      // console.log(id);
      try {
        const response = await api.delete(`/camp-item/${id}`);
        return handleResponse(response);
      } catch (error) {
        handleError(error);
      }
    };


    const deleteReplyMessage = async (id) => {
      // console.log(id);
      try {
        const response = await api.delete(`/delete-reply-message/${id}`);
        return handleResponse(response);
      } catch (error) {
        handleError(error);
      }
    };



    const deleteMessage = async (id) => {
      // console.log(id);
      try {
        const response = await api.delete(`/delete-message/${id}`);
        return handleResponse(response);
      } catch (error) {
        handleError(error);
      }
    };
    
    
// AllUsers.jsx
//secure route
    const updateUserRole = async (id, role) => {
      try {
        const data = {
          id: id,
          role: role,
        }
        const response = await api.post("/role", data);
      //  console.log(response);
        return response.data;
       
      } catch (error) {
        console.error("Error adding the item to the cart:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to add the item to the cart."
        );
      }
    };


// AllUsers.jsx
//secure route
    const updateMenuItem = async (data) => {
      try {
       
        // console.log(data);
        const response = await api.post("/update-menu-item", data);
       console.log(response);
        return response.data;
       
       
      } catch (error) {
        console.error("Error adding the item to the cart:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to add the item to the cart."
        );
      }
    };


    const updateCampItem = async (data) => {
      try {
       
        // console.log(data);
        const response = await api.post("/update-camp-item", data);
       console.log(response);
        return response.data;
       
       
      } catch (error) {
        console.error("Error adding the item to the cart:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to add the item to the cart."
        );
      }
    };


    const uploadMenu = async (data) => {
      try {
        console.log(data);
        const response = await api.post("/upload-menu-item", data);
        return response.data;
        } catch (error) {
          console.error("Error adding the item to the cart:", error.message);
          throw new Error(
            error.response?.data?.message || "Failed to add the item to the cart."
            );
          }
        }


    const uploadMessage = async (data) => {
      try {
        console.log(data);
        const response = await api.post("/upload-message", data);
        return response.data;
        } catch (error) {
          console.error("Error sending message:", error.message);
          throw new Error(
            error.response?.data?.message || "failed to sent message."
            );
          }
        }


    const uploadReplyMessage = async (data) => {
      try {
        console.log(data);
        const response = await api.post("/upload-reply-message", data);
        return response.data;
        } catch (error) {
          console.error("Error sending message:", error.message);
          throw new Error(
            error.response?.data?.message || "failed to sent message."
            );
          }
        }


    const uploadACamp = async (data) => {
      try {
        // console.log(data);
        const response = await api.post("/upload-a-camp", data);
        return response.data;
        } catch (error) {
          console.error("Error adding the item to the cart:", error.message);
          throw new Error(
            error.response?.data?.message || "Failed to add the item to the cart."
            );
          }
        }


    const uploadPhotos = async (data) => {
      try {
        // console.log(data);
        const response = await api.post("/upload-photos", data);
        return response.data;
        } catch (error) {
          console.error("Error adding the item to the cart:", error.message);
          throw new Error(
            error.response?.data?.message || "Failed to add the item to the cart."
            );
          }
        }



    const uploadArticle = async (data) => {
      try {
        // console.log(data);
        const response = await api.post("/upload-article", data);
        return response.data;
        } catch (error) {
          console.error("Error adding the item to the cart:", error.message);
          throw new Error(
            error.response?.data?.message || "Failed to add the item to the cart."
            );
          }
        }



    const getArticle = async () => {
      try {
      
        const response = await api.get("/get-article");
        return response.data;
        } catch (error) {
          console.error("Error adding the item to the cart:", error.message);
          throw new Error(
            error.response?.data?.message || "Failed to add the item to the cart."
            );
          }
        }



    const createPaymentIntent = async (totalPrice) => {
      try {
        console.log(totalPrice);
        const data = {
          totalPrice: totalPrice
        }
        const response = await api.post('/create-payment-intent', { totalPrice }, {
          headers: {
            'Content-Type': 'application/json',
          },})

        return response.data;
        } catch (error) {
          console.error("Error adding the item to the cart:", error.message);
          throw new Error(
            error.response?.data?.message || "Failed to add the item to the cart."
            );
          }
        }




  const  postPaymentInfo =  async (payment) => {
    try {
   
      console.log(payment)
      const response = await api.post('/payments', payment)

      // return true;
      return response.data;
      } catch (error) {
        console.error("Error adding the item to the cart:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to add the item to the cart."
          );
        }
      }

  const  postReview =  async (review) => {
    try {
   
      // console.log(review)
      const response = await api.post('/reviews', review)
      console.log(response);
      // return true;
      return response.data;
      } catch (error) {
        console.error("Error adding the item to the cart:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to add the item to the cart."
          );
        }
      }


      //______________PaymentHistory.jsx

      const getPaymentHistory = async (email)=>{
        try {
  
          console.log(email);
          const response = await api.get(`/payment-history/${email}`);
          return handleResponse(response);
        } catch (error) {
          console.error("Error fetching volunteer requests:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to fetch requests"
        );
        }
      }
    
      const getAllPaymentHistory = async ()=>{
        try {
  
       
          const response = await api.get(`/all-payment-history`);
          return handleResponse(response);
        } catch (error) {
          console.error("Error fetching volunteer requests:", error.message);
        throw new Error(
          error.response?.data?.message || "Failed to fetch requests"
        );
        }
      }
    


  // Return the methods and logic for usage in components
  return {
    jwtTokenValidation,
    logoutRoute,

    getMenuData,
    getReviews,

    addToCart,
    getCart,
    
    deleteFromCart,

    createUser,

    getAllUsers,
    deleteUser,
    updateUserRole,

    verifyAdmin,

    uploadMenu,
    
    deleteMenuItem,
    updateMenuItem,
    
    createPaymentIntent,
    postPaymentInfo,

    getPaymentHistory,

    adminStats,

    postReview,


    // start new
    uploadACamp,
    getCampData,
    updateCampItem,
    deleteCampItem,
    joinToCamp,
    getRegisterCamp,
    deleteFromJoinCamp,
    getSingleUser,
    updateUser,
    getJoinCamp,
    updateConfirmationStatus ,
    getAllPaymentHistory,
    uploadMessage,
    getMessage,
    uploadReplyMessage,
    getReplyMessage,
    deleteReplyMessage,
    deleteMessage,
    uploadPhotos,
    getPhotos,
    uploadArticle,
    getArticle,



    checkUserApproved,
  };
};

export default ApiComponent;
