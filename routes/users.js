var express = require('express');
var router = express.Router();

router.get('/login', function (req, res, next) {
    res.render('users/login', { title: 'Login'});
});

router.post('/login', function (req, res, next) {
    res.render('/users/login', { title: 'Login'});
});

router.post('/register', function (req, res, next) {
    res.render('/users/register', { title: 'Registro de usuario'});
});

router.get('/register', function (req, res, next) {
    res.render('users/register', { title: 'Registro de usuario'});
});

router.post('/profile', function (req, res, next) {
    res.render('/users/perfil', { title: 'Perfil'});
});

module.exports = router;