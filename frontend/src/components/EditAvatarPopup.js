import PopupWithForm from "./PopupWithForm.js";
import { useRef } from "react";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="url"
          id="avatar-input"
          name="popup__input_avatar"
          required
          minLength="2"
          maxLength="200"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на аватар"
          ref={avatarRef}
        />
        <span className="popup__error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
