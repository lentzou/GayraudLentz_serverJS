const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;
const { validationResult, body } = require('express-validator');
const jwt = require('jsonwebtoken');
const { registerValidator, loginValidator } = require('../middlewares/validator');
const models = require('../models');

router.post('/register', registerValidator, body('email').custom(value => models.User.findOne({ where: { email: value } }).then((user) => {
  if (user) {
    return Promise.reject(new Error('E-mail already in use'));
  }
  return true;
})), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (!err) {
      return models.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        createdAt: new Date(),
        lastLogin: null,
        description: null
      }).then(() => res.status(200).json({ msg: 'User successfully register' }));
    }
    return res.status(500).json({ msg: 'Error in hashing' });
  });
});

router.post('/login', loginValidator, (req, res, next) => models.User.findOne({
  where: {
    email: req.body.email
  }
}).then((user) => {
  if (!user) return res.status(404).json({ msg: "This email doesn't belong to an existing account" });
  return bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
    if (!isMatch) return res.status(403).json({ msg: 'Invalid password' });
    if (err) return res.status(500).json({ msg: 'Server error' });
    return jwt.sign({
      email: req.body.email
    }, 'secret', { expiresIn: '48h' }, (signErr, token) => {
      if (signErr) return res.status(500).json({ msg: 'Server error' });
      return res.status(200).json({ msg: 'Login successful', token });
    });
  });
}).catch(err => next(err)));

module.exports = router;
