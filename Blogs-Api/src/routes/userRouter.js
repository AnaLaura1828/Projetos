const express = require('express');
const { userController } = require('../controllers');
const { tokenValidade } = require('../middleware');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', tokenValidade, userController.getAll);
router.get('/:id', tokenValidade, userController.getByIds);

module.exports = router;