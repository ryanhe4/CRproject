const express = require('express');
const router = express.Router();

const urlCtrl = require('./url.ctrl');

router.get('/', urlCtrl.loadUrl);
router.post('/', urlCtrl.addUrl);
router.delete('/:urlId', urlCtrl.removeUrl);

module.exports = router;
