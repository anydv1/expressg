var Product= require('../models/product')

var jwt = require('jsonwebtoken');
var JWTSECRET ='qwerty'

fetchProducts = ((req, res)=>{
    // console.log('ggvhvh',req.currentUser)
    //{userId :req.currentUser._id}

Product.find().then((doc)=>{
		
		
		if(doc)
		{
			 return res.send({doc:doc})
	}else{
		console.log('error')
		}

    }).catch((err)=>{
        console.log(err);
});
})
module.exports={fetchProducts};
