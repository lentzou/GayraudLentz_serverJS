const express = require('express');

const router = express.Router();
const models = require('../models');
const check = require('../middlewares/checkToken');
const { patchUserValidator } = require('../middlewares/validator');

router.get('/', (req, res, next) => {
  models.User.findAll().then(users => (res.status(200).json({ users, msg: 'Users successfully retrieved' }))).catch(err => next(err));
});

router.get('/me', check.verifyToken, (req, res, next) => {
  // eslint-disable-next-line no-undef
  models.User.findOne({ where: { email } }).then((user) => {
    if (!user) res.status(404).json({ msg: 'User not found' });
    else { res.status(200).json({ user, msg: 'User successfully retrieved' }); }
  }).catch(err => next(err));
});

router.patch('/me', check.verifyToken, patchUserValidator, (req, res, next) => {
  models.User.findOne({ where: { email } }).then((user) => {
    if (!user) res.status(404).json({ msg: 'User not found' });
    else {
      user.update({ username: req.body.username, description: req.body.description })
        .then((userUpdated) => {
          res.status(200).json({ user: userUpdated, msg: 'User updated successfully' });
        });
    }
  }).catch(err => next(err));
});

module.exports = router;
