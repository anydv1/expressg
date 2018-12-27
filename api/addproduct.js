var Product  = require('../models/product.js');
addProduct=(req, res) =>{
    console.log('1234567',req.body)

		var product = new Product({
	
    title: req.body.title,
	image    : req.body.image,
    price: req.body.price,
    description: req.body.description
						
	})
	product.save(function(err, doc){
		if(err) return res.json(err);
		else  {


			return res.json({status:'true',doc:doc,mess:'Successfully added!'});

		}  
	});
}

module.exports = { addProduct };