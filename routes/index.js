var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken')
var JWTSECRET ='qwerty'


const User = require('../models/user');
const Product = require('../models/product');
var addapi = require('../api/addproduct');
var editapi = require('../api/editproduct');

var fetchapi = require('../api/fetchproduct');
var adminsignapi = require('../api/adminsignup');
var adminloginapi = require('../api/adminlogin');
// var logoutapi = require('../api/adminlogout');
var authcontroller = require('../controllers/auth');
var admincontroller = require('../controllers/admin');
var shopcontroller = require('../controllers/shop');

const isAuth = require('../middleware/is-auth');






// var verifyToken =function(req,res,next){
//    console.log('123456789',req.headers);
//   var authorizationHeader = req.headers['cookie'];
//   console.log('jbjfbje',authorizationHeader)
      
//   if (authorizationHeader) {
//     tokendata = authorizationHeader.split('; ')[1];
//     var token=tokendata.split('=')[1]
//     console.log('/////////////',tokendata)

//   if (token) {
//   jwt.verify(token, JWTSECRET, function(err, decoded) {
//     if (err)return res.send({ status: false, message: 'Failed to authenticate token.' });
//     User.findOne({email: decoded.id}).then((response)=>{
//       if(!response || response=='')return res.send({ status: false, message: 'User not found.'});
//       if(response){
//       req.currentUser = response;
//       return next();
//       }
//     }).catch(function(err){
//       return res.send({ status: false, message: 'User not found OR Some error has been occured.'});
//     });
//   });
//   }else {
//   return res.send({ status: false, message: 'No token provided.' });
//   }
// }

// };

var verifyToken= function(req,res,next){
  var token = '';
     if(req.cookies.jwtToken){
       token = req.cookies.jwtToken;
       if (token && token!=undefined) {
         if (!token)return res.redirect('/admin/login');
         jwt.verify(token,JWTSECRET, function(err, decoded) {
           if (err)return res.redirect('/admin/login');
             User.findOne({email: decoded.id}).then(function(res){
               if(res==null || res=='')return res.redirect('/admin/login');
               if(res){
          console.log('========',res)
                 req.currentUser = res;
                 return next();
               }
             }).catch(function(err){
               return res.redirect('/admin/login');
             });
         });
       }
       else {
         return res.redirect('/admin/login');
       }
     }else {
       return res.redirect('/admin/login');
     }
  };

/* GET home page. */
router.get('/',isAuth, function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
    res.render('index', { title: 'My Shop' ,prods  :docs,isAuthenticated: req.session.isLoggedin});

  });
 
});

router.get('/shop',isAuth, function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
    res.render('index', { title: 'My Shop' ,prods  :docs, isAuthenticated: req.session.isLoggedin});
});
});

// router.get('/products', verifyToken, function(req, res, next) {
//   var userId = req.user;
//   console.log('edfrghj',userId);
//   Product.find(function(err,docs){
//   //  User.findOne( function(err,docs){
//     console.log('111111111', docs.length);
//     res.render('./admin/products', { title: 'My Shop' ,prods  :docs, isAuthenticated:req.session.isLoggedin});
// });
// });

router.get('/products',verifyToken, shopcontroller.getProducts);


router.get('/admin',function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
    res.render('./admin/login', { title: 'My Shop' ,prods  :docs});
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

router.get('/admin/add-product', verifyToken,function(req, res, next) {
  res.render('./admin/add-product', { title: 'Add Product' });
});

// router.post('/admin/add-product', addapi.addProduct );   



router.post('/admin/add-product', admincontroller.postAddProduct);





router.get('/admin/edit-product',function(req, res, next) {
  Product.find(function(err,docs){
    console.log('111111111', docs.length);
  res.render('./admin/edit-product',{ title: 'Edit product' ,prods :docs});
});
});


router.post('/admin/edit-product', admincontroller.posteditProducts);


// router.get('/admin/edit-product',admincontroller.geteditProducts );


//router.post('/admin/logout', logoutapi.logOut);


router.post('/delete',authcontroller.postDelete );

 router.get('/cart',isAuth,shopcontroller.getCart);

 router.post('/cart', shopcontroller.postCart);
 router.post('/create-order',shopcontroller.postOrder);
 router.get('/orders', isAuth, shopcontroller.getOrders);




module.exports = router;
