const express = require('express');
const router = express.Router();
const donanteController = require('../controllers/donanteController');

//Routes

router.get('/', donanteController.homepage);
router.get('/add', donanteController.addDonante);

module.exports = router;