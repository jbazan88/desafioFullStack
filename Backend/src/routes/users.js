var express = require('express');
const router = express.Router();
const userSessionCheck = require('../middlewares/userSessionCheck');
const { register, login, processRegister, processLogin, profile, logout, update } = require('../controllers/userController.js');
const { registerValidations} = require('../validations/userValidations');

router
.get('/register', register)
.post('/processRegister', registerValidations, processRegister)
.get('/login', login)
.post('/processLogin', processLogin)
.get('/logout',logout)
.get('/profile', userSessionCheck, profile)
.put('/update',update)

module.exports = router;