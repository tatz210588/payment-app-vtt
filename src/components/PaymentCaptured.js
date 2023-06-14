// PaymentCaptured.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles.css';

const PaymentCaptured = () => {
  const location = useLocation();
  const capturedAmount = location.state?.capturedAmount;
  const elapsedTime = location.state?.elapsedTime;
  const chargingStatus = location.state?.chargingStatus;

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs} Hour(s) ${mins} Minute(s) ${secs} Second(s)`;
  };

  return (
    <div className="container centered-content">
      {capturedAmount ? (
        <>
          <h2 className="centered-text">Payment Capture</h2>
          <p className="centered-text">
            Captured amount: {(capturedAmount / 100).toFixed(2)} EUR
          </p>
          <p className="centered-text">
            Charging Time: {formatTime(elapsedTime)}
          </p>
          <p className="centered-text">
            Charging status: {chargingStatus ? 'Complete' : 'In Progress'}
          </p>
        </>
      ) : (
        <>
          <h2 className="centered-text">Payment Capture Failed</h2>
          <p className="centered-text">Unfortunately, the payment capture process has failed.</p>
        </>
      )}
    </div>
  );
};

export default PaymentCaptured;
