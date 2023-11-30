const express = require('express');
const {
  getAllSongs, getSongById, createSong, updateSong, deleteSong,
} = require('../controllers');
const validate = require('../middleware/form-validation/song');
const authorization = require('../middleware/auth');

const router = express.Router();

router.get('/songs', getAllSongs);
router.get('/song/:id', getSongById);
router.post('/song', authorization, validate, createSong);
router.put('/song/:id', authorization, validate, updateSong);
router.delete('/song/:id', authorization, deleteSong);

module.exports = router;
