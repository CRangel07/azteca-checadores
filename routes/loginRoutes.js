
const express = require('express');
router = express.Router();
const loginController = require('../controllers/loginControllers');
const authUsersController = require('../controllers/authUsersController');

// Mostrar la pagina de login
router.get('/login', loginController.showLoginPage);

router.post('/login', authUsersController.login)

router.get('/logout', loginController.closeSesion)
 
module.exports = router;