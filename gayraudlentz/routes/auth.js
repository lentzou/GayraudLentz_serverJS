const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { registerValidator, loginValidator } = require('../middlewares/validator');
const { validationResult, body } = require('express-validator');
const models = require('../models');

router.post('/register', registerValidator, body('email').custom(value => {
  return models.User.findOne({where: {email: value}}).then(user => {
    if (user) {
      return Promise.reject('E-mail already in use');
    }
  })
}), function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (!err)
      return models.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        createdAt: new Date(),
        lastLogin: null,
        description: null
      }).then(() => {
        return res.status(200).json({msg: 'User successfully register'});
      }).catch((err) => next(err));
    else
      return res.status(500).json({msg: "Error in hashing"})
  })
});

router.get('/login', loginValidator, function(req, res, next) {
  return models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (!user)
      return res.status(404).json({msg: "This email doesn\'t belong to an existing account"});
    else
      bcrypt.compare(req.body.password, user.password, (err, isMatch)  => {
        if (!isMatch)
          return res.status(403).json({msg: "Invalid password"});
        else
          return res.status(200).json({msg: "Login successful"});
      })
  }).catch((err) => next(err));
});

module.exports = router;
