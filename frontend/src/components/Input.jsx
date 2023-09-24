import React from "react";
import "./styles/Input.css";

const Input = ({
  id,
  name,
  type,
  isInputValid,
  value,
  error,
  minLength,
  maxLength,
  onChange,
  isSending,
  placeholder,
}) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        className={`${
          name === "email" || name === "password"
            ? "form__input form__input-login"
            : "form__input"
        }         
        ${
          isInputValid === undefined || isInputValid ? "" : "form__input_error"
        }`}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value ? value : ""}
        onChange={onChange}
        disabled={isSending}
      />
      <span className="form__input-error" id="name-edit-error">
        {error}
      </span>
    </>
  );
};

export default Input;
