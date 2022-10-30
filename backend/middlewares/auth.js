const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'secret_key'}`);
    console.log(NODE_ENV);
    console.log(JWT_SECRET);
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
