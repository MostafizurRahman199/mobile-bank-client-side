


import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Lottie from "lottie-react";
import registerAnimation from "../../public/mobileback.json";
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
