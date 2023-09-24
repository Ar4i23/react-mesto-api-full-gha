import React from "react";
import PopupWithForm from "./PopupWithForm";

const PupupDelete = ({ isOpen, onDeletePlace, onClose, isSending }) => {
  const hendleSubmit = (e) => {
    e.preventDefault();
    onDeletePlace();
  };
  return (
    <>
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonText="Да"
        type="submit"
        isSendingText="Удаление ..."
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={hendleSubmit}
        isSending={isSending}
      />
    </>
  );
};

export default PupupDelete;
