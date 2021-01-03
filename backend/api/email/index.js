const express = require('express');
const router = express.Router();

const emailCtrl = require('./email.ctrl');

router.get('/:urlId', emailCtrl.loadEmail);
router.post('/', emailCtrl.addEmail);
router.patch('/', emailCtrl.removeEmail);

module.exports = router;
