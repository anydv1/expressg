var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users/login', function(req, res, next) {
  res.render('/login', { title: 'User Login' });
});
// router.post('/users/login', function(req, res, next) {
//   res.render('/login', { title: 'User Login' });
// });


router.get('/users/signup', function(req, res, next) {
  res.render('/signup', { title: 'New User Registration' });

});



module.exports = router;
