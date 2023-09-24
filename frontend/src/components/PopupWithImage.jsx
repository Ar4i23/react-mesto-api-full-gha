import React from "react";
import Popup from "./Popup";
import "./styles/PopupWithImage.css";

const PopupWithImage = ({ isOpen, card, onClose }) => {
  return <Popup onClose={onClose} isOpen={isOpen} name="image" card={card} />;
};
export default PopupWithImage;
