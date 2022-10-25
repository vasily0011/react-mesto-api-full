function PopupWithForm({name, isOpen, onClose, onSubmit, title, children, textButton}) {
  return (
    <div
      className={`popup popup_${name} ${
        isOpen ? "popup_is-active" : ""
      }`}
    >
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="popup__form-save" type="submit">
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
