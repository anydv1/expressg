const bcrypt = require('bcryptjs');
const fs = require('fs');

const Product = require('../models/product');
const Usershop = require('../models/shopuser')

const User = require('../models/user')



exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  
  
  console.log(image);



  if (!image) {
    return res.status(422).render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      product: {
        title: title,
        price: price,
        description: description
      }
    });
  }

  const imageUrl = image.path;
  console.log('eeeeeeeeeeeeee',req.currentUser);

  const product = new Product({
  title: title,
  price: price,
  description: description,
  image: imageUrl
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/products');
    })
    .catch(err => {
  
    console.log(err);
    });
};






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


const deleteFile = (filePath) =>{
console.log('deleted');

  fs.unlink(filePath,(err)=>{
      if(err){
          throw (err);
      }
  });
}




exports.posteditProducts = (req,res,next) => {
var prodId = req.body.productId;
var updatedTitle = req.body.title;
var image = req.file;
var updatedPrice = req.body.price;
var updatedDesc = req.body.description;

Product.findById(prodId)
.then(product => {
  product.title = updatedTitle;
  product.price = updatedPrice;
  product.description = updatedDesc;
  if (image) {
  deleteFile(product.image);
    product.image = image.path;
  }
  return product.save().then(result => {
    console.log('UPDATED PRODUCT!');
    res.redirect('/products');
  });
})
.catch(err => {
  console.log('cant edit',err);
});
};

