// import axios from "axios";
// import { useFirebaseAuth } from "../Auth/AuthProvider";
// import { useNavigateContext } from "../Auth/NavigateProvider";

// const { logOut } = useFirebaseAuth();
// // Create an Axios instance
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     // The JWT token will be sent automatically via cookies with every request, so we don't need to modify headers
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (
//       error.response &&
//       (error.response.status === 401 || error.response.status === 403)
//     ) {
//       console.log("Session expired or unauthorized access!");

//       handleLogout();

//       const navigate = useNavigateContext();

//       if (navigate) {
//         navigate("/login");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// const handleLogout = async () => {
//   try {
//     await logOut();

//     // toast.success('Logout successful!');
//   } catch (error) {
//     console.error("Logout error:", error);
//   }
// };

// //____________________________ Helper function to handle responses

// const handleResponse = (response) => {
//   if (response.status >= 200 && response.status < 300) {
//     return response.data;
//   }
//   throw new Error(`HTTP Error: ${response.status}`);
// };

// // _______________________________Helper function to handle errors

// const handleError = (error) => {
//   console.error("API Error:", error.message);
//   throw error; // Rethrow the error for the caller to handle
// };

// //_____________Fetch all jobs

// export const fetchJobs = async () => {
//   try {
//     const response = await api.get("/jobs");
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// //_____________my posted job

// export const myJobPost = async (email) => {
//   try {
//     const response = await api.get(`/jobs/${email}`);
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const getJobApplication = async (jobId) => {
//   try {
//     const response = await api.get(`/viewJobApplication/${jobId}`);

//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const updateJobApplicationStatus = async (id, statusData) => {
//   try {
//     // console.log(id, statusData.status);
//     const response = await api.patch(`/jobApplication-view/${id}`, {
//       statusData,
//     });

//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// // end my posted job

// export const deleteMyJobPost = async (id) => {
//   try {
//     const response = await api.delete(`/jobs/${id}`);
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// // export const editMyJobPost = async (id) => {
// //   try {
// //     const response = await api.get(`/jobs/${id}`);
// //     return handleResponse(response);
// //   } catch (error) {
// //     handleError(error);
// //   }
// // };

// export const allJob = async () => {
//   try {
//     const response = await api.get("/allJob");
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// // Fetch job details by ID
// export const fetchJobDetails = async (id) => {
//   try {
//     const response = await api.get(`/jobDetails/${id}`);
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const updateJobPost = async (updatedData, id) => {
//   try {
//     console.log(updatedData);
//     const response = await api.put(`/jobs/${id}`, updatedData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating job post with ID: ${id}`, error);
//     throw error;
//   }
// };

// // login start
// export const jwtTokenValidation = async (data) => {
//   try {
//     // console.log(data);
//     const response = await api.post(`/jwt`, { email: data });
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// // to clear cookies
// export const logoutRoute = async () => {
//   try {
//     console.log();
//     const response = await api.post(`/logout`, {});
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// // Post a job application
// export const postJobApplication = async (data) => {
//   try {
//     const response = await api.post(`/job-applications`, data);
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const getAppliedJob = async (email) => {
//   try {
//     const response = await api.get(`/applied-job/${email}`);
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const deleteAppliedJob = async (id, jobId) => {
//   try {
//     // console.log("id : ", id)
//     // console.log("jobId : ", jobId);

//     const response = await api.delete(`/applied-job/${id}?jobId=${jobId}`);
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// // post  a job

// export const postAddJob = async (data) => {
//   try {
//     const response = await api.post(`/addJob`, data);
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// // saved job start

// export const saveJob = async (data) => {
//   try {
//     const response = await api.post(`/saveJob`, data);
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const getMySavedJobs = async (email) => {
//   try {
//     const response = await api.get(`/saveJob/${email}`);
//     return handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// };
