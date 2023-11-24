const express = require('express');
const {
  getAllSongs, getSongById, createSong, updateSong, deleteSong,
} = require('../controllers');
const validate = require('../middleware/form-validation/song');
const authorization = require('../middleware/auth');

const router = express.Router();

router.get('/songs', authorization, getAllSongs);
router.get('/song/:id', getSongById);
router.post('/song', validate, createSong);
router.put('/song/:id', validate, updateSong);
router.delete('/song/:id', deleteSong);

module.exports = router;
