import React from "react";
import "./styles/Popup.css";

const Popup = ({
  name,
  isOpen,
  onClose,
  children,
  card,
  popupTitle,
  successful,
}) => {
  return (
    <section
      className={`popup  ${isOpen === true ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className={`${
          name === "image"
            ? "popup__container-img"
            : name === "form"
            ? "popup__container"
            : name === "tooltip"
            ? "popup__container popup__container-tooltip"
            : ""
        } `}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="popup__close" type="button" />
        {name === "image" ? (
          <>
            <img
              src={card.link ? card.link : "#"}
              alt={card.name ? card.name : "#"}
              className="popup__img"
            />
            <p className="popup__heading">{card.name}</p>
          </>
        ) : name === "form" ? (
          <h2 className="popup__title">{popupTitle}</h2>
        ) : name === "tooltip" ? (
          <>
            <div
              className={`${
                successful
                  ? "popup__img-tooltip"
                  : "popup__img-tooltip popup__img-tooltip_eroor"
              }`}
            />
            <h2 className="popup__title popup__title-tooltip">
              {successful
                ? "Вы успешно зарегестрировались"
                : "Что-то пошло не так! попробуйте еще раз"}
            </h2>
          </>
        ) : (
          ""
        )}
        {children}
      </div>
    </section>
  );
};

export default Popup;
