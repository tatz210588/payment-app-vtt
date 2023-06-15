import React from "react";
import logo from "../assets/logo.svg";
import "../componentsStyles.css"; // Import styles

export default function Header() {
  return (
    <div className="header">
      {/* <img src={logo} alt="Logo" className="logo" /> */}
      <h1 className="logo">iPark</h1>
    </div>
  );
}
