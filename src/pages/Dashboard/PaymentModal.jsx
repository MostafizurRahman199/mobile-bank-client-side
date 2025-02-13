import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import PaymentForm from "./PaymentForm";


const PaymentModal = ({ isOpen, onClose, camp, onPaymentSuccess }) => {
  const handlePayment = () => {
    // Simulate payment success and update the database
    alert(`Payment successful for ${camp.campName}`);
    onPaymentSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} handler={onClose} className="relative">
      {/* <DialogHeader>Complete Payment</DialogHeader> */}
        <div className="flex justify-end ">
        <Button className="rounded-lb-lg rounded-lt-none hover:bg-gray-200"  variant="gradient" color="white" onClick={onClose}>
          ❌
        </Button>
        </div>

      <DialogBody>
        <PaymentForm camp={camp}></PaymentForm>
      </DialogBody>
     
        {/* <DialogFooter className="flex justify-end">
      </DialogFooter> */}
      
    </Dialog>
  );
};

export default PaymentModal;
