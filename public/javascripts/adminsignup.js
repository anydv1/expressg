function adminsign(){
  
    
        var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;
    var pswcnfrm=document.getElementById("pswcnfrm").value;
       console.log('123456ty7uioo',name,email);
      //  axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        
        axios.post('/admin/signup', {
       name:name,
       email:email,
       psw:psw,
       pswcnfrm:pswcnfrm
       
      })
      .then(function (res) {
        //fetchdatabase();

        console.log('----------',res)
          });
    

}