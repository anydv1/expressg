var User  = require('../models/user');
adminSign=(req, res) =>{
    console.log('1234567',req.body)

		var user = new User({
	
    name:req.body.name,
    email:req.body.email,
    psw:req.body.psw,
    pswcnfm:req.body.pswcnfrm
						
	})
	user.save().then((doc) => {
		console.log('sdbdhbb',doc)
		return res.send({status : true, mess:'Successfully inserted!'});
	
		
	}).catch((e)=>{
		console.log('internal  error!!!!!!!!!')
	});
	
}

module.exports = {adminSign};



