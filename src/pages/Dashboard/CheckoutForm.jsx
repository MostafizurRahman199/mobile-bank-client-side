import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import ApiComponent from "../../API/ApiComponent";
import { useFirebaseAuth } from "../../hooks/useAuth";

const CheckoutForm = ({ camp }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();

  const { createPaymentIntent, postPaymentInfo } = ApiComponent();

  useEffect(() => {
    if (camp?.campFees) {
      paymentIntentMutation.mutate(camp?.campFees);
    }
  }, [camp?.campFees]);

  // Payment Intent Mutation
  const paymentIntentMutation = useMutation({
    mutationFn: () => createPaymentIntent(camp?.campFees),
    onSuccess: (response) => {
      setClientSecret(response.client_secret);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to initialize payment. ${error.response?.data?.message || error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  // Payment Mutation
  const paymentMutation = useMutation({
    mutationFn: (payment) => postPaymentInfo(payment),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Your payment has been processed successfully.`,
        showConfirmButton: true,
      });
      navigate("/dashboard/payment-history");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to save payment information. ${error.response?.data?.message || error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setIsProcessing(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "Unknown",
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setIsProcessing(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const payment = {
          email: user?.email,
          name: user?.displayName,
          joinCampId: camp?._id,
          campName: camp?.campName,
          campFees: camp?.campFees,
          location: camp?.location,
          date: new Date().toISOString(),
          transactionId: result.paymentIntent.id,
          status: "paid",
          confirmationStatus:"pending"
        };

        paymentMutation.mutate(payment);
        setError(null);
        setIsProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-gray-300 p-3 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full bg-[#4335A7] text-white font-bold py-3 rounded-md transition ${
          isProcessing ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isProcessing ? "Processing..." : `Pay ${camp?.campFees} BDT`}
      </button>
    </form>
  );
};

export default CheckoutForm;
