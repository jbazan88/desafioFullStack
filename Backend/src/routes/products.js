const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMulter');

router
.get('/', productController.list)
.get('/:id', productController.detail)
.post('/', upload.single('image'), productController.create)
.put('/:id', productController.update)
.delete('/:id', productController.remove)

module.exports = router;