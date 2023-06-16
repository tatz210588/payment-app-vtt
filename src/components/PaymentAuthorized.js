// PaymentAuthorized.js
import axios from "axios";
import debounce from "lodash.debounce";
import Lottie from "lottie-react";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import start from '../assets/68355-start.json';
import charging from '../assets/78998-charging.json';
import "../styles.css";

const PaymentAuthorized = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const paymentData = location.state?.paymentData;
  const errorMessage = location.state?.errorMessage;
  // const errorMessage = false;
  const [isCharging, setIsCharging] = useState(false);
  const [chargingSession, setChargingSession] = useState(null);
  const [chargingStatus, setChargingStatus] = useState(null);
  const [error, setError] = useState(null);
  const [chargingStopped, setChargingStopped] = useState(false); // Added chargingStopped state

  const startCharging = useCallback(debounce(async () => {
    setIsCharging(true);
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
    <>
      <div className="container centered-content" style={styles.container}>
        <h2 className="centered-text" style={styles.title}>Payment Authorized</h2>
        <h3 className="centered-text" style={styles.paymentConfirm}>Your payment has been successfully authorized.</h3>
        <h3 className="centered-text">
          <p style={styles.infoHead}>Session ID:</p>
          <p style={styles.infoDetails}>{paymentData?.sessionId}</p>
        </h3>
        <h3 className="centered-text">
          <p style={styles.infoHead}>Amount Reserved:</p>
          <p style={styles.infoDetails}>{paymentData?.amountReserved}</p>
        </h3>
        {/* <button className="start-button" onClick={startCharging} disabled={!!chargingSession || chargingStopped}>Start Charging</button> */}
        {!isCharging ? (
          <div className="start-button">
            <Lottie animationData={start} onClick={startCharging} disabled={!!chargingSession || chargingStopped} style={{cursor: 'pointer'}} />
          </div>
        ) : (
          <div className="charge-button">
            <Lottie animationData={charging} disabled={!!chargingSession || chargingStopped} />
          </div>
        )}
        {isCharging && (<button className="stop-button" style={!isCharging ? {marginTop: '100px'} : {}} onClick={stopCharging} disabled={!chargingSession}><p>Stop</p> <p>Charging</p></button>)}
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
      {/* <div className="checkmark" style={styles.checkmark}>
        <Lottie animationData={thankYou} loop={true} />
      </div> */}
    </>
  );
};

const styles = {
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center'
  },
  container: {
    // boxShadow: '4px 4px 10px -4px rgba(0,0,0,0.75)',
    background: 'none',
    position: 'relative'
  },
  paymentConfirm: {
    justifyContent: 'center',
    fontSize: '12px'
  },
  checkmark: {
    maxWidth: '200px',
    margin: '0 auto'
  },
  infoHead: {
    fontWeight: 'bold',
    marginLeft: '10px'
  },
  infoDetails: {
    marginRight: '10px',
    fontWeight: 'normal'
  }
};

export default PaymentAuthorized;






