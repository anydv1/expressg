
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah')
              .attr('src', e.target.result)
              .width(200)
              .height(200)
      };

      reader.readAsDataURL(input.files[0]);
  }
}




function addproducts() {
  
    
        var title = document.getElementById("title").value;
      // var image = document.getElementById("image").value;
      var image = document.getElementById('image').files[0];
    var price = document.getElementById("price").value;
    var description=document.getElementById("description").value;


       console.log('123456ty7uioo',title,image,price,description);
console.log('hiiiiiiiii',image.name);
        //axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      
        axios.post('/admin/add-product', {
       
           title : title,
           image  : image.name,
           price : price,
           description : description
      })
      .then(function (res) {

        console.log('----------',res);
      
       window.location='/products'


          });
    
}