var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users/login', function(req, res, next) {
  res.render('/login', { title: 'User Login' });
});
// router.post('/users/login', function(req, res, next) {
//   res.render('/login', { title: 'User Login' });
// });


router.get('/signup', function(req, res, next) {
  res.render('usersignup', { title: 'New User Registration' });

});



module.exports = router;
