const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().required().label('Username').min(5)
    .trim(),
  password: Joi.string().required().label('Password').min(8),
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
