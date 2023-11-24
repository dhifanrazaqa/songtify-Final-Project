const songController = require('./songController');
const albumController = require('./albumController');
const authController = require('./authController');

module.exports = {
  ...songController,
  ...albumController,
  ...authController,
};
