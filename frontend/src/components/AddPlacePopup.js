import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name="add-Card"
      title="Новое место"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          id="title-input"
          name="popup__input_title"
          required
          minLength="2"
          maxLength="30"
          className="popup__input popup__input_type_title"
          placeholder="Название"
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__error title-input-error"></span>
      </div>
      <div className="popup__field">
        <input
          type="url"
          id="link-input"
          name="popup__link"
          required
          className="popup__input 
          popup__input_type_link"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__error link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
