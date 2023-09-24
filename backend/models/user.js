const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { regexUrl, regexEmail } = require('../utils.js/constans');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Мин. длинна поля - 2'],
      maxlength: [30, 'Макс. длинна поля - 30'],
    },

    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Мин. длинна поля - 2'],
      maxlength: [30, 'Макс. длинна поля - 30'],
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(url) {
          return regexUrl.test(url);
        },
        message: 'Введен не верный формат URL',
      },
    },
    email: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
      unique: true,
      validate: {
        validator(email) {
          return regexEmail.test(email);
        },
        message: 'Введите Email',
      },
    },
    password: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неверный логин или пароль');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неверный логин или пароль');
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
