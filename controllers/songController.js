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

const getAllSongs = async (req, res) => {
  try {
    const { singer, sortedPlay } = req.query;
    let songs;

    if (singer && sortedPlay) {
      songs = await prisma.song.findMany({
        where: { singer },
        orderBy: { plays: sortedPlay },
        include: {
          album: true,
        },
      });
    } else if (singer) {
      songs = await prisma.song.findMany({
        where: { singer },
        include: {
          album: true,
        },
      });
    } else if (sortedPlay) {
      songs = await prisma.song.findMany({
        orderBy: { plays: sortedPlay },
        include: {
          album: true,
        },
      });
    } else {
      songs = await prisma.song.findMany({
        include: {
          album: true,
        },
      });
    }

    return res.status(200).json({
      message: 'Success',
      data: excludeObjects(songs, ['albumId']),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await prisma.song.findUnique({
      where: {
        id,
      },
      include: {
        album: true,
      },
    });

    if (!song) return res.status(404).json({ message: 'Song not found' });

    return res.status(200).json({
      message: 'Success',
      data: exclude(song, ['albumId', 'album']),
    });
  } catch (error) {
    if (error.code === 'P2023') return res.status(404).json({ message: 'Song not found' });

    return res.status(500).json({ message: error.message });
  }
};

const createSong = async (req, res) => {
  const song = req.body;
  try {
    const newSong = await prisma.song.create({
      data: song,
    });
    return res.status(201).json({
      message: 'Song created',
      data: newSong,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateSong = async (req, res) => {
  const updatedData = req.body;
  const { id } = req.params;
  try {
    const updatedSong = await prisma.song.update({
      where: {
        id,
      },
      data: updatedData,
    });

    return res.status(200).json({
      message: 'Song updated',
      data: updatedSong,
    });
  } catch (error) {
    if (error.code === 'P2023' || error.code === 'P2025') return res.status(404).json({ message: 'Song not found' });

    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.song.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      message: 'Song deleted',
    });
  } catch (error) {
    if (error.code === 'P2023' || error.code === 'P2025') return res.status(404).json({ message: 'Song not found' });

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};
