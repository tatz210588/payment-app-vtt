import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "./CardForm";

const PaymentProcessor = ({ paymentOptions, onPayment, chargerData, setPaymentAuthorized }) => {
  const navigate = useNavigate();
  const [paymentAuthorized] = useState(false);

  const handleSuccessfulAuthorization = (paymentData) => {
    console.log("Payment authorized, sessionId:", paymentData.sessionId);
    onPayment(paymentData);
    setPaymentAuthorized(paymentData);
    navigate("/payment-authorized", { state: { paymentData } });
  };
  

  const handlePaymentFailure = () => {
    console.error("Payment failed.");
  };

  return (
    <div>
      {/* Render the payment options */}
      <CardForm
        onSuccessfulAuthorization={handleSuccessfulAuthorization}
        onPaymentFailure={handlePaymentFailure}
        paymentAuthorized={paymentAuthorized}
        setPaymentAuthorized={setPaymentAuthorized}
      />
    </div>
  );
};

export default PaymentProcessor;
