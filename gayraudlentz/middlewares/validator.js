const { check, validationResult, body } = require('express-validator');
const models = require('../models');

exports.registerValidator = [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  check('username').isLength({min: 4, max: 20}),
  check('firstName').isLength({min: 2, max: 30}),
  check('lastName').isLength({min: 2, max: 30}),
];
