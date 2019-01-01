logOut=(req, res)=>{

    pp.findOne({email : req.currentUser.email}).then((doc)=>{
       console.log("dwddw0",doc);
        if(doc)
        {
           var token = '';
           doc.token=token
           console.log('aduhuhuuuu',token)
           doc.save();
           res.cookie('jwtToken',['',false]);
           return res.json({mess:'logout successfull!'});
        }
        
   }).catch((e)=>{
   
       console.log('kkkkkkkkkkkkkkkkkkkkkkkk',e)
   });
   };
   module.exports={logOut};