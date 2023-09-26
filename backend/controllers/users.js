const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadReqestError = require('../errors/BadReqestError');
const NotFoundError = require('../errors/NotFountError');
const ConflictError = require('../errors/ConflictError');

const { SECRET_KEY = 'mesto' } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(HTTP_STATUS_OK).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqestError('Не коректный id'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с таким id отсутствует'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqestError(err.message));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с таким id отсутствует'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  if (req.user._id) {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
    )
      .orFail()
      .then((user) => res.status(HTTP_STATUS_OK).send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadReqestError(err.message));
        } else {
          next(err);
        }
      });
  } else {
    next();
  }
};

module.exports.addUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(HTTP_STATUS_CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqestError(err.message));
      } else if (err.code === 11000) {
        next(
          new ConflictError(
            `Пользователь с таким email:${email}, уже существует`,
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '7d',
      });
      res.status(HTTP_STATUS_OK).send({ token });
    })
    .catch((err) => next(err));
};
