const express = require('express');
const router = express.Router();
const { signup } = require('../controller/user');
router.post('/', signup);

module.exports = router;
