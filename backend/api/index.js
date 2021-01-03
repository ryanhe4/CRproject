const express = require('express');
const router = express.Router();

const urlRouter = require('./url');
const emailRouter = require('./email');

router.use('/url',urlRouter);
router.use('/email', emailRouter);

module.exports = router;
