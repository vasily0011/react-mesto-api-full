import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const resetForm = () => {
  //   setPassword("");
  //   setEmail("");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="login__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <NavLink className="login__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </NavLink>
    </div>
  );
};

export default Register;
