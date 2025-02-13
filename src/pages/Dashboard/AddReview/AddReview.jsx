import React from 'react';
import { useForm } from 'react-hook-form';

import { useFirebaseAuth } from '../../../hooks/useAuth';
import ApiComponent from '../../../API/ApiComponent';
import Rating from 'react-rating-stars-component'; // npm install react-rating-stars-component
import Swal from 'sweetalert2'; // npm install sweetalert2
import { useMutation } from '@tanstack/react-query';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';

const AddReview = () => {
  const { postReview } = ApiComponent(); // Fetching API functionality
  const { user } = useFirebaseAuth();
  const { register, handleSubmit, reset, setValue } = useForm(); // React Hook Form
  const name = user?.displayName;


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

     reset();
    
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



  const onSubmit = (data) => {
    const reviewData = {
      name: name || 'Anonymous',
      rating: data.rating,
      review: data.review,
      email: user?.email || '',
    };
    // console.log(reviewData);
    postReviewMutation.mutate(reviewData);
  };

  const handleRatingChange = (rating) => {
    setValue('rating', rating); // Update rating value in React Hook Form
  };

  return (
    <div className="add-review w-10/12 mx-auto">
      <SectionHeading title1={'---Your Opinion---'} title2={"Review Us"}></SectionHeading>
    
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-200 rounded-2xl shadow-xl p-6 mb-8">
        {/* User Name (read-only if logged in) */}
        <div>
          <label className="block mb-2 font-semibold">Your Name</label>
          <input
            type="text"
            value={name || 'Anonymous'}
            readOnly
            className="w-full p-2 border rounded-2xl"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-2 font-semibold">Rating</label>
          <Rating
            count={5}
            size={30}
            activeColor="#ffd700"
            onChange={handleRatingChange}
          />
          <input
            type="hidden"
            {...register('rating', { required: 'Rating is required' })}
          />
        </div>

        {/* Review Message */}
        <div>
          <label className="block mb-2 font-semibold">Your Review</label>
          <textarea
            {...register('review', { required: 'Review message is required' })}
            rows="4"
            placeholder="Write your review here..."
            className="w-full p-2 border rounded-2xl"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={postReviewMutation.isLoading}
          className="bg-[#B5853A] text-white px-4 py-2 rounded hover:bg-[#b67711]"
        >
          {postReviewMutation.isLoading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
