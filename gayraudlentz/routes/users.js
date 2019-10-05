const express = require('express');

const router = express.Router();
const models = require('../models');

router.get('/', (req, res, next) => {
  models.User.findAll().then(users => (res.status(200).json({ users, msg: 'Users successfully retrieved' }))).catch(err => next(err));
});

module.exports = router;
