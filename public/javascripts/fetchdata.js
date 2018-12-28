function fetchdata() {
  
    
    const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
const price = document.getElementById("price").value;
const description=document.getElementById("desc").value;
   console.log('123456ty7uioo',title,image,price,description);
  //  axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
    
    axios.post('/shop', {
   
       title : title,
     image  : image,
       price : price,
       description : description
  })
  .then(function (res) {
console.log('----------',res);

      });

}















// function fetchdata(){
    
   
//     //axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
//      axios.get('/shop', {
        
//          title:title,
//          image:image,
//          price:price,
//          description:description
        
//    })
//    .then(function (res) {
//      console.log('awstrfhyujik',res.data);
       
//      var b=res.data.doc.length;
//         var a=res.data.doc;
        
              
//     const title = document.getElementById("title").value;
//    const image = document.getElementById("image").value;
//   const price = document.getElementById("price").value;
//   const description=document.getElementById("desc").value;
    
//  } 



 //"value="${a[i].email}"