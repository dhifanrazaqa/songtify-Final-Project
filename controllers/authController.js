const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(401).json({
        message: 'Invalid password',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '6h',
    });

    return res.status(201).json({
      token,
    });
  } catch (error) {
    if (error.code === 'P2023' || error.code === 'P2025') return res.status(404).json({ message: 'User not found' });

    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        name,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: 'User created',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
};
