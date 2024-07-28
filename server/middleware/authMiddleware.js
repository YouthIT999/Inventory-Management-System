const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        return res.status(403).send('Invalid token');
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send('No token provided');
  }
};

module.exports = authMiddleware;
