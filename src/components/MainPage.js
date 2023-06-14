// MainPage.js
import React, { useState, useEffect, useLocation } from "react";
import ChargerInfoSection from "./ChargerInfoSection";
import PricingSection from "./PricingSection";
import PaymentSection from "./PaymentSection";
import PaymentProcessor from "./PaymentProcessor";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import sampleData from "./sampleData.json";
import useFetchData from "../hooks/useFetchData";  // Import custom hook

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51MtxkaKRzm9Te7g8OTUxqutdzDY9XqQMydztUG1XXtGqzo2olj16lx2NkRwXQjsOxvdbnLKMio1yRBYGQjQ61Zqw00xaJPcjkH";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY).catch((error) => {
  console.error("Error loading Stripe:", error);
});

async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return sampleData;
}

const MainPage = ({ setPaymentAuthorized }) => {

  const { data: chargerData, loading, error } = useFetchData(fetchData);

  const handlePayment = (paymentIntentId) => {
    console.log(
      "Payment authorized, PaymentIntent ID from MainPage:",
      paymentIntentId
    );
    setPaymentAuthorized(true);
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <ChargerInfoSection chargerInfo={chargerData.chargerInfo} />
      <PricingSection pricing={chargerData.pricing} />
      <PaymentSection />
      <Elements stripe={stripePromise}>
        <PaymentProcessor
          paymentOptions={chargerData.paymentOptions}
          onPayment={handlePayment}
          chargerData={chargerData}
          setPaymentAuthorized={setPaymentAuthorized}
        />
      </Elements>
    </>
  );
};

export default MainPage;
