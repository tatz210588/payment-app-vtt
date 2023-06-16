// PaymentCaptured.js

import Lottie from "lottie-react";
import React from 'react';
import { useLocation } from 'react-router-dom';
import failed from '../assets/107311-failed-red.json';
import thankYou from '../assets/74797-thank-you-with-confetti.json';
import '../styles.css';

const PaymentCaptured = () => {
  const location = useLocation();
  const capturedAmount = location.state?.capturedAmount;
  const elapsedTime = location.state?.elapsedTime;
  const chargingStatus = location.state?.chargingStatus;

  const formatTime = (given_seconds) => {
    // const hrs = Math.floor(seconds / 3600);
    // const mins = Math.floor((seconds % 3600) / 60);
    // const secs = seconds % 60;
    let dateObj = new Date(given_seconds * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();
    let timeString = hours.toString().padStart(2, '0') + ':' + 
    minutes.toString().padStart(2, '0') + ':' + 
    seconds.toString().padStart(2, '0');
    return timeString;
  };

  return (
    <>
      <div className="container centered-content" style={styles.container}>
        {capturedAmount ? (
          <>
            {/* <h2 className="centered-text" style={styles.title}>Payment Capture</h2>
            <h3 className="centered-text">
              <p style={styles.infoHead}>Captured amount:</p> <p style={styles.infoDetails}>{(capturedAmount / 100).toFixed(2)} EUR</p>
            </h3>
            <h3 className="centered-text">
              <p style={styles.infoHead}>Charging Time:</p> <p style={styles.infoDetails}>{formatTime(elapsedTime)}</p>
            </h3>
            <h3 className="centered-text">
              <p style={styles.infoHead}>Charging status:</p> <p style={styles.infoDetails}>{chargingStatus ? 'Complete' : 'In Progress'}</p>
            </h3> */}
            <div className="charging-section">
              <div className="charging-amount">
                <p>Amount</p>
                <p>{(capturedAmount / 100).toFixed(2)} EUR</p>
              </div>
              <div className="charging-time">
                <p>Time</p>
                <p>{formatTime(elapsedTime)}</p>
              </div>
              <div className="charging-status">
                <p>Status</p>
                <p>{chargingStatus ? 'Complete' : 'In Progress'}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="centered-text" style={styles.title}>Payment Capture Failed</h2>
            <p className="centered-text" style={{justifyContent: 'center', marginBottom: '10px', textAlign: 'center'}}>Unfortunately, the payment capture process has failed.</p>
          </>
        )}
      </div>
      {/* {true ? (
        <div style={{maxWidth: '200px', margin: '0 auto'}}>
          <Lottie animationData={charging} />
        </div>
      ) : (
        <div style={{maxWidth: '200px', margin: '0 auto'}}>
          <Lottie animationData={failed} />
        </div>
      )} */}
      {capturedAmount && (
        <div style={{maxWidth: '250px', margin: '0 auto', position: 'relative', top: '-3rem'}}>
          <Lottie animationData={thankYou} />
        </div>
      )}
      {!capturedAmount && (
        <div style={{maxWidth: '200px', margin: '0 auto'}}>
          <Lottie animationData={failed} />
        </div>
      )}
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
    marginBottom: '20px',
    paddingBottom: '10px',
    background: 'none'
  },
  infoHead: {
    fontWeight: 'bold',
    marginLeft: '10px'
  },
  infoDetails: {
    marginRight: '10px',
    fontWeight: 'normal'
  }
}

export default PaymentCaptured;
