var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/aboutUs', function (req, res, next) {
  res.render('aboutUs', { title: 'Sobre nosotros'});
});

router.get('/list', function(req, res, next) {
  res.render('list', { title: 'productos' });
});

module.exports = router;
