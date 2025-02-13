





import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import ApiComponent from "../../../API/ApiComponent";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY; // Add your API key in the environment variable

const AddACamp = () => {
  const [loading, setLoading] = useState(false);
  const {uploadACamp} = ApiComponent();

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  
  const createCampMutation = useMutation({
   mutationFn: (campData) => uploadACamp(campData), 
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Camp Added Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      setLoading(false);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error Adding Camp",
        text: "Something went wrong. Please try again later.",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    },
  });




  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const imgResponse =  await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageHostingKey}`,
        formData
      );



      if (imgResponse.data.success) {
        const campData = {
          campName: data.campName,
          imageUrl: imgResponse.data.data.display_url,
          campFees: parseFloat(data.campFees),
          dateTime: data.dateTime,
          location: data.location,
          healthcareProfessional: data.healthcareProfessional,
          participantCount: 0, // Default starting value
          description: data.description,
        };

        console.log(campData);
        createCampMutation.mutate(campData);
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Failed to upload the image. Please try again.",
      });
    }
  };

  return (
    <div className="bg-[#fafafa] flex flex-col justify-start items-center min-h-screen pb-4">
      <SectionHeading title1={"---Organize a Camp---"} title2={"Add A Camp"} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-10/12 mx-auto bg-[#F3F3F3] shadow-md rounded-lg p-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Camp Name*</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter camp name"
            {...register("campName", { required: "Camp name is required" })}
          />
          {errors.campName && <p className="text-red-500 text-sm">{errors.campName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image*</label>
          <input
            type="file"
            accept="image/*"
            className="block w-full py-4 text-sm text-black file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-[#E8E8E8] file:text-black hover:file:bg-[#d3d2d2]"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Camp Fees*</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter fees"
              {...register("campFees", { required: "Camp fees are required" })}
            />
            {errors.campFees && <p className="text-red-500 text-sm">{errors.campFees.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Date & Time*</label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border rounded-md"
              {...register("dateTime", { required: "Date and time are required" })}
            />
            {errors.dateTime && <p className="text-red-500 text-sm">{errors.dateTime.message}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location*</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter location"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Healthcare Professional Name*
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter professional's name"
            {...register("healthcareProfessional", {
              required: "Healthcare professional name is required",
            })}
          />
          {errors.healthcareProfessional && (
            <p className="text-red-500 text-sm">{errors.healthcareProfessional.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description*</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
            placeholder="Enter a brief description"
            {...register("description", { required: "Description is required" })}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="flex justify-center">
        <button
          type="submit"
         className="bg-gradient-to-r from-[#4335A7] to-[#5544d9] text-white py-3 px-12 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300 "
        >
          {loading ? "Submitting..." : "Add Camp"}
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddACamp;

