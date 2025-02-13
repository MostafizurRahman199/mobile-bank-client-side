import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import ApiComponent from "../../API/ApiComponent";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

// Star Rating Component
const StarRating = ({ rating, setRating }) => {
  const handleClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="flex mb-4">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          className={`cursor-pointer text-3xl transition duration-300 transform ${
            index < rating ? "text-yellow-500 scale-110" : "text-gray-300 hover:text-yellow-400"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const FeedbackModal = ({ isOpen, onClose, camp }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const { postReview } = ApiComponent();



  const postReviewMutation = useMutation({

    mutationFn: (reviews) => postReview(reviews), 
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Review Added!",
        text: "Thank you for your review.",
        showConfirmButton: false,
        timer: 1500,
      });

     setFeedback("");
     setRating(0);

    
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to upload review. ${
          error.response?.data?.message || error.message
        }`,
        showConfirmButton: false,
        timer: 1500,
      });
    
    },
  });






const handleFeedbackSubmit = () => {

const reviewData = {
    rating: rating,
    feedback: feedback,
    participantName: camp.participantName,
    campName: camp.campName,
    createdAt : new Date(),

}




// console.log(reviewData);
    // console.log(reviewData);
    postReviewMutation.mutate(reviewData);
    onClose();

    // Simulate feedback submission
    // alert(`Feedback submitted for ${camp.campName} with ${rating} stars.`);
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader className="bg-[#4335A7] text-white text-lg font-semibold py-4">
        Provide Feedback
      </DialogHeader>
      <DialogBody className="bg-white p-6 ">
        <div className="mb-6">
          <p className="text-xl font-bold text-[#4335A7]">{camp.campName}</p>
          <p className="text-md text-gray-600">By: <span className="font-semibold">{camp.participantName}</span></p>
        </div>

        {/* Star Rating */}
        <div>
          <strong className="text-[#4335A7]">Rate the camp:</strong>
          <StarRating rating={rating} setRating={setRating} />
        </div>

        <textarea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 mt-4 text-lg text-gray-700 focus:ring-[#4335A7] focus:outline-none"
        />

      </DialogBody>
      <DialogFooter className="space-x-4 py-4">
        <Button
          variant="outlined"
          color="red"
          onClick={onClose}
          className="w-32 py-2 text-lg font-medium border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
        >
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="indigo"
          onClick={handleFeedbackSubmit}
          className="w-32 py-2 text-lg font-medium bg-[#4335A7] hover:bg-[#5544d9] transition duration-300"
        >
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default FeedbackModal;
