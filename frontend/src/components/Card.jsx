import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ButtonLike from "./ButtonLike";
import "./styles/Card.css";

const Card = ({ onCardClick, onCardDelete, card }) => {
  const currentUser = useContext(CurrentUserContext);

  const handleClickImg = () => {
    onCardClick(card);
  };

  const handleDeleteCard = () => {
    onCardDelete(card);
  };
  return (
    <>
      <article className="element">
        {currentUser._id === card.owner && (
          <button
            onClick={handleDeleteCard}
            className="element__button-delete"
          ></button>
        )}

        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleClickImg}
        />
        <div className="element__group">
          <h2 className="element__title">{card.name}</h2>
          <ButtonLike
            likes={card.likes}
            myId={currentUser._id}
            cardId={card._id}
          />
        </div>
      </article>
    </>
  );
};
export default Card;
