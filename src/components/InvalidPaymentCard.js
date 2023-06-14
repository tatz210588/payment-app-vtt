import React from "react";

const InvalidPaymentCard = ({ errorMessage }) => {
  return (
    <div>
      <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
    </div>
  );
};

export default InvalidPaymentCard;
