var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');


var authcontroller = require('../controllers/auth');




/* GET users listing. */
// router.get('/users/login', function(req, res, next) {
//   res.render('/login', { title: 'User Login' });
// });
// router.post('/users/login', function(req, res, next) {
//   res.render('/login', { title: 'User Login' });
// });


// router.get('/signup', function(req, res, next) {
//   res.render('usersignup', { title: 'New User Registration' });

// });



router.get('/signup',authcontroller.getSignup);
router.post('/signup',authcontroller.postSignup);

router.get('/login',authcontroller.getLogin);
 router.post('/login',authcontroller.postLogin);

// router.get('/login', function(req, res, next) {
//   res.render('userlogin', { title: 'Login into your existing account' });

// });







module.exports = router;
