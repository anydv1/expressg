const Product = require('../models/product');
const Order = require('../models/order');
const ShopUser = require('../models/shopuser');






exports.getProducts = (req,res,next) => {
  var email= req.currentUser.email;
  console.log('swedrfgth',email);
  // User.findOne(email)
  Product.find()
  .then(products =>{
    // console.log('xdfcgvhb',req.currentUser.email);
    // console.log('xdfcgvhbfffffff',products.length);
res.render('./admin/products', {
      title: 'Your products' ,
       prods  :products
     });
    })
     .catch(err => {
       console.log(err);z
     
  });

 };



 exports.getCart = (req, res, next) => {
  //  console.log('wwwwwwwww',req.user);
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
   
      res.render('cart', {
        path: '/cart',
        title: 'Your Cart',
        products: products
      });
    })
    // console.log('wertyuio',title)
    .catch(err => console.log(err));
};

  
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    }).catch(err=>{
console.log(err);
    });
};




exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
const quantity =req.body.qty;
// const index = req.user.cart.items.length-1;
// console.log('eeeeeeeeee',index.productId);
var cart =req.user.cart.items;
// console.log("CART", cart)
cart.forEach(element => {
  console.log("ELEMENT", element)
  
  if(element.productId==prodId){
    console.log('YES')
    if(element.quantity>1){
      element.quantity--;
      console.log('WORKING',element.quantity);
      req.user.save((err,save) => {
        if(err){
          console.log('ERROR',err)
        }
        else if(save){
          console.log('SAVED Successfully');
          res.redirect('/cart');
        }
      });
    }else if(element.quantity == 1) {
      console.log("ELEMENT LOCATION", cart.indexOf(element))
      cart.splice(cart.indexOf(element),1)
      console.log("CARTT", cart)
      req.user.save((err,save) => {
        if(err){
          console.log('ERROR',err)
        }
        else if(save){
          console.log('SAVED Successfully');
       res.redirect('/cart');
        }
      });
    
    // return req.user.removeFromCart(prodId);
  }
}

});
//ShopUser.findOne({prodId:cart.index.productId})

  // req.user
  //   .updateCart(prodId)
  //   .then(result => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => console.log(err));
 };



// exports.postCartDeleteProduct = (req,res,next) => {
//   const prodId = req.body.productId;
//  ShopUser.find()
//  .then(


//  ).catch();
// };

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId.doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    }).then((result) => {
    
       return req.user.clearCart();

      // userSchema.methods.clearCart = function() {
      //   this.cart = { items: [] };
      //   return this.save();
      // };
    })

    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};




exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated:req.session.isLoggedIn
      });
    })
    .catch(err => {
   console.log(err);
    });
};