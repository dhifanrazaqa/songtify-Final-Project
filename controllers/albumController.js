const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function excludeObjects(objects, keys) {
  return objects.map((obj) => {
    const newObj = Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keys.includes(key)),
    );
    return newObj;
  });
}

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

const getAllAlbums = async (req, res) => {
  try {
    const albums = await prisma.album.findMany({
      include: {
        songs: true,
      },
    });
    return res.status(200).json({
      message: 'Success',
      data: excludeObjects(albums, ['albumId']),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const album = await prisma.album.findUnique({
      where: {
        id,
      },
      include: {
        songs: true,
      },
    });

    if (!album) return res.status(404).json({ message: 'Album not found' });

    return res.status(200).json({
      message: 'Success',
      data: exclude(album, ['albumId', 'album']),
    });
  } catch (error) {
    if (error.code === 'P2023') return res.status(404).json({ message: 'Album not found' });

    return res.status(500).json({ message: error.message });
  }
};

const createAlbum = async (req, res) => {
  const album = req.body;
  try {
    const newAlbum = await prisma.album.create({
      data: album,
    });
    return res.status(201).json({
      message: 'Album created',
      data: newAlbum,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateAlbum = async (req, res) => {
  const updatedData = req.body;
  const { id } = req.params;
  try {
    const updatedAlbum = await prisma.album.update({
      where: {
        id,
      },
      data: updatedData,
    });

    return res.status(200).json({
      message: 'Album updated',
      data: updatedAlbum,
    });
  } catch (error) {
    if (error.code === 'P2023' || error.code === 'P2025') return res.status(404).json({ message: 'Album not found' });

    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.album.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      message: 'Album deleted',
    });
  } catch (error) {
    if (error.code === 'P2023' || error.code === 'P2025') return res.status(404).json({ message: 'Album not found' });

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
