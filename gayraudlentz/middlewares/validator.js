const { check } = require('express-validator');

exports.registerValidator = [
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  check('username').isLength({ min: 4, max: 20 })
];

exports.loginValidator = [
  check('email'),
  check('email').isEmail(),
  check('password')
];

exports.patchUserValidator = [
  check('username').isLength({ min: 4, max: 20 }),
  check('description')
];
