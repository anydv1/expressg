var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Admin' });
});
router.get('/admin/signup', function(req, res, next) {
  res.render('.admin/signup', { title: 'Admin Registration' });
});


module.exports = router;