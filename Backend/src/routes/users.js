const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerValidations, loginValidations } = require('../validations/userValidations');
const authMiddleware = require('../middlewares/authApi');

router
.post('/processRegister', registerValidations, userController.processRegister)
.post('/processLogin', loginValidations, userController.processLogin)
.get('/profile', authMiddleware, userController.profile)
.post('/logout', userController.logout)


module.exports = router;