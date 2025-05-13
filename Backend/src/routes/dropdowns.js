const express = require('express');
const router = express.Router();
const dropdownController = require('../controllers/dropdownController');

router.get('/', dropdownController.getDropdowns);

module.exports = router;