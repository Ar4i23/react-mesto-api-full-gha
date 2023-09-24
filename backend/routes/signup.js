const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { addUser } = require('../controllers/users');
const { regexUrl, regexEmail } = require('../utils.js/constans');

router.post(
  '/',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().pattern(regexEmail),
        password: Joi.string().required().min(3),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().pattern(regexUrl),
      })
      .unknown(true),
  }),
  addUser,
);

module.exports = router;
