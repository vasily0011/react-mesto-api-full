import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
    setName(name);
    setDescription(description);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          id="name-input"
          name="popup__input_name"
          required
          minLength="2"
          maxLength="40"
          className="popup__input popup__input_type_name"
          placeholder="Жак-Ив Кусто"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__error name-input-error"></span>
      </div>
      <div className="popup__field">
        <input
          type="text"
          id="job-input"
          name="popup__input_job"
          required
          minLength="2"
          maxLength="200"
          className="popup__input popup__input_type_job"
          placeholder="Исследователь океана"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__error job-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
