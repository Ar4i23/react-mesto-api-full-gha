const mongoose = require('mongoose');
const { regexUrl } = require('../utils.js/constans');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
      minlength: [2, 'Мин. длинна поля - 2'],
      maxlength: [30, 'Макс. длинна поля - 30'],
    },

    link: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
      validate: {
        validator(url) {
          return regexUrl.test(url);
        },
        message: 'Введен не верный формат URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
