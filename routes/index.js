var express = require('express');
var router = express.Router();
const User = require('../models/user');
const product = require('../models/product');
var addapi = require('../api/addproduct')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Shop' });
});


router.get('/products', function(req, res, next) {
  res.render('admin', { title: 'Products' });
});
router.get('/admin', function(req, res, next) {
  res.render('admin',{ title: 'admin' });
});
router.get('/admin/signup', function(req, res, next) {
  res.render('./admin/signup', { title: 'Admin Registration' });
});



router.get('/admin/login', function(req, res, next) {
  res.render('./admin/login', { title: 'Admin Login' });
});

router.post('/admin/signup', function(req, res, next) {
  res.render('./admin/signup', { title: 'Admin Registration' });
});


router.post('/admin/login', function(req, res, next) {
  res.render('./admin/add-product', { title: 'Add product' });
});

router.get('/admin/add-product',function(req, res, next) {
  res.render('./admin/add-product', { title: 'Add Product' });
});

router.post('/admin/add-product',addapi.addProduct);   

module.exports = router;
