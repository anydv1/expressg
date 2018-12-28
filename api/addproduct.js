var Product  = require('../models/product.js');
var User  = require('../models/user.js');

addProduct=(req, res) =>{
    console.log('1234567',req.body)

		var product = new Product({
	
    title: req.body.title,
	image    : req.body.image,
    price: req.file,
	description: req.body.description
						
	})
	console.log('ert',product);
    product.save((err, save) => {
		if (err) {
			console.log("Error in accepting the team request", err)
			return res.send({ status: false, mess: "Error in accepting the team request" })
		} else if (save) {
			console.log('save successfully');
			return res.send({ status: true, mess: "This team is added to this tournament" })
		}
	})
    // (function(err, doc){
	// 	if(err) return res.json(err);
	// 	else  {


	// 		return res.json({status:'true',doc:doc,mess:'Successfully added!'});

	// 	}  
	// });
}

module.exports = { addProduct };