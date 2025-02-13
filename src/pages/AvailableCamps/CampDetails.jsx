import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useCamp from '../../hooks/useCamp';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserMd, FaUsers, FaDollarSign } from 'react-icons/fa';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useFirebaseAuth } from '../../hooks/useAuth';
import ApiComponent from '../../API/ApiComponent';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const CampDetails = () => {
  const { campData, isLoading, isError, error, refetch } = useCamp();
  const {joinToCamp} = ApiComponent();
  const {user} = useFirebaseAuth();
  const name = user?.displayName;
  const email = user?.email
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    phoneNumber: '',
    gender: '',
    emergencyContact: '',
  });

  const campDetails = campData?.find((camp) => camp._id === id);



  const joinToCampMutation = useMutation({
    mutationFn : (data) => joinToCamp(data),
     onSuccess: (data) => {
   
   
       
       refetch();
   
       Swal.fire({
         position: "top-center",
         icon: "success",
         title: "Joined Camp Successfully!",
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
   })
   




  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!campDetails) {
    return <div>Camp not found.</div>;
  }

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const participantData = {
      campId: campDetails._id,
      campName: campDetails.campName,
      campFees: campDetails.campFees,
      location: campDetails.location,
      healthcareProfessional: campDetails.healthcareProfessional,
      participantName: name, // Replace with actual logged-in user name
      participantEmail: email, // Replace with actual logged-in user email
      paymentStatus : "unpaid",
      confirmationStatus: "pending",

      ...formData,
    };

    try {

        console.log(participantData);

        if(!user){
            Swal.fire({
              title: "Have to login to add item on cart",
              text: "Please login for joining",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Login"
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login", {state: {from: pathname}});
              }
            });
          }else{
      
            joinToCampMutation.mutate(participantData);
          }
      


    //   const response = await fetch('/api/participants', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(participantData),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to register participant');
    //   }

    //   alert('You have successfully joined the camp!');
      handleModalToggle();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-20 bg-white shadow-lg rounded-lg">
    
     <div className="text-center space-y-6 mb-4">
  {/* Camp Name */}
  <h1 className="text-4xl font-extrabold text-[#4335A7] tracking-wide leading-tight">
    {campDetails?.campName}
  </h1>

  {/* Image */}
  <div className="relative group">
    <img
      src={campDetails?.imageUrl}
      alt={campDetails?.campName}
      className="w-full h-72 object-cover rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
    />
    {/* Overlay Effect */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
</div>


   

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date & Time */}
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow p-6 rounded-lg flex items-center gap-4">
                <FaCalendarAlt className="text-3xl text-[#4335A7]" />
                <div>
                <p className="text-sm font-semibold text-gray-500">Date & Time</p>
                <p className="text-lg text-gray-700 font-medium">
                    {new Date(campDetails?.dateTime).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    })}
                </p>
                </div>
            </div>

            {/* Location */}
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow p-6 rounded-lg flex items-center gap-4">
                <FaMapMarkerAlt className="text-3xl text-[#4335A7]" />
                <div>
                <p className="text-sm font-semibold text-gray-500">Location</p>
                <p className="text-lg text-gray-700 font-medium">{campDetails?.location}</p>
                </div>
            </div>

            {/* Healthcare Professional */}
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow p-6 rounded-lg flex items-center gap-4">
                <FaUserMd className="text-3xl text-[#4335A7]" />
                <div>
                <p className="text-sm font-semibold text-gray-500">Healthcare Professional</p>
                <p className="text-lg text-gray-700 font-medium">
                    {campDetails?.healthcareProfessional}
                </p>
                </div>
            </div>

            {/* Participant Count */}
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow p-6 rounded-lg flex items-center gap-4">
                <FaUsers className="text-3xl text-[#4335A7]" />
                <div>
                <p className="text-sm font-semibold text-gray-500">Participants</p>
                <p className="text-lg text-gray-700 font-medium">
                    {campDetails?.participantCount || 0} Participants
                </p>
                </div>
            </div>

            {/* Camp Fees */}
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow p-6 rounded-lg flex items-center gap-4">
                <FaDollarSign className="text-3xl text-[#4335A7]" />
                <div>
                <p className="text-sm font-semibold text-gray-500">Camp Fees</p>
                <p className="text-lg text-gray-700 font-medium">
                    {campDetails?.campFees || 0} BDT
                </p>
                </div>
            </div>
            </div>

            
            
            <div className="py-6 my-4 px-4 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-[#4335A7] mb-4">About the Camp</h2>
                <div className="border-l-4 border-[#3D3BF3] pl-4">
                    <p className="text-gray-700 text-lg text-justify leading-relaxed">
                    {campDetails?.description}
                    </p>
        </div>
        </div>

    
      <button
        className="bg-[#4335A7] text-white py-2 px-6 rounded-md mt-6 hover:bg-[#5544d9] transition"
        onClick={handleModalToggle}
      >
        Join Camp
      </button>

      <Dialog
        open={isModalOpen}
        handler={handleModalToggle}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="max-h-[calc(100vh-20px)] overflow-y-auto"
      >
        <DialogHeader>Join Camp</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Camp Name
              </label>
              <input
                type="text"
                value={campDetails?.campName}
                readOnly
                className="w-full border border-gray-300 rounded-md py-2 px-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Camp Fees
              </label>
              <input
                type="text"
                value={`${campDetails?.campFees || 0} BDT`}
                readOnly
                className="w-full border border-gray-300 rounded-md py-2 px-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={campDetails?.location}
                readOnly
                className="w-full border border-gray-300 rounded-md py-2 px-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Healthcare Professional
              </label>
              <input
                type="text"
                value={campDetails?.healthcareProfessional}
                readOnly
                className="w-full border border-gray-300 rounded-md py-2 px-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-4"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Emergency Contact
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-4"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button variant="gradient" color="red" onClick={handleModalToggle}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CampDetails;
