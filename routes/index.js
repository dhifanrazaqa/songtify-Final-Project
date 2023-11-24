const express = require('express');
const songRoutes = require('./songRoutes');
const albumRoutes = require('./albumRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('', songRoutes);
router.use('', albumRoutes);
router.use('/auth', authRoutes);

module.exports = router;
