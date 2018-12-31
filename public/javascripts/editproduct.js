function editproduct() {
    var updatedtitle = document.getElementById("title").value;
    var updatedimage = document.getElementById("image").value;
  var updatedprice = document.getElementById("price").value;
  var updateddescription=document.getElementById("description").value;


  axios.post('/admin/edit-product', {
    title : updatedtitle,
  image  : updatedimage,
    price : updatedprice,
    description : updateddescription
})
.then(function (res) {

 console.log('----------',res);
window.location='/shop'


   });


}