const express = require('express');
const productController = require('../controllers/productController');
const nameValidattion = require('../middlewares/nameValidation');

const router = express.Router();

router.get('/', productController.findAll);

router.get('/search', productController.controllerSearchName);

router.get('/:id', productController.getById);

router.post('/',
nameValidattion,
productController.controllerInsert);

router.put('/:id',
nameValidattion,
productController.controllerUpdate);

router.delete('/:id', productController.controllerDelete);

module.exports = router;