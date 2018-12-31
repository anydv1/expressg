var Product  = require('../models/product.js');
var User  = require('../models/user.js');

addProduct=(req, res) =>{

	var product = new Product({
	title: req.body.title,
	image    : req.file,
    price: req.body.price,
	description: req.body.description,
	isAuthenticated:req.session.isLoogedin
						
	})
	// upload(req,res,(err) =>{
	// 	if(err){
	// 		return res.send({status:false,meess:'error'});
	// 	}
	// 	else if (upload){
	// 		return res.send({status:true,meess:'error'});
	// 	}
	// })
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