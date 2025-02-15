


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Aos from 'aos';
import { useFirebaseAuth } from '../hooks/useAuth';
import { uploadToImageBB } from '../utils/imagebb';

import updatePic from "../../public/updatePic.png";
import updateMedical from "../../public/updateMedical.json";

import ApiComponent from '../API/ApiComponent';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import useGetUser from '../hooks/useGetUser';

const UpdateProfile = () => {

   const {updateUser} = ApiComponent() ;
  const { user, setUser, updateUserProfile } = useFirebaseAuth();
  const navigate = useNavigate();
  const {data} = useGetUser()
  
  const [formData, setFormData] = useState({
    email : user?.email,
    displayName: user?.displayName || '',
    photoURL: data?.photoURL || '',
    address: data?.address || 'N/A'               // Default to 'N/A' if not available
  });



  // This function uploads the image to ImageBB and returns the photo URL
  const handleFileUpload = async (file) => {
    const photoURL = await uploadToImageBB(file);
    return photoURL;
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


// tanStack for update


const updateUserMutation = useMutation({
    mutationFn: (userInfo) => updateUser(userInfo),
    onSuccess: (data) => {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Profile Update Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    
    },
    onError: () => {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something went wrong. Try again!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });










  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }

      // If a new photo is uploaded, get the photo URL
      let newPhotoURL = formData.photoURL;
      if (formData.photoURL instanceof File) {
        newPhotoURL = await handleFileUpload(formData.photoURL);
      }

      // Update Firebase user profile
      await updateUserProfile(formData.displayName, newPhotoURL);

      setUser({
        ...user,
        displayName: formData.displayName,
        photoURL: newPhotoURL
      });



      // console.log()


      // Update additional user data in the database
    //   await updateUserDatabase(user?.uid, {
    //     email: user?.email,
    //     displayName: formData.displayName,
    //     photoURL: newPhotoURL,
    //     contactNumber: formData.contactNumber,
    //     address: formData.address
    //   });
      
    
    console.log(formData);
    updateUserMutation.mutate(formData);


    //   toast.success('Profile updated successfully');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 flex justify-center items-start">
      <div className='p-2 sm:p-4 rounded-2xl shadow-2xl' data-aos='zoom-in-left'>
        <div className="max-w-4xl w-full shadow-2xl shadow-[#4335A7] rounded-2xl p-8 flex items-center justify-center gap-2" data-aos='zoom-in-left'>
          <div className="flex-1">
            <h2 className="font_header text-2xl sm:text-4xl font-bold mb-4 text-white ">Update Profile</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Display Name</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Photo URL</label>
                <input
                  type="file"

                  onChange={(e) => setFormData({ ...formData, photoURL: e.target.files[0] })}
                  className="block w-full py-4 text-sm text-black file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-[#E8E8E8] file:text-black hover:file:bg-[#d3d2d2]"
                />
              </div>

            

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4335A7]"
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#4335A7] to-[#5544d9] text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Update Information
              </button>
            </form>
          </div>

          <div className="flex-1 hidden md:block">
            {/* <img src={updatePic} alt="" /> */}
            <Lottie animationData={updateMedical}></Lottie>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
