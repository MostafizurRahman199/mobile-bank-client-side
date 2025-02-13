

import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import contactAnimation from "../../../public/contact3.json"; // Ensure the path is correct
import Swal from 'sweetalert2';
import { useDarkMode } from "../../Context/DarkModeContext";
import { useMutation } from "@tanstack/react-query";
import ApiComponent from "../../API/ApiComponent";
import Aos from "aos";


const ContactForm = ({ name = "", email = "" , flag=false}) => {
  const { darkMode } = useDarkMode();
  const {uploadMessage} = ApiComponent()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
      email: email,
    },
  });


  const sendMessageMutation = useMutation({

    mutationFn: (data) => uploadMessage(data), 
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Message has been sent successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
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


  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


  const onSubmit = (data) => {
    const message = {
      ...data,
      createdAt : new Date()
    }
    // console.log("Form data:", message);
    sendMessageMutation.mutate(message);

    reset(); // Reset the form fields
  };

  return (
    <div
    data-aos="zoom-in"
      className={`${flag ? "flex flex-col-reverse  justify-center items-center min-h-screen  p-6" : "flex flex-col-reverse md:flex md:flex-row justify-center items-center min-h-screen  p-6"} ${
        darkMode ? "bg-[#151515]" : "bg-gray-50"
      }`}
    >
      <form

     
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full max-w-4xl p-6 space-y-6 md:p-16 ${
          darkMode ? "text-white" : " text-black rounded-2xl"
        }`}
      >
        <h2
          className={`text-2xl md:text-3xl font-bold text-center ${
            darkMode ? "text-[#5544d9]" : "text-[#4335A7]"
          }`}
        >
          Contact Us
        </h2>

        {/* Name and Email Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label
              className={`block text-sm font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
              htmlFor="name"
            >
              Name*
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              id="name"
              type="text"
              placeholder="Enter your name"
              className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4335A7] ${
                darkMode ? "bg-[#2D2D2D] text-white" : "bg-white text-black"
              }`}
              readOnly={!!name} // Make read-only if user is logged in
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              className={`block text-sm font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
              htmlFor="email"
            >
              Email*
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4335A7] ${
                darkMode ? "bg-[#2D2D2D] text-white" : "bg-white text-black"
              }`}
              readOnly={!!email} // Make read-only if user is logged in
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone Field */}
        <div>
          <label
            className={`block text-sm font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
            htmlFor="phone"
          >
            Phone*
          </label>
          <input
            {...register("phone", { required: "Phone number is required" })}
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4335A7] ${
              darkMode ? "bg-[#2D2D2D] text-white" : "bg-white text-black"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            className={`block text-sm font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
            htmlFor="message"
          >
            Message*
          </label>
          <textarea
            {...register("message", { required: "Message is required" })}
            id="message"
            rows="4"
            placeholder="Write your message here"
            className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4335A7] ${
              darkMode ? "bg-[#2D2D2D] text-white" : "bg-white text-black"
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Recaptcha and Submit */}
        <div className="space-y-6">
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 md:w-auto bg-[#4335A7] text-white py-3 px-6 hover:bg-[#5544d9] transition-all `}
            >
              <p className="text-xl">Send Message</p>
              <IoIosSend className="text-3xl" />
            </button>
          </div>
        </div>
      </form>

      {/* Lottie Animation */}
      <div
     
      className=" md:w-1/2">
        <Lottie
          animationData={contactAnimation} // Path to Lottie file
          loop={true}
          className={`${flag ? "hidden" : "h-full w-full"}`}
        />
      </div>


    </div>
  );
};

export default ContactForm;
