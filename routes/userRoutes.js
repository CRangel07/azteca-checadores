const express = require('express');
router = express.Router();
const userController = require('../controllers/userController.js');

// Mostrar la pagina de login
router.get('/user', userController.showUserPage);
router.get('/user/images', userController.showBranchImages)

module.exports = router;