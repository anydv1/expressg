const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shopuserSchema = new Schema({
 name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  
psw: {
    type: String,
    required: true
  },
pswcnfrm:{
type:String

  }
});
var shopuser = mongoose.model('ShopUser', shopuserSchema)
module.exports = shopuser;

