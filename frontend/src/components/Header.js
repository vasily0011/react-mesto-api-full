import headerLogo from "../images/logo.svg";
import { Route, Link } from "react-router-dom";

function Header({ userEmail, onSingOut }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип Место" className="header__logo" />
      <Route exact path="/">
        <div className="header__auth">
          <p className="header__email">{userEmail}</p>
          <button className="header__logout" onClick={onSingOut}>
            Выйти
          </button>
        </div>
      </Route>
      <Route path="/signin">
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      </Route>
      <Route path="/signup">
        <Link to="/signin" className="header__link">
          Войти
        </Link>
      </Route>
    </header>
  );
}

export default Header;
