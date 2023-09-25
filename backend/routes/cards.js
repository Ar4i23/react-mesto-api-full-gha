const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { regexUrl } = require("../utils.js/constans");
const {
  getCards,
  deleteCard,
  addCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const checkIdLength = () => ({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

router.get("/", getCards);

router.delete("/:cardId", celebrate(checkIdLength()), deleteCard);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(regexUrl),
    }),
  }),
  addCard
);

router.put("/:cardId/likes", celebrate(checkIdLength()), likeCard);

router.delete("/:cardId/likes", celebrate(checkIdLength()), dislikeCard);

module.exports = router;
