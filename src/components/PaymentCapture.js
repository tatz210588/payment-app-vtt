import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { capturePayment } from '../api';

const PaymentCapture = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = location.state?.sessionId;
  const amountToCapture = location.state?.amountToCapture;
  const elapsedTime = location.state?.elapsedTime;
  const chargingStatus = location.state?.chargingStatus;

  const [captureResponse, setCaptureResponse] = useState(null);
  const [error, setError] = useState('');
  const captureRequested = useRef(false);

  useEffect(() => {
    const fetchCaptureResponse = async () => {
      console.log('fetchCaptureResponse called', sessionId, captureRequested.current);
      if (!captureRequested.current) {
        try {
          captureRequested.current = true;
          const response = await capturePayment(sessionId);
          setCaptureResponse(response);
          if (response.IsChargingComplete) {
            navigate("/payment-captured", {
              state: {
                capturedAmount: response.AmountCaptured,
                elapsedTime: elapsedTime,
                chargingStatus: response.IsChargingComplete,
              },
            });
          }
        } catch (err) {
          setError('Failed to capture payment');
          captureRequested.current = false;  // Reset captureRequested if there was an error
        }
      }
    };

    fetchCaptureResponse();
  }, [sessionId, navigate, amountToCapture, elapsedTime, chargingStatus]);

  // Rest of your component...
  return (
    <div>
      {error && <p>Error: {error}</p>}
      {captureResponse && (
        <>
          <p>Payment capture process started...</p>
        </>
      )}
    </div>
  );
};

export default PaymentCapture;
