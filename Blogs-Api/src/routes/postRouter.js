const express = require('express');
const { postController } = require('../controllers');
const { tokenValidade } = require('../middleware');

const router = express.Router();

router.get('/', tokenValidade, postController.getControllerAll);
router.get('/:id', tokenValidade, postController.getPostIdController);

module.exports = router;