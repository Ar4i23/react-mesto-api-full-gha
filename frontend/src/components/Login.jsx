import React from "react";
import LoginComponent from "./LoginComponent";
import { useFormValidation } from "../utils/useFormValidation";
import Input from "./Input";

const Login = ({ isSending, onSubmit }) => {
  const { value, error, isValid, isInputValid, hendleChange, resetInput } =
    useFormValidation();
  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit(value, resetInput);
  };

  return (
    <>
      <LoginComponent
        name="signin"
        type="submit"
        isValid={isValid}
        onSubmit={handleLogin}
        isSending={isSending}
      >
        <Input
          required
          id="email-login"
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
          required
          id="password-login"
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

export default Login;
