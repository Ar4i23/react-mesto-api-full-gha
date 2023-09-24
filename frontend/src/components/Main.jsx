import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Spinner from "./Spinner";
import Login from "./Login";
import Register from "./Register";
import "./styles/Main.css";

const Main = ({
  onCardDelete,
  onCardClick,
  onAddPlace,
  onEditAvatar,
  onEditProfile,
  ...rest
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      {rest.name === "main" ? (
        <main className="content">
          <section className="profile">
            <div
              className="profile__image-ellipse"
              style={{
                backgroundImage: `url(${
                  currentUser.avatar ? currentUser.avatar : ""
                })`,
              }}
              onClick={onEditAvatar}
            ></div>
            <div className="profile__info">
              <div className="profile__info-container">
                <h1 className="profile__info-title">
                  {currentUser.name ? currentUser.name : ""}
                </h1>

                <button
                  className="profile__info-edit-button"
                  type="button"
                  aria-label="Редактировать профиль"
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className="profile__info-subtitle">
                {currentUser.about ? currentUser.about : ""}
              </p>
            </div>
            <button
              className="profile__add-botton"
              aria-label="Кнопка добавить"
              onClick={onAddPlace}
            ></button>
          </section>
          {rest.isLoading ? (
            <div className="element-spinner">
              <Spinner />
            </div>
          ) : (
            <section className="elements">
              {rest.cards.map((card) => (
                <Card
                  onCardClick={onCardClick}
                  onCardDelete={onCardDelete}
                  key={card._id}
                  card={card}
                />
              ))}
            </section>
          )}
        </main>
      ) : rest.name === "signin" ? (
        <Login isSending={rest.isSending} onSubmit={rest.onSubmit} />
      ) : (
        <Register isSending={rest.isSending} onSubmit={rest.onSubmit} />
      )}
    </>
  );
};
export default Main;
