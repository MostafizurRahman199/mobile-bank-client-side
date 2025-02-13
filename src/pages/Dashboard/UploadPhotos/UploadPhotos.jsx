import React, { useState } from "react";
import { uploadToImageBB } from "../../../utils/imagebb"; // Assuming this is the utility to upload images
import ApiComponent from "../../../API/ApiComponent";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { FaUpload } from "react-icons/fa"; 
import Spinner from "../../../components/Spinner/Spinner";

const UploadPhotos = () => {
  // State to hold the title and the uploaded photos URLs
  const {uploadPhotos} = ApiComponent();
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);

  // Handler for title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handler for file input change (multiple file upload)
  const handleFileChange = async (e) => {
    setLoading(true);
    const files = e.target.files;
    const fileUrls = [];

    for (let i = 0; i < files.length; i++) {
      const photo = files[i];
      const photoURL = await uploadToImageBB(photo);
      fileUrls.push(photoURL);
    }

    setPhotos(fileUrls);
    setLoading(false);
  };










  
  const uploadPhotosMutation = useMutation({
    
   mutationFn: (data) => uploadPhotos(data), 
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Photos uploaded Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
     
      setLoading(false);
      setTitle("");
      setPhotos([]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error to upload photos",
        text: "Something went wrong. Please try again later.",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    },
  });







  // Create object with title and photo URLs
  const handleSubmit = () => {
    const data = {
      title,
      photos: photos,
      createdAt : new Date(),
    };
    console.log("Uploaded Data: ", data);
    setLoading(true);
    uploadPhotosMutation.mutate(data);
    // You can save the data to the database or use it as needed
  };

  return (
    <div className="w-full md:w-10/12 mx-auto py-12">
     <SectionHeading title2={"Upload Photos for Gallery"}></SectionHeading>
      
      <div className="space-y-6">
        {/* Title Input */}

        {/* File Upload */}
       <div className="flex flex-col space-y-4 p-12 bg-white rounded-lg shadow-lg">
        <div>
          <label className="text-[#4335A7] font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-4 border-2 border-[#4335A7] rounded-lg mt-2"
            placeholder="Enter title for the photos"
          />
        </div>
       <div>
          <label className="text-[#4335A7] font-semibold">Upload Photos</label>
         

        <input
          type="file"
          onChange={handleFileChange}
          className="file:bg-blue-50 file:rounded-md file:border-none file:p-2 file:text-[#5544d9] block w-full mt-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#4335A7] hover:bg-gray-200 transition-colors"
          accept="image/*"
          multiple
        />
        </div>



        {/* Display Thumbnails */}
        {photos.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {photos.map((photoUrl, index) => (
              <div key={index} className="w-32 h-32 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={photoUrl}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading || !title || photos.length === 0}

          className={`bg-gradient-to-r from-[#4335A7] to-[#5544d9] text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300  ${loading ? "opacity-50" : ""}`}

           
          >
            {loading ? <Spinner></Spinner> : "Upload"}
          </button>
        </div>

       </div>

      </div>
    </div>
  );
};

export default UploadPhotos;
