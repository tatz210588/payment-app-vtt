import React from "react";
import Pricing from "./Pricing";

function PricingSection({ pricing }) {
  return (
    <div className="centered-content">
      <p style={styles.title} className="centered-text">
        Pricing
      </p>
      <Pricing pricing={pricing} />
    </div>
  );
}

const styles = {
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
};

export default PricingSection;
