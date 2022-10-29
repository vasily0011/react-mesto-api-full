class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
}

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json()
    .then((err) => {
      err.errorCode = res.status;
      return Promise.reject(err);
    })
    
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
        'Authorization': `Bearer ${jwt}`,
        ...this._headers,
    };
}

  

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._getHeaders(),
    })
    .then(res => {
      return this._checkResponse(res);
    })
  } 

  setUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  addNewCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: (like ? "PUT": "DELETE"),
      headers: this._getHeaders(),
    })
    .then(res => {
      return this._checkResponse(res);
    })
  };

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: this._getHeaders(),
  })
  .then(res => {
    return this._checkResponse(res);
  })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE', 
      headers: this._getHeaders(),
    })
    // .then(this._checkResponse);
    .then(res => {
      return this._checkResponse(res);
    })
  }
}

// export default new Api('http://localhost:3001');
export default new Api({
  url: 'http://domainname.backend.nomoredomains.icu',
  headers: {
      'Content-Type': 'application/json'
  }
});
