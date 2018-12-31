const bcrypt = require('bcryptjs');

const Contact = require('../models/product');
const Usershop = require('../models/shopuser');

const mongoose = require('mongoose');


exports.getSignup = (req, res, next) => {
    res.render('usersignup', {
      path: '/signup',
      title: 'Signup',
      isAuthenticated: false
    });
  };


  exports.getLogin = (req, res, next) => {
    res.render('userlogin', {
      path: '/login',
      title: 'login',
      isAuthenticated: false
    });
  };


  exports.postLogin = (req, res, next) => {
  var email = req.body.email;
  var psw = req.body.psw
  console.log('working');
  Usershop.findOne({ email: email })
  .then(user => {
    if (!user) {
      console.log('existing email');
      return res.redirect('/login');
    }
    bcrypt
    .compare(psw, user.psw)
    .then(doMatch => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
          console.log(err);
          res.redirect('/');
        });
      }
      res.redirect('/login');
    })
  }).catch(err => {
    console.log(err);
  });
  
  };



  exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const psw= req.body.psw;
   
    Usershop.findOne({ email: email })
      .then(userDoc => {
        //console.log('23w4e5yu7iop');
        if (userDoc) {
          return res.redirect('/signup');
        }
        return bcrypt
          .hash(psw, 12)
          .then(hashedPassword => {
            const user = new Usershop({
              name: name,
              email: email,
              psw: hashedPassword,
              pswcnfrm:hashedPassword,
              cart: { items: [] }
            });
            return user.save();
          })
          .then(result => {
            res.redirect('/login');
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  