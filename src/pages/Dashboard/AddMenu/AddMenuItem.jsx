

import React, { useState } from "react";
import axios from "axios";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { ImSpoonKnife } from "react-icons/im";
import ApiComponent from "../../../API/ApiComponent";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY; // Add your API key in the environment variable

const AddMenuItem = () => {
  const { uploadMenu } = ApiComponent();
  const [loading , setLoading] = useState(false);
  const [recipe, setRecipe] = useState({
    name: "",
    category: "",
    price: "",
    recipe: "",
    files: [],
  });

  const [uploadedImages, setUploadedImages] = useState([]); // Store uploaded image URLs





  const uploadMenuMutation = useMutation({

    mutationFn: (menuData) => uploadMenu(menuData), 
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Menu Item Added!",
        text: "The menu item has been added successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      setLoading(false);
      setRecipe({
        name: "",
        category: "",
        price: "",
        recipe: "",
        files: [],
      })
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to upload menu item. ${
          error.response?.data?.message || error.message
        }`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    },
  });





  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };




  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setRecipe({ ...recipe, files });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (recipe.files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      const uploadedUrls = [];
      for (let file of recipe.files) {
        const formData = new FormData();
        formData.append("image", file);
        setLoading(true);
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
          formData
        );

        uploadedUrls.push(response.data.data.url); // Store the uploaded image URL
      }

      setUploadedImages(uploadedUrls); // Save all uploaded URLs
      console.log("Uploaded Image URLs: ", uploadedUrls);

      // Now you can send the recipe data (including the image URLs) to your backend

      const finalMenuData = {
        name: recipe.name,
        category : recipe.category,
        price: parseFloat(recipe.price),
        recipe: recipe.recipe,
        imageUrls: uploadedUrls,
      };


      console.log("Final Recipe Data: ", finalMenuData);
      
      // ____________now data will upload on database

      uploadMenuMutation.mutate(finalMenuData);
      // alert("Recipe added successfully!");



    } catch (error) {
      setLoading(false);
      console.error("Error uploading images: ", error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Failed to upload images. Please try again.",
      });

    }
  };

  return (
    <div className="bg-[#fafafa] flex flex-col justify-start items-center min-h-screen pb-4 border-2">
      <SectionHeading
        title1={"---What's new?---"}
        title2={"ADD AN ITEM"}
      ></SectionHeading>

      <form
        onSubmit={handleSubmit}
        className="w-10/12 mx-auto bg-[#F3F3F3] shadow-md rounded-lg p-8"
      >
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-1"
          >
            Recipe name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            placeholder="Recipe name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1a054]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={recipe.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1a054]"
              required
            >
              <option value="">Select category</option>
              <option value="salad">salad</option>
              <option value="dessert">dessert</option>
              <option value="popular">popular</option>
              <option value="pizza">pizza</option>
              <option value="soup">soup</option>
              <option value="drinks">drinks</option>
            </select>
          </div>

          <div className="mb-2">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Price*
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={recipe.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1a054]"
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <label
            htmlFor="recipe"
            className="block text-gray-700 text-sm font-bold mb-1"
          >
            Recipe Details*
          </label>
          <textarea
            id="recipe"
            name="recipe"
            value={recipe.recipe}
            onChange={handleChange}
            placeholder="Recipe Details"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1a054]"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-2">
          <label
            htmlFor="file"
            className="block text-gray-700 text-sm font-bold mb-1"
          >
            Upload Images
          </label>
          <input
            type="file"
            id="file"
            name="files"
            onChange={handleFileChange}
            multiple // Allow multiple file selection
            className="block w-full text-sm text-black file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-[#E8E8E8] file:text-black hover:file:bg-[#d3d2d2]"
          />
        </div>

        <div className="flex justify-start">
         
          <button
          type="submit"
          className="w-fit flex gap-1 items-center bg-[#d1a054] text-white py-2 px-4 hover:bg-[#c69141] focus:outline-none focus:ring-2 focus:ring-[#d1a054]"
        >
          <p>Add Item</p>
          {
             loading ?  <span className="loading loading-spinner loading-md"></span> : <ImSpoonKnife />
          }
        </button>
         
        </div>
      </form>
    </div>
  );
};

export default AddMenuItem;
