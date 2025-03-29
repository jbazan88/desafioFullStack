const express = require('express');
const { index, aboutUs, admin, adminProducts, adminUsers } = require('../controllers/indexController.js');
const adminCheck = require('../middlewares/adminCheck.js');
const router = express.Router();

router
    .get('/', index)
    .get('/admin', admin)
    .get('/admin/products',adminCheck, adminProducts)
    .get('/admin/users', adminCheck, adminUsers)
    .get('/aboutUs', aboutUs)

module.exports = router;
