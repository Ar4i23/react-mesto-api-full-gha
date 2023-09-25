import React from "react";
import LoginComponent from "./LoginComponent";
import { useFormValidation } from "../utils/useFormValidation";
import Input from "./Input";

const Register = ({ isSending, onSubmit }) => {
  const { value, error, isValid, isInputValid, hendleChange, resetInput } =
    useFormValidation();
  const handleRegister = (e) => {
    e.preventDefault();
    onSubmit(value, resetInput);
  };
  return (
    <>
      <LoginComponent
        name="signup"
        type="submit"
        isValid={isValid}
        isSending={isSending}
        onSubmit={handleRegister}
      >
        <Input
          id="email-register"
          name="email"
          type="email"
          isInputValid={isInputValid.email}
          placeholder="Email"
          value={value.email}
          onChange={hendleChange}
          disabled={isSending}
          error={error.email}
          minLength={2}
          maxLength={50}
        />
        <Input
          id="password-register"
          name="password"
          type="password"
          isInputValid={isInputValid.password}
          placeholder="Пароль"
          value={value.password}
          onChange={hendleChange}
          disabled={isSending}
          error={error.password}
          minLength={2}
          maxLength={30}
        />
      </LoginComponent>
    </>
  );
};

export default Register;
