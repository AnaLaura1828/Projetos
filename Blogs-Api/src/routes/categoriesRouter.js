const express = require('express');
const { categoriesController } = require('../controllers');
const { tokenValidade } = require('../middleware');

const router = express.Router();

router.post('/', tokenValidade, categoriesController.addCategories);
router.get('/', tokenValidade, categoriesController.getAllCategoryController);

module.exports = router;