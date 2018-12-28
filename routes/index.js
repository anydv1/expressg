var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
var addapi = require('../api/addproduct');
var editapi = require('../api/editproduct');

var fetchapi = require('../api/fetchproduct');
var adminsignapi = require('../api/adminsignup');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
    res.render('index', { title: 'My Shop' ,prods  :docs});

  });
 
});

router.get('/shop', function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
    res.render('index', { title: 'My Shop' ,prods  :docs});
});
});


router.get('/admin', function(req, res, next) {
  res.render('./admin/login',{ title: 'admin' });
});

router.get('/admin/signup', function(req, res, next) {
  res.render('./admin/signup', { title: 'Admin Registration' });
});



router.get('/admin/login', function(req, res, next) {
  res.render('./admin/login', { title: 'Admin Login' });
});

router.post('/admin/signup', adminsignapi.adminSign);


router.post('/admin/login', function(req, res, next) {
  res.render('./admin/add-product', { title: 'Add product' });
});

router.get('/admin/add-product',function(req, res, next) {
  res.render('./admin/add-product', { title: 'Add Product' });
});

router.post('/admin/add-product',addapi.addProduct);   

router.get('/admin/edit-product',function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
  res.render('./admin/edit-product',{ title: 'Edit product' ,prods  :docs});
});
});

router.post('/admin/edit-product', editapi.editProducts );

module.exports = router;
