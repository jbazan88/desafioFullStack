const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');


router.get('/admin', productControllers.admin);
router.get('/admin/add', productControllers.add);
router.post('/admin/create', productControllers.create);
router.get('/admin/edit/:id', productControllers.editForm); // Cambiado a editForm
router.post('/admin/edit/:id', productControllers.edit); // Cambiado a edit
router.post('/admin/update/:id', productControllers.update);
router.get('/admin/delete/:id', productControllers.remove);


module.exports = router;