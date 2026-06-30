const express = require('express');
const router = express.Router();
const delegates = require('./delegate.controller');

router.post('/', delegates.create);
router.get('/', delegates.findAll);
router.post('/bulk', delegates.createBulk);

module.exports = router;