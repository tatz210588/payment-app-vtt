import React from 'react';

const PaymentSection = () => {
  return (
    <div className="centered-content" style={styles.container}>
      <h2 className="centered-text" style={styles.title}>Payment Authorisation</h2> {/* Update the text here */}     
    </div>
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
    boxShadow: '4px 4px 10px -4px rgba(0,0,0,0.75)'
  }
};

export default PaymentSection;
