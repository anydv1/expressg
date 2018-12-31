const bcrypt = require('bcryptjs');

const Product = require('../models/product');
const Usershop = require('../models/shopuser')


exports.geteditProducts=(req,res,next) =>{
    const prodId = req.body._id;
    console.log('htdry',prodId);
  Product.findById(prodId)
    .then(product => {
    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
    
      
      });
    })
    .catch(err => {
     console.log(err);
    });
};

// res.render('admin/edit-product') , {
// path:'/admin/edit-product',
// product: product,
// title: 'Edit product'
// }
// };



exports.posteditProducts = (req,res,next) => {
var prodId = req.body.productId;
var updatedTitle = req.body.title;
var updatedImage = req.body.image;
var updatedPrice = req.body.price;
var updatedDesc = req.body.description;

Product.findById(prodId)
.then(product => {
  product.title = updatedTitle;
  product.price = updatedPrice;
  product.description = updatedDesc;
  product.image= updatedImage;
  return product.save().then(result => {
    console.log('UPDATED PRODUCT!');
    res.redirect('/products');
  });
})
.catch(err => {
  console.log('cant edited',err);
});
};

