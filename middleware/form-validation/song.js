const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required().label('Title'),
  singer: Joi.string().required().label('Singer'),
  minute: Joi.string().required().label('Minute'),
  plays: Joi.number().required().label('Plays').strict(),
  albumId: Joi.string().length(24).label('Album Id'),
});

const validate = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
  return next();
};

module.exports = validate;
