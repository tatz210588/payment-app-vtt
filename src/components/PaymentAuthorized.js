// PaymentAuthorized.js
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import "../styles.css";

const PaymentAuthorized = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const paymentData = location.state?.paymentData;
  const errorMessage = location.state?.errorMessage;

  const [chargingSession, setChargingSession] = useState(null);
  const [chargingStatus, setChargingStatus] = useState(null);
  const [error, setError] = useState(null);
  const [chargingStopped, setChargingStopped] = useState(false); // Added chargingStopped state

  const startCharging = useCallback(debounce(async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/start-charging-session', {
        sessionId: paymentData?.sessionId
      });
      setChargingSession(response.data);
      setChargingStopped(false);  // Reset chargingStopped to false when charging starts
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    }
  }, 1000), [paymentData]);

  const stopCharging = useCallback(debounce(async () => {
    try {
      await axios.post('http://localhost:8080/api/stop-charging-session', {
        sessionId: chargingSession?.sessionId
      });
      setChargingSession(null);
      setChargingStopped(true);  // Set chargingStopped to true when charging stops
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    }
  }, 1000), [chargingSession]);


  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/charging-session-status', {
          sessionId: paymentData?.sessionId
        });
        setChargingStatus(response.data);
  
        if (response.data.isChargingComplete) {
          clearInterval(interval);  // Clear the interval
          setTimeout(() => {
            navigate("/payment-capture", { 
              state: { 
                sessionId: paymentData?.sessionId, 
                amountToCapture: response.data.amountToCapture,
                elapsedTime: response.data.elapsedTime,  // pass elapsedTime
                chargingStatus: response.data.isChargingComplete  // pass chargingStatus
              } 
            });
          }, 1000);  // 1-second delay before navigation
        }
      } catch (err) {
        clearInterval(interval);  // Clear the interval
        setError(err.message);
      }
    }, 5000);
  
    return () => clearInterval(interval);
  }, [paymentData?.sessionId, navigate]);


  if (errorMessage) {
    return (
      <div className="container centered-content">
        <h2 className="centered-text">Payment Authorization Failed</h2>
        <p className="centered-text error-message">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="container centered-content">
      <h2 className="centered-text">Payment Authorized</h2>
      <p className="centered-text">
        Your payment has been successfully authorized. Session ID:{" "}
        {paymentData?.sessionId}
      </p>
      <p className="centered-text">
        Amount Reserved:{" "}
        {paymentData?.amountReserved}
      </p>
      <button className="start-button" onClick={startCharging} disabled={!!chargingSession || chargingStopped}>Start Charging</button>
      <button className="stop-button" onClick={stopCharging} disabled={!chargingSession}>Stop Charging</button>
      {chargingStatus && (
        <div className="status-card">
          <div className="status-item"><span>Charging status:</span> {chargingStatus.isChargingComplete ? 'Complete' : 'Charging'}</div>
          <div className="status-item"><span>Elapsed time:</span> {chargingStatus.elapsedTime}</div>
          <div className="status-item"><span>Amount to capture:</span> {chargingStatus.amountToCapture}</div>
          <div className="status-item"><span>Power usage:</span> {chargingStatus.powerUsage}</div>
        </div>
      )}
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
};

export default PaymentAuthorized;






