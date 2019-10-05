const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => (res.status(200).json({ msg: 'Welcome to GayraudLentz API' })));

module.exports = router;
