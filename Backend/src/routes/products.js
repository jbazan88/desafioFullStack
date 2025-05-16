const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMulter');

router
.get('/', productController.list)
.get('/:id', productController.detail)
.post('/', upload.single('image'), productController.create)
.put('/:id/image', upload.single('image'), productController.uploadImage)
.put('/:id', upload.single('image'), productController.update)
.delete('/:id', productController.remove)

module.exports = router;