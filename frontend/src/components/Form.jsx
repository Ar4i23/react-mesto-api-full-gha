import React from "react";
import "./styles/Form.css";

const Form = ({
  name,
  buttonText,
  type,
  isSending,
  isSendingText,
  children,
  onSubmit,
  isValid = true,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={
        name === "signin" || name === "signup" ? "form form_login" : "form"
      }
      name={name}
      noValidate
    >
      {children}
      {name === "signin" || name === "signup" ? (
        <button
          className={
            isValid
              ? "form__button form__button_login"
              : "form__button_invalid form__button_invalid-login"
          }
          type={type}
          disabled={isSending}
        >
          {isSending ? isSendingText : buttonText}
        </button>
      ) : (
        <button
          className={isValid ? "form__button" : "form__button_invalid"}
          type={type}
          disabled={isSending}
        >
          {isSending ? isSendingText : buttonText}
        </button>
      )}
    </form>
  );
};

export default Form;
