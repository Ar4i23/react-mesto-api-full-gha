import React from "react";
import Form from "./Form";
import { Link } from "react-router-dom";
import "./styles/LoginComponent.css";

const LoginComponent = ({
  name,
  type,
  children,
  isValid,
  onSubmit,
  isSending,
}) => {
  return (
    <>
      <section className="login">
        <h2 className="login__title">
          {name === "signin" ? "Вход" : "Регистрация"}
        </h2>
        <Form
          children={children}
          name={name}
          buttonText={name === "signin" ? "Войти" : "Регистрация"}
          isSendingText={name === "signin" ? "Вход..." : "Регистрация..."}
          isValid={isValid}
          isSending={isSending}
          onSubmit={onSubmit}
          type={type}
        />
        {name === "signup" ? (
          <p className="login__subtitle">
            Уже зарегестрированны?
            <Link to="/sign-in" className="login__subtitle_link">
              Войти
            </Link>
          </p>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default LoginComponent;
