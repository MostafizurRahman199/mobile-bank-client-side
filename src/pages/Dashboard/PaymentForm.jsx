import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


// Load Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ camp }) => {
  return (
    <div className="h-fit flex items-start justify-center py-20">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-2xl">
        <h1 className="text-center text-2xl font-light mb-6 text-[#4335A7]">
          Payment for {camp?.campName}
        </h1>
        <div className="py-4">
          <p className="text-lg font-semibold">Camp Fees: {camp?.campFees} BDT</p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm camp={camp} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentForm;
