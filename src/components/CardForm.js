import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import PaymentAuthorized from "./PaymentAuthorized";
//import InvalidPaymentCard from "./InvalidPaymentCard";
import { authorizePayment } from "../api";
import { useNavigate } from "react-router-dom";

const CardForm = ({
  onSuccessfulAuthorization,
  onPaymentFailure,
  paymentAuthorized,
  setPaymentAuthorized,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset the error message

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      setErrorMessage(error.message);
      onPaymentFailure();
    } else {
      try {
        const responseData = await authorizePayment({
          paymentMethodId: paymentMethod.id,
        });
        console.log(
          "Payment authorized, sessionId from cardform:",
          responseData.sessionId
        );
        onSuccessfulAuthorization(responseData);
        setPaymentAuthorized(responseData);
      } catch (errorResponse) {
        console.error("Payment authorization failed:", errorResponse);

        /*
        if (errorResponse && errorResponse.data && errorResponse.data.error) {
          setErrorMessage("Unable to connect to the server. Please try again later.");
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }*/
        if (errorResponse && errorResponse.data && errorResponse.data.error) {
          navigate("/payment-authorized", {
            state: {
              errorMessage:
                "Unable to connect to the server. Please try again later.",
            },
          });
        } else {
          navigate("/payment-authorized", {
            state: {
              errorMessage: "Something went wrong. Please try again later.",
            },
          });
        }
      }
    }
  };

  return (
    <>
      {paymentAuthorized ? (
        <PaymentAuthorized
          paymentIntent={paymentAuthorized}
          errorMessage={errorMessage}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-container">
            <button type="submit" className="stripe-submit" disabled={!stripe}>
              Pay
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CardForm;
