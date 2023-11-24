const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return res.status(401).json({ message: 'Unauthorized' });

      req.user = decoded;
    });

    console.log(req.user);

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authorization;
