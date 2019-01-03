const bcrypt = require('bcryptjs');

var User = require('../models/user');
var jwt = require('jsonwebtoken');
var JWTSECRET ='qwerty'


adminLogin =(req, res)=>{

	var email = req.body.email;
	var psw = req.body.psw;
	
	User.findOne({email:email}).then((doc)=>{
		console.log("dwddw0", doc);
		
		if(doc)
		{
			// if(psw==doc.psw)
			bcrypt.compare(psw,doc.psw)
			{
				var token = jwt.sign({id:doc.email},JWTSECRET);
				doc.token=token
				doc.save();
				res.cookie('jwtToken',token)
				return res.send({status : true,token:token})
			}

		}

	}).catch((e)=>{
		console.log("dwdwdbjbbbb", e);

	});

}



module.exports = {adminLogin};