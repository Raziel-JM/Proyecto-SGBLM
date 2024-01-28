const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

//Routes

router.get('/', customerController.homepage);

module.exports = router;