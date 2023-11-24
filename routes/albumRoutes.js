const express = require('express');
const {
  getAllAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum,
} = require('../controllers');
const validate = require('../middleware/form-validation/album');

const router = express.Router();

router.get('/albums', getAllAlbums);
router.get('/album/:id', getAlbumById);
router.post('/album', validate, createAlbum);
router.put('/album/:id', validate, updateAlbum);
router.delete('/album/:id', deleteAlbum);

module.exports = router;
