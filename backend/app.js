require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { auth } = require('./middlewares/auth');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { errorHandler } = require('./middlewares/errorHandler');
const { regexUrl } = require('./constants/regexUrl');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
  'https://localhost:3001',
  'http://domainname.frontend.nomoredomains.icu',
  'https://domainname.frontend.nomoredomains.icu',
];

app.use(helmet());
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regexUrl),
    }),
  }),
  createUser,
);

app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use((req, res, next) => next(new NotFoundError('Страница не найдена.')));

app.use(errors());
app.use(errorHandler);
app.use(errorLogger);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
