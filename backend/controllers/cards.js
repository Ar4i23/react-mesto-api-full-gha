const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const Card = require('../models/card');
const BadReqestError = require('../errors/BadReqestError');
const NotFoundError = require('../errors/NotFountError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Чужая карточка');
      }
      Card.deleteOne(card)
        .then(() => {
          res.status(HTTP_STATUS_OK).send({ message: 'Карточка удалена' });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqestError('Неккоректный id'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка  с таким id отсутствует'));
      } else {
        next(err);
      }
    });
};

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )

    .orFail()
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqestError('Неккоректный id'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка  с таким id отсутствует'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )

    .orFail()
    .then((card) => {
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqestError('Неккоректный id'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка  с таким id отсутствует'));
      } else {
        next(err);
      }
    });
};
