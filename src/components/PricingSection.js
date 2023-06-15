import React from "react";
import Pricing from "./Pricing";

function PricingSection({ pricing }) {
  return (
    <div className="centered-content" style={styles.container}>
      <h2 style={styles.title} className="centered-text">
        Pricing
      </h2>
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
    justifyContent: 'center'
  },
  container: {
    boxShadow: '4px 4px 10px -4px rgba(0,0,0,0.75)'
  }
};

export default PricingSection;
