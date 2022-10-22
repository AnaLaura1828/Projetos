const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.controllerSalesAll);

router.get('/:id', salesController.controllerSalesById);

router.delete('/:id', salesController.controllerDeleteSales);

module.exports = router;