const jwt = require('jsonwebtoken');
const config = require('../config/config');

// TODO : delcare token and email to have it on the route

// eslint-disable-next-line consistent-return
exports.verifyToken = (req, res, next) => {
  // eslint-disable-next-line no-undef
  token = req.headers.authorization;
  // eslint-disable-next-line no-undef
  email = '';
  // eslint-disable-next-line no-undef
  if (!token) return res.status(422).json({ status: 422, success: false, msg: 'No token has been send' });
  // eslint-disable-next-line no-undef
  jwt.verify(token, config.development.secret, (err, decoded) => {
    if (err) return res.status(401).json({ status: 401, success: false, msg: 'Invalid token' });
    // eslint-disable-next-line no-undef,prefer-destructuring
    email = decoded.email;
    return next();
  });
};
