


// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import Aos from "aos";
// import Swal from "sweetalert2";
// import registerAnimation from "../../public/medicalThemeSignUp.json";
// import Lottie from "lottie-react";
// import { useForm } from "react-hook-form";
// import { useFirebaseAuth } from "../hooks/useAuth";
// import ApiComponent from "../API/ApiComponent";
// import { useMutation } from "@tanstack/react-query";
// import GoogleSignIn from "../components/SocialLogin/GoogleSignIn";
// import axios from "axios";
// import Spinner from "../components/Spinner/Spinner";

// const Register = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { registerUser, googleSignIn, setUser } = useFirebaseAuth();
//   const { createUser } = ApiComponent();
//   const { register, handleSubmit, setValue, watch, reset } = useForm();
//   const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState("");
//   const from = location.state?.from || "/";
//   const [loading, setLoading] = useState(false);




//   useEffect(() => {
//     Aos.init({ duration: 1000 });
//   }, []);

//   const validatePassword = (password) => {
//     if (password.length < 6) {
//       setPasswordError("Password must be at least 6 characters long");
//       return false;
//     }
//     if (!/[A-Z]/.test(password)) {
//       setPasswordError("Password must contain an uppercase letter");
//       return false;
//     }
//     if (!/[a-z]/.test(password)) {
//       setPasswordError("Password must contain a lowercase letter");
//       return false;
//     }
//     setPasswordError("");
//     return true;
//   };

//   const createUserMutation = useMutation({
//     mutationFn: (userInfo) => createUser(userInfo),
//     onSuccess: (data) => {
//       Swal.fire({
//         position: "top-center",
//         icon: "success",
//         title: "Register Successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       navigate("/");
//     },
//     onError: () => {
//       Swal.fire({
//         position: "top-center",
//         icon: "error",
//         title: "Something went wrong. Try again!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     },
//   });


  



//   const onSubmit = async (data) => {
//     setLoading(true)
//     const { name, email, password, image } = data;

//     if (!validatePassword(password)) return;

//     const formData = new FormData();
//     formData.append("image", image[0]);

//     try {
//       const imgResponse = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${imageHostingKey}`,
//         formData
//       );

//       if (imgResponse.data.success) {
//         const photoURL = imgResponse.data.data.display_url;

//         const registeredUser = await registerUser(email, password, name, photoURL);
//         setUser(registeredUser);

//         if (registeredUser) {
//           const userInfo = {
//             email,
//             name,
//             photoURL,
//             createAt: new Date(),
//             role: "Member",
//           };
//           createUserMutation.mutate(userInfo);
//           setLoading(false);
//         }
//       }
//     } catch (error) {
//       toast.error("Image upload failed or other error occurred", "error");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="md:w-10/12 min-screen-h mx-auto flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
//       <div
//         className="w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:shadow-2xl space-y-8 p-8 rounded-2xl bg-gray-100"
//         data-aos="fade-up"
//       >
//         <div className="flex-1">
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-[#4335a7]">
//             Create your account
//           </h2>
//           <form className="mt-8 space-y-3" onSubmit={handleSubmit(onSubmit)}>
//             <div className="space-y-2">
              
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className=" w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-3xl focus:outline-none focus:ring-black focus:border-black"
//                 {...register("name", { required: true })}
//               />

//               <input
//                 type="email"
//                 placeholder="Email address"
//                 className=" w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-3xl focus:outline-none focus:ring-black focus:border-black"
//                 {...register("email", { required: true })}
//               />

           
//              {/* <div className="md:flex items-center justify-between pl-2 pr-4 lg:pr-8 w-full bg-white rounded-3xl border-2 border-dotted border-[#5544d9]">

//              <input

//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 className=" w-fit   py-2 text-sm text-[#5544d9] file:mr-3  file:py-2 file:rounded-3xl file:px-3  file:border-0 file:text-sm file:bg-blue-50 file:text-[#5544d9] hover:file:bg-blue-100"
//                 {...register("image", { required: true })}
           
//               />
//               <label htmlFor="image-upload" className="text-[#5544d9]">
//                 Your Image
//               </label>
//              </div> */}

//             <div className="flex px-2 flex-col items-center justify-center md:flex md:flex-row  md:justify-between md:items-center  lg:pr-2 w-full bg-white rounded-3xl border-2 border-dotted border-[#5544d9]">
              
//               {/* File Input */}
//               <input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 className="w-full mx-auto  py-2 text-sm text-[#5544d9] file:mr-3 file:py-2 file:rounded-3xl file:px-3 file:border-0 file:text-sm file:bg-blue-50 file:text-[#5544d9] hover:file:bg-blue-100"
//                 {...register("image", { required: true })}
//               />
              
//               {/* Label */}
//               <label htmlFor="image-upload" className=" text-[#5544d9] ml-2 md:ml-4 mt-2 md:mt-0">
//                 Your_Image
//               </label>

//             </div>






//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   className=" w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-3xl focus:outline-none focus:ring-black focus:border-black"
//                   {...register("password", { required: true })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <FaEye className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <FaEyeSlash className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//               {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
//             </div>
//            {
//             loading ? <> 
            
//             <button
//             type="submit"
//             className="group relative w-full flex justify-center gap-2 bg-[#4335a7] hover:bg-[#5544d9] text-sm font-bold px-8 py-3 rounded-3xl text-white"
//           >
//            <Spinner></Spinner>
//           </button></> : <> 
          
//           <button
//             type="submit"
//             className="group relative w-full flex justify-center bg-[#4335a7] hover:bg-[#5544d9] text-sm font-bold px-8 py-3 rounded-3xl text-white"
//           >
//             Register
//           </button></>
//            }
//           </form>
//           <div className="mt-1 flex items-center">
//             <div className="flex-grow border-t border-gray-300"></div>
//             <span className="mx-4 text-gray-500">or</span>
//             <div className="flex-grow border-t border-gray-300"></div>
//           </div>
//           <GoogleSignIn title="Register" from={from} />
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="font-medium text-[#4335a7] hover:text-[#5544d9]"
//             >
//               Login here
//             </Link>
//           </p>
//         </div>
//         <div className="flex-1 flex justify-center items-center">
//           <Lottie animationData={registerAnimation} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import Lottie from "lottie-react";
// import registerAnimation from "../../public/medicalThemeSignUp.json";
// import Spinner from "../components/Spinner/Spinner";
// import Aos from "aos";
// import "aos/dist/aos.css";
// import ApiComponent from "../API/ApiComponent";
// import { useFirebaseAuth } from "../hooks/useAuth";


// const Register = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { register, handleSubmit, reset } = useForm();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//     const { createUser } = ApiComponent();
//   const from = location.state?.from || "/";
//     const { registerUser, setUser } = useFirebaseAuth();

//   useEffect(() => {
//     Aos.init({ duration: 1000 });
//   }, []);







//   // useMutation to handle user registration
//   const createUserMutation = useMutation({
//     mutationFn:(userInfo)=> createUser(userInfo),
//     onSuccess: async (data) => {
//       Swal.fire({
//         position: "top-center",
//         icon: "success",
//         title: "Register Successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       reset();
//       return true;

//     },
//     onError: (error) => {
//       Swal.fire({
//         position: "top-center",
//         icon: "error",
//         title: error.response?.data?.message || "Something went wrong. Try again!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     },
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     const { name, email, phone, pin, accountType, nid } = data;
//     // Validate PIN (5-digit number)
//     if (pin.length !== 5 || isNaN(pin)) {
//       toast.error("PIN must be exactly 5 digits.");
//       setLoading(false);
//       return;
//     }


//     const flag = createUserMutation.mutate({
//         name,
//         email,
//         phone,
//         pin,
//         accountType,
//         nid,
//       });
    
//       if(flag){
//         const registeredUser = await registerUser(email,pin);
//         if(registeredUser){
//         setUser(registeredUser);
//         navigate("/login");
//       }
//       }

    

//     setLoading(false);
//   };

//   return (
//     <div className="md:w-10/12 min-screen-h mx-auto flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
//       <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:shadow-2xl space-y-8 p-8 rounded-2xl bg-gray-100" data-aos="fade-up">
//         <div className="flex-1">
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-[#4335a7]">Create Your Account</h2>
//           <form className="mt-8 space-y-3" onSubmit={handleSubmit(onSubmit)}>
//             <div className="space-y-2">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
//                 {...register("name", { required: true })}
//               />
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
//                 {...register("email", { required: true })}
//               />
//               <input
//                 type="text"
//                 placeholder="Mobile Number"
//                 className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
//                 {...register("phone", { required: true })}
//               />
//               <input
//                 type="text"
//                 placeholder="National ID (NID)"
//                 className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
//                 {...register("nid", { required: true })}
//               />
//               <select
//                 className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
//                 {...register("accountType", { required: true })}
//               >
//                 <option value="">Select Account Type</option>
//                 <option value="User">User</option>
//                 <option value="Agent">Agent</option>
//               </select>

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="5-digit PIN"
//                   className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
//                   {...register("pin", { required: true })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaEye className="h-5 w-5 text-gray-400" /> : <FaEyeSlash className="h-5 w-5 text-gray-400" />}
//                 </button>
//               </div>
//             </div>

//             {loading ? (
//               <button className="w-full flex justify-center gap-2 bg-[#4335a7] text-white font-bold px-8 py-3 rounded-3xl">
//                 <Spinner />
//               </button>
//             ) : (
//               <button type="submit" className="w-full flex justify-center bg-[#4335a7] text-white font-bold px-8 py-3 rounded-3xl">
//                 Register
//               </button>
//             )}
//           </form>

//           <p className="mt-2 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="font-medium text-[#4335a7] hover:text-[#5544d9]">
//               Login here
//             </Link>
//           </p>
//         </div>

//         <div className="flex-1 flex justify-center items-center">
//           <Lottie animationData={registerAnimation} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import Lottie from "lottie-react";
// import registerAnimation from "../../public/medicalThemeSignUp.json";
// import Spinner from "../components/Spinner/Spinner";
// import Aos from "aos";
// import "aos/dist/aos.css";
// import ApiComponent from "../API/ApiComponent";
// import { useFirebaseAuth } from "../hooks/useAuth";

// const Register = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { register, handleSubmit, reset } = useForm();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { createUser } = ApiComponent();
//   const { registerUser, setUser } = useFirebaseAuth();
//   const from = location.state?.from || "/";

//   useEffect(() => {
//     Aos.init({ duration: 1000 });
//   }, []);

//   // ✅ Mutation for database user creation (checks if user exists)
//   const createUserMutation = useMutation({
//     mutationFn: async (userInfo) => {
//       const response = await createUser(userInfo);
//       return response;
//     },
//     onSuccess: async (data, variables) => {
//       // ✅ If database check passes, create user in Firebase
//       const registeredUser = await registerUser(variables.email, variables.pin);
//       if (registeredUser) {
//         setUser(registeredUser);
//         Swal.fire({
//           position: "top-center",
//           icon: "success",
//           title: "Registration Successful!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         reset();
//         navigate("/login");
//       }
//     },
//     onError: (error) => {
//       Swal.fire({
//         position: "top-center",
//         icon: "error",
//         title: error.response?.data?.message || "Something went wrong. Try again!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     },
//   });

//   // ✅ Form submission
//   const onSubmit = (data) => {
//     setLoading(true);
//     const { name, email, phone, pin, accountType, nid } = data;

//     // ✅ Validate PIN (must be 5 digits)
//     if (pin.length !== 5 || isNaN(pin)) {
//       toast.error("PIN must be exactly 5 digits.");
//       setLoading(false);
//       return;
//     }

//     // ✅ First, check if the user can be created in the database
//     createUserMutation.mutate({ name, email, phone, pin, accountType, nid });

//     setLoading(false);
//   };

//   return (
//     <div className="md:w-10/12 min-screen-h mx-auto flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
//       <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:shadow-2xl space-y-8 p-8 rounded-2xl bg-gray-100" data-aos="fade-up">
//         <div className="flex-1">
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-[#4335a7]">Create Your Account</h2>
//           <form className="mt-8 space-y-3" onSubmit={handleSubmit(onSubmit)}>
//             <div className="space-y-2">
//               <input type="text" placeholder="Full Name" {...register("name", { required: true })} />
//               <input type="email" placeholder="Email address" {...register("email", { required: true })} />
//               <input type="text" placeholder="Mobile Number" {...register("phone", { required: true })} />
//               <input type="text" placeholder="National ID (NID)" {...register("nid", { required: true })} />
//               <select {...register("accountType", { required: true })}>
//                 <option value="">Select Account Type</option>
//                 <option value="User">User</option>
//                 <option value="Agent">Agent</option>
//               </select>
//               <div className="relative">
//                 <input type={showPassword ? "text" : "password"} placeholder="5-digit PIN" {...register("pin", { required: true })} />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </button>
//               </div>
//             </div>
//             {loading ? <Spinner /> : <button type="submit">Register</button>}
//           </form>
//         </div>
//         <div className="flex-1 flex justify-center items-center">
//           <Lottie animationData={registerAnimation} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;





import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Lottie from "lottie-react";
import registerAnimation from "../../public/medicalThemeSignUp.json";
import Spinner from "../components/Spinner/Spinner";
import Aos from "aos";
import "aos/dist/aos.css";
import ApiComponent from "../API/ApiComponent";
import { useFirebaseAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createUser } = ApiComponent();
  const { registerUser, setUser } = useFirebaseAuth();
  const from = location.state?.from || "/";

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // ✅ Mutation for database user creation (checks if user exists)
  const createUserMutation = useMutation({
    mutationFn: async (userInfo) => {
      const response = await createUser(userInfo);
      return response;
    },
    onSuccess: async (data, variables) => {
      // ✅ If database check passes, create user in Firebase
      const registeredUser = await registerUser(variables.email, variables.pin, variables.name);
     
      if (registeredUser) {
       
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Registration Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setUser(null);
        navigate("/login");
      }
    },
    onError: (error) => {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: error.response?.data?.message || "Something went wrong. Try again!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  // ✅ Form submission
  const onSubmit = (data) => {
    setLoading(true);
    const { name, email, phone, pin, accountType, nid } = data;

    // ✅ Validate PIN (must be 5 digits)
    if (pin.length !== 5 || isNaN(pin)) {
      toast.error("PIN must be exactly 5 digits.");
      setLoading(false);
      return;
    }

    // ✅ First, check if the user can be created in the database
    createUserMutation.mutate({ name, email, phone, pin, accountType, nid });

    setLoading(false);
  };

  return (
    <div className="md:w-10/12 min-screen-h mx-auto flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 sm:shadow-2xl space-y-8 p-8 rounded-2xl bg-gray-100" data-aos="fade-up">
        {/* Left Side - Registration Form */}
        <div className="flex-1">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#4335a7]">Create Your Account</h2>
          <form className="mt-8 space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
                {...register("name", { required: true })}
              />
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
                {...register("email", { required: true })}
              />
              <input 
                type="text" 
                placeholder="Mobile Number" 
                className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
                {...register("phone", { required: true })}
              />
              <input 
                type="text" 
                placeholder="National ID (NID)" 
                className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
                {...register("nid", { required: true })}
              />
              <select 
                className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
                {...register("accountType", { required: true })}
              >
                <option value="">Select Account Type</option>
                <option value="User">User</option>
                <option value="Agent">Agent</option>
              </select>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="5-digit PIN" 
                  className="w-full px-3 py-4 border border-gray-300 rounded-3xl focus:outline-none"
                  {...register("pin", { required: true })}
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye className="h-5 w-5 text-gray-400" /> : <FaEyeSlash className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            {loading ? (
              <button className="w-full flex justify-center gap-2 bg-[#4335a7] text-white font-bold px-8 py-3 rounded-3xl">
                <Spinner />
              </button>
            ) : (
              <button type="submit" className="w-full flex justify-center bg-[#4335a7] text-white font-bold px-8 py-3 rounded-3xl">
                Register
              </button>
            )}
          </form>

          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#4335a7] hover:text-[#5544d9]">
              Login here
            </Link>
          </p>
        </div>

        {/* Right Side - Animation */}
        <div className="flex-1 flex justify-center items-center">
          <Lottie animationData={registerAnimation} />
        </div>
      </div>
    </div>
  );
};

export default Register;
