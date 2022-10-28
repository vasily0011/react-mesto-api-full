import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin(email, password);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
