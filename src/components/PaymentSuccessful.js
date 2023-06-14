import React from 'react';

const PaymentSuccessful = ({ amount }) => {
  return (
    <div className="payment-successful">
      <h2>Payment is successful</h2>
      <p>Charged amount: {amount} EUR</p>
    </div>
  );
};

export default PaymentSuccessful;
