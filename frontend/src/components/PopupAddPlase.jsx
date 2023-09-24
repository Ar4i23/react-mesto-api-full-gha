import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";
import Input from "./Input";

const PopupAddPlace = ({ isOpen, isSending, onClose, onAddPlace }) => {
  const { value, error, isValid, isInputValid, hendleChange, resetInput } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(value, hendleClose);
  };

  const hendleClose = () => {
    resetInput();
    onClose();
  };

  return (
    <>
      <PopupWithForm
        name="my-modal-cread"
        title="Новое место"
        buttonText="Сохранить"
        isSendingText="Сохранение..."
        type="submit"
        isOpen={isOpen}
        onClose={hendleClose}
        onSubmit={handleSubmit}
        isSending={isSending}
        isValid={isValid}
      >
        <Input
          required
          id="name-cread"
          name="name"
          type="text"
          isInputValid={isInputValid.name}
          placeholder="Название картинки"
          minLength={2}
          maxLength={30}
          value={value.name}
          onChange={hendleChange}
          disabled={isSending}
          error={error.name}
        />
        <Input
          required
          id="link-cread"
          name="link"
          type="url"
          isInputValid={isInputValid.link}
          placeholder="Ссылка на картинку"
          minLength={2}
          maxLength={200}
          value={value.link}
          onChange={hendleChange}
          disabled={isSending}
          error={error.link}
        />
      </PopupWithForm>
    </>
  );
};
export default PopupAddPlace;
