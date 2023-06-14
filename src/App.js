// App.js
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import PaymentAuthorized from "./components/PaymentAuthorized";
import PaymentCapture from "./components/PaymentCapture";
import PaymentCaptured from "./components/PaymentCaptured";
import Header from "./components/Header";
import "./styles.css";

function App() {
  const [paymentAuthorized, setPaymentAuthorized] = useState(false);

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<MainPage setPaymentAuthorized={setPaymentAuthorized} />}
          />
          <Route
            path="/payment-authorized"
            element={<PaymentAuthorized paymentIntent={paymentAuthorized} />}
          />
          <Route path="/payment-capture" element={<PaymentCapture />} />
          <Route path="/payment-captured" element={<PaymentCaptured />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
