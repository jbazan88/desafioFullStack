const express = require('express');
const router = express.Router();
const { list, detail, add, create, edit, update, remove, search, showCart} = require('../controllers/productController.js');
const userSessionCheck = require('../middlewares/userSessionCheck.js');
const upload = require('../middlewares/uploadMulter');

router
    .get('/', list)
    .get('/detail/:id',detail)
    .get('/add',add) //rendieriza el formulario
    .post('/create',upload.single('image'),create) //recibe los datos del formulario
    .get('/edit/:id',edit)
    .put('/update/:id',upload.single('image'), update)
    .delete('/remove/:id',remove)
    .get('/search',search)
    .get('/cart',userSessionCheck, showCart)

module.exports = router;