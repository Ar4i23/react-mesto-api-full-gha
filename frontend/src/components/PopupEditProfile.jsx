import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormValidation } from "../utils/useFormValidation";

const PopupEditProfile = ({ isOpen, isSending, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const {
    value,
    error,
    isValid,
    isInputValid,
    hendleChange,
    resetInput,
    setValueInput,
  } = useFormValidation();

  useEffect(() => {
    setValueInput({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, setValueInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(value, hendleClose);
  };

  const hendleClose = () => {
    resetInput({ name: currentUser.name, about: currentUser.about });
    onClose();
  };

  return (
    <>
      <PopupWithForm
        name="my-modal-edit"
        title="Редактировать профиль"
        isSendingText="Сохранение..."
        buttonText="Сохранить"
        type="submit"
        isOpen={isOpen}
        onClose={hendleClose}
        onSubmit={handleSubmit}
        isSending={isSending}
        isValid={isValid}
      >
        <Input
          id="name-edit"
          name="name"
          type="text"
          isInputValid={isInputValid.name}
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          value={value.name}
          onChange={hendleChange}
          disabled={isSending}
          error={error.name}
        />
        <Input
          id="about-edit"
          name="about"
          type="text"
          isInputValid={isInputValid.about}
          placeholder="Обо мне"
          minLength={2}
          maxLength={200}
          value={value.about}
          onChange={hendleChange}
          disabled={isSending}
          error={error.about}
        />
      </PopupWithForm>
    </>
  );
};
export default PopupEditProfile;
