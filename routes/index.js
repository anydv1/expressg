var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
var addapi = require('../api/addproduct');
var editapi = require('../api/editproduct');

var fetchapi = require('../api/fetchproduct');
var adminsignapi = require('../api/adminsignup');
var adminloginapi = require('../api/adminlogin');
var logoutapi = require('../api/adminlogout');
var authcontroller = require('../controllers/auth');
var admincontroller = require('../controllers/admin');


/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
    res.render('index', { title: 'My Shop' ,prods  :docs,isAuthenticated: req.session.isLoggedin});

  });
 
});

router.get('/shop', function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
    res.render('index', { title: 'My Shop' ,prods  :docs,isAuthenticated: req.session.isLoggedin});
});
});

router.get('/products', function(req, res, next) {
  Product.find(function(err,docs){
    
    console.log('111111111', docs.length);
    res.render('./admin/products', { title: 'My Shop' ,prods  :docs,isAuthenticated: req.session.isLoggedin});
});
});


router.get('/admin', function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
    res.render('./admin/products', { title: 'My Shop' ,prods  :docs,isAuthenticated: req.session.isLoggedin});
});
});

router.get('/admin/signup', function(req, res, next) {
  res.render('./admin/signup', { title: 'Admin Registration' });
});



router.get('/admin/login', function(req, res, next) {
  res.render('./admin/login', { title: 'Admin Login' });
});

router.post('/admin/signup', adminsignapi.adminSign);


router.post('/admin/login',adminloginapi.adminLogin);

router.get('/admin/add-product',function(req, res, next) {
  res.render('./admin/add-product', { title: 'Add Product' });
});

router.post('/admin/add-product', addapi.addProduct );   

router.get('/admin/edit-product',function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
  res.render('./admin/edit-product',{ title: 'Edit product' ,prods :docs});
});
});


router.post('/admin/edit-product', admincontroller.posteditProducts);


// router.get('/admin/edit-product',admincontroller.geteditProducts );


router.post('/admin/logout', logoutapi.logOut);


router.post('/delete',authcontroller.postDelete );


module.exports = router;
