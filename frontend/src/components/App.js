/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Switch, useHistory, Route } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import * as auth from "../utils/auth.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoToolTip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const history = useHistory();

  // useEffect(() => {
  //   api
  //     .getUserInfo()
  //     .then((userData) => {
  //       setCurrentUser(userData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [loggedIn]);
  // console.log(setCurrentUser);

  // useEffect(() => {
  //   api
  //     .getInitialCards()
  //     .then((cardsData) => {
  //       setCards(cardsData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, {cards}]) => {
              console.dir(cards);
                setCurrentUser(userData);
                setCards(cards);
                
            })
            .catch((err) => {
                console.log(err);
            });
    }
}, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data.name, data.about)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data.avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map(((c) => c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(item) {
    api
      .addNewCard(item)
      .then((item) => {
        setCards([item, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        return;
      }
      auth
        .getContent(jwt)
        .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    tokenCheck();
  }, [history]);

  

  const onLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
      });
  };

  const onRegister = (email, password) => {
    return auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
      });
  };

  const onSingOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/signin");
    setEmail("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={email} onSingOut={onSingOut} />
      <Switch>
        <Route path="/signin">
          <Login onLogin={onLogin} />
        </Route>
        <Route path="/signup">
          <Register onRegister={onRegister} />
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
      </Switch>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <PopupWithForm name="remove-card" title="Вы уверены?" textButton="Да" />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <InfoToolTip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
