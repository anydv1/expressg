const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String

  },
  
 price: {
    type: Number,
    required: true
  },

description:{
type:String,
required:true

  }
  
});
var product = mongoose.model('Product', productSchema)
module.exports = product;

