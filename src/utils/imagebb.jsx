import axios from "axios";

export const uploadToImageBB = async (file) => {


const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY; 
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imageHostingKey}`,
      formData
    );
    return response.data.data.url; // Return the URL of the uploaded image
  } catch (error) {
    throw new Error("Failed to upload image: " + error.message);
  }
};
