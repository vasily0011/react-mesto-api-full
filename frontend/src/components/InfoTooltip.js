import failImage from "../images/fail.png";
import SuccessImage from "../images/success.png";

function InfoToolTip({isOpen, onClose, isSuccess}) {
  return (
    <div
      className={`popup ${
        isOpen ? "popup_is-active" : ""
      }`}
    >
      <div className="popup__container popup__container_tooltip">
        <button
          aria-label="Закрыть"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup_tooltip-image"
          src={isSuccess ? SuccessImage : failImage}
          alt="иконка регистрации"
        />
        <p className="popup_tooltip-text">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoToolTip;
