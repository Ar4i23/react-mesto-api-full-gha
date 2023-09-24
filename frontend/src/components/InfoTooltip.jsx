import React from "react";
import Popup from "./Popup";

const InfoTooltip = ({ isOpen, successful, onClose }) => {
  return (
    <Popup
      isOpen={isOpen}
      successful={successful}
      onClose={onClose}
      name="tooltip"
    />
  );
};

export default InfoTooltip;
