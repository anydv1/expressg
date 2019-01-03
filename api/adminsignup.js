var User  = require('../models/user');
const bcrypt = require('bcryptjs');

adminSign=(req, res) =>{
	const name = req.body.name;
    const email = req.body.email;
    const psw= req.body.psw;
	 console.log('1234567',req.body)
	 
	bcrypt
	.hash(psw, 12)
	.then(hashedPassword => {
	var user = new User({
	
    name:name,
    email:email,
    psw:hashedPassword,
    pswcnfm:hashedPassword
						
	}) ;
	return user.save();
})
	.then((doc) => {
		console.log('sdbdhbb',doc)
		return res.send({status : true, mess:'Successfully inserted!'});
})
.catch((e)=>{
		console.log('internal  error!!!!!!!!!')
	});
	
}

module.exports = {adminSign};



