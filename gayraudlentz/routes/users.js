const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
  models.User.findAll().then((users) => {
    return (res.status(200).json({users: users, msg: 'Users successfully retrieved'}));
  }).catch((err) => next(err));
});

module.exports = router;
