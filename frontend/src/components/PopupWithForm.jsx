import React from "react";
import Form from "./Form";
import Popup from "./Popup";

const PopupWithForm = ({
  isOpen,
  isSending,
  onClose,
  onSubmit,
  isValid = true,
  ...rest
}) => {
  return (
    <>
      <Popup
        name="form"
        isOpen={isOpen}
        onClose={onClose}
        popupTitle={rest.title}
      >
        <Form
          children={rest.children}
          buttonText={rest.buttonText}
          isSending={isSending}
          isSendingText={rest.isSendingText}
          onSubmit={onSubmit}
          isValid={isValid}
          type={rest.type}
        />
      </Popup>
    </>
  );
};
export default PopupWithForm;
