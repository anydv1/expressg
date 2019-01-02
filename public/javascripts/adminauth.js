function adminsign(){
  
    
        var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;
    var pswcnfrm=document.getElementById("pswcnfrm").value;
       console.log('123456ty7uioo',name,email);
        axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        
        axios.post('/admin/signup', {
       name:name,
       email:email,
       psw:psw,
       pswcnfrm:pswcnfrm
       
      })
      .then(function (res) {
        if(res.data.status){
            // alert(res.data.mess);
            window.location = '/admin/login';
        }
        if(!res.data.status){
            // alert(res.data.mess);
            window.location = '/signup';
        }
  
        }).catch((e)=>{
            alert('Internal server error',e);
  
          });
    

};


//loGIN JS

function  adminlogin(){


    var email = document.getElementById('email').value;

    var psw = document.getElementById('psw').value;
   
    if(email=="" && psw==""){
        alert("fields are empty");
        return false;
    }
    
    axios.post('/admin/login', {
        email:email,
       psw:psw
  }).then((res) => {
    console.log('logged in');
    
               if (typeof(Storage) !== "undefined") 
               {
                localStorage.setItem("jwtToken", res.data.token);
                  window.location = '/products'
               }
          
     }).catch((e)=>{
         alert('failed');

     });
    }




    function DeleteCookies() {
        console.log( 'this is running' );
    
        //Use old date to expire the cookies
        let expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT;'
    
        //Split each cookie into an array element.
        let cookiesArray = document.cookie.split(";");
    
        //Split the cookie to have name as the first value.
        //Then use the cookie's name to expire the cookie.
        for ( let cookie = 0; cookie < cookiesArray.length; cookie++ ) {
            let name = cookiesArray[cookie].split( "=" )[0];
            document.cookie = name + "=;" + expire;
        }
    
    }

function lout(){
console.log("logging out");
    // axios.post('/admin/logout').then((res)=>{
        // console.log('v!!!!!!!!!!!!',res.doc)
        DeleteCookies();
   localStorage.setItem("jwtToken", '');
             window.location = "/shop";
             console.log('!!!!!!!!!!',jwtToken)
        //    })
           
           
           .catch((err)=>{
        console.log('can not logout',err)
     }); 
}

