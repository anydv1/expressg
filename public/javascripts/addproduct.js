function addproducts() {
  
    
        var title = document.getElementById("title").value;
      var image = document.getElementById("image").value;
    var price = document.getElementById("price").value;
    var description=document.getElementById("description").value;
       console.log('123456ty7uioo',title,image,price,description);
      //  axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        
        axios.post('/admin/add-product', {
       
           title : title,
         image  : image,
           price : price,
           description : description
      })
      .then(function (res) {
       fetchdatabase();
console.log('----------',res);
          });
    
}