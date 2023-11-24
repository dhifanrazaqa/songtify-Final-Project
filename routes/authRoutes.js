const express = require('express');
const { login, register } = require('../controllers');
const validateLogin = require('../middleware/form-validation/login');
const validateRegister = require('../middleware/form-validation/register');

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);

module.exports = router;
