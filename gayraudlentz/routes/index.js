const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  return (res.status(200).json({msg: "Welcome to GayraudLentz API"}));
});

module.exports = router;
