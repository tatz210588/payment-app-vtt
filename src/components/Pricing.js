import React from 'react';

export default function Pricing({ pricing }) {
  return (
    <div className="centered-content" style={styles.container}>
      <h3 className="centered-text">
        <p style={styles.infoHead}>Price per kWh:</p> <p style={styles.infoDetails}>{pricing.currency} {pricing.pricePerKwh}</p>
      </h3>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
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