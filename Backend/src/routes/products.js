const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadController = require('../controllers/uploadController');

router
.get('/', productController.list)
.get('/:id', productController.detail)
.post('/', productController.create)
.put('/:id', productController.update)
.delete('/:id', productController.remove)
.post('/upload', uploadController.productUpload, productController.uploadImage)
.post('/upload/:id', uploadController.productUpload, productController.uploadImage)

module.exports = router;