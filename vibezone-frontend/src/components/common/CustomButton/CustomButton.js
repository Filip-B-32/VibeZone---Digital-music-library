import React from "react";
import "./custom-button.css";

const CustomButton = ({ title, onClick }) => {
  return (
    <button className="space-btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default CustomButton;