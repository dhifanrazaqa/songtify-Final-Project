const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required().label('Title'),
  year: Joi.number().required().label('Year').strict(),
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
