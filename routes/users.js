var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');


var authcontroller = require('../controllers/auth');








router.get('/signup',authcontroller.getSignup);
router.post('/signup',authcontroller.postSignup);

router.get('/login',authcontroller.getLogin);
 router.post('/login',authcontroller.postLogin);

 router.post('/logout',authcontroller.postLogout);











module.exports = router;
