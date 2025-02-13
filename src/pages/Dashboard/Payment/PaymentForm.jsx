// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import useCart from "../../../hooks/useCart"
// import ApiComponent from "../../../API/ApiComponent";
// import { useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { useFirebaseAuth } from "../../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// // Load your Stripe publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// const CheckoutForm = () => {

//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const {data, totalPrice, refetch} = useCart();
//   const {createPaymentIntent , postPaymentInfo} = ApiComponent();
//   const [clientSecret, setClientSecret] = useState("");
//   const {user} = useFirebaseAuth();
//   const navigate = useNavigate()

//   const name = user?.displayName;
//   const email = user?.email;

// // console.log(totalPrice);






// useEffect(() => {
//   if (totalPrice) {
//     paymentIntentMutation.mutate(totalPrice);
//   }
// }, [totalPrice]);


// // ______________payment intent Mutation

// const paymentIntentMutation =   useMutation({

//   mutationFn: () => createPaymentIntent(totalPrice), 
//   onSuccess: (response) => {
//       console.log(response);
//       setClientSecret(response.client_secret);
      
//   },
//   onError: (error) => {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: `Failed to upload menu item. ${
//         error.response?.data?.message || error.message
//       }`,
//       showConfirmButton: false,
//       timer: 1500,
//     });
   
//   },
// });



// //____________ payment Mutation

// const paymentMutation =   useMutation({

//   mutationFn: (payment) =>{
//       console.log(payment)
//     postPaymentInfo(payment)}, 

//   onSuccess: (response) => {  
//     // console.log(response);
//   },
      
//   onError: (error) => {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: `Failed to upload menu item. ${
//         error.response?.data?.message || error.message
//       }`,
//       showConfirmButton: false,
//       timer: 1500,
//     });
   
//   },
// });





// // console.log(clientSecret);







//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement)

//     if(card === null){
//       return;
//     }

//     setIsProcessing(true);
    


// const {error, paymentMethod} = await stripe.createPaymentMethod({
//   type: 'card',
//   card: card,
//   })

//   if(error){
//     console.log("Payment error : ", error)
//       setError(result.error.message);
//       setIsProcessing(false);
//   }else{
//     console.log("Payment method created: ", paymentMethod)
//     setError("");
//   }


// //____________ confirm payment

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: card,
//         billing_details: {
//           name,  
//           email,
          
//         }
//       },
//     });


//     if (result.error) {
//       console.log("Conform Error : ", result.error);
//       setError(result.error.message);
//       setIsProcessing(false);
//     } else {
      
//       if (result.paymentIntent.status === "succeeded") {
//         // console.log("Payment confirmed");
       
//         Swal.fire({
//           icon: "success",
//           title: "Transaction Successful",
//           text: `Your Transaction ID : ${result.paymentIntent.id}`,
//         });

// // todos change
//         const payment = {
//           email : email,
//           name : name,
//           amount : totalPrice,
//           date : new Date(), //utc date convert
//           transactionId : result.paymentIntent.id,
//           cartIds : data?.map((item)=>item._id),
//           itemIds : data?.map((item)=>item.Item_id),
//           status : "pending",
//         }
//         console.log(payment);
  
//         paymentMutation.mutate(payment);
//         navigate("/dashboard/payment-history");
//         refetch();
         
//         setError(null);
//       }
//         setIsProcessing(false);

//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="border border-gray-300 p-3 rounded-md">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//       </div>

//       {error && <div className="text-red-500 text-sm">{error}</div>}

//       <button
//         type="submit"
//         disabled={!stripe || isProcessing}
//         className={`w-full bg-[#d1a054] hover:bg-[#dc9832] text-white font-bold py-3 rounded-md transition duration-300 ${
//           isProcessing ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         {isProcessing ? "Processing..." : "Pay"}
//       </button>
//     </form>
//   );
// };















const PaymentForm = ({camp}) => {
  

  return (
    <div className="h-fit flex items-start justify-center  py-12">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-6 text-black">PAYMENT</h1>
        <div className="py-4">
          <p className="text-xl ">Total Price  : {}</p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm  camp={camp}/>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentForm;
