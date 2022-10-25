function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`
    popup 
    popup_card
    ${Object.keys(card).length ? "popup_is-active" : ""}
    `}
    >
      <div className="popup__element">
        <button
          aria-label="Закрыть"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup__item">
          <img
            src={` ${card ? card.link : ""} `}
            alt={card.name}
            className="popup__image"
          />
          <figcaption className="popup__text">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
