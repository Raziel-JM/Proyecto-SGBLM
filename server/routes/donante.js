const express = require('express');
const router = express.Router();
const donanteController = require('../controllers/donanteController');

//Routes

router.get('/', donanteController.homepage);
router.get('/add', donanteController.addDonante);
router.post('/add', donanteController.postDonante);

//router.get('/donantes', donanteController.listaDonantes);
router.get('/view/:id', donanteController.view);
router.get('/edit/:id', donanteController.edit);
router.put('/edit/:id', donanteController.editPost);
router.delete('/edit/:id', donanteController.deleteDonante);

router.post('/search', donanteController.searchDonantes);



module.exports = router;