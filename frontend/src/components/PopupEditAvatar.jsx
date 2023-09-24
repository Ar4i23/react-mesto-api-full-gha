import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";
import Input from "./Input";

const PopupEditAvatar = ({ isSending, isOpen, onClose, onUpdateAvatar }) => {
  const { value, error, isValid, isInputValid, hendleChange, resetInput } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(value, hendleClose);
  };

  const hendleClose = () => {
    resetInput();
    onClose();
  };

  return (
    <>
      <PopupWithForm
        name="my-modal-avatar"
        title="Обновить аватар"
        buttonText="Обновить"
        isSendingText="Обновление..."
        type="submit"
        isOpen={isOpen}
        isValid={isValid}
        isSending={isSending}
        onClose={hendleClose}
        onSubmit={handleSubmit}
      >
        <Input
          required
          id="link-avatar"
          name="avatar"
          type="url"
          isInputValid={isInputValid.avatar}
          placeholder="Ссылка на картинку"
          value={value.avatar}
          onChange={hendleChange}
          disabled={isSending}
          error={error.avatar}
        />
      </PopupWithForm>
    </>
  );
};
export default PopupEditAvatar;
