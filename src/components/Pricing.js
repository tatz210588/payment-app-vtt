import React from 'react';

export default function Pricing({ pricing }) {
  return (
    <div className="centered-content">
      <p className="centered-text">
        Price per kWh: {pricing.currency} {pricing.pricePerKwh}
      </p>
    </div>
  );
}
