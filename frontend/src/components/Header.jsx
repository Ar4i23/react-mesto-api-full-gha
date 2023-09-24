import React, { useState } from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import "./styles/Header.css";
const Header = ({ name, userEmail, linkText }) => {
  const [activeBurger, setActiveBurger] = useState(true);
  const handleSignOut = () => {
    setActiveBurger(true);
    localStorage.removeItem("token");
  };
  const handleClick = () => {
    activeBurger ? setActiveBurger(false) : setActiveBurger(true);
  };
  return (
    <>
      <header className={`header ${activeBurger ? "" : "header_opened"}`}>
        <Link to="/" className="header__logo-link">
          <img className="header__img" src={logo} alt="Логотип Место" />
        </Link>
        {name === "signup" ? (
          <Link to="/sign-in" className="header__link header__link_type_login">
            {linkText}
          </Link>
        ) : name === "signin" ? (
          <Link to="/sign-up" className="header__link header__link_type_login">
            {linkText}
          </Link>
        ) : (
          <>
            <div
              className={`header__info-container ${
                activeBurger ? "" : "header__info-container_opened"
              }`}
            >
              <p className="header__heading">{userEmail}</p>
              <Link
                to="/sign-in"
                className="header__link"
                onClick={handleSignOut}
              >
                {linkText}
              </Link>
            </div>
          </>
        )}
        {name === "signup" || name === "signin" ? (
          ""
        ) : (
          <button
            className={` header__button ${
              activeBurger ? "" : "header__button_active"
            }`}
            onClick={handleClick}
          />
        )}
      </header>
    </>
  );
};
export default Header;
