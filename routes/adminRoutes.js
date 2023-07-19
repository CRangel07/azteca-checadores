const adminController = require('../controllers/adminController');
const express = require('express');
router = express.Router();

router.get('/admin', adminController.showAdminPage);

module.exports = router;