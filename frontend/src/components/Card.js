import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardDelete, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = `${
    isOwn ? "element__button_delete" : "element__button_delete_hidden"
  }`;

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `element__button ${
    isLiked && "element__button_active"
  }`;

  function handleLikeCard() {
    onCardLike(card);
  }

  return (
    <li className="element">
      <button
        aria-label="удалить карточку"
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__item">
        <p className="element__title">{card.name}</p>
        <div className="element__like">
          <button
            aria-label="Поставить Лайк"
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeCard}
          ></button>
          <span className="element__like_counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
