const express = require('express');
const {
  getAllAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum,
} = require('../controllers');
const validate = require('../middleware/form-validation/album');
const authorization = require('../middleware/auth');

const router = express.Router();

router.get('/albums', getAllAlbums);
router.get('/album/:id', getAlbumById);
router.post('/album', authorization, validate, createAlbum);
router.put('/album/:id', authorization, validate, updateAlbum);
router.delete('/album/:id', authorization, deleteAlbum);

module.exports = router;
