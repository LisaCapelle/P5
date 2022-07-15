function getProductList() {
fetch ("http://localhost:3000/api/products")
.then (function(res){
    if (res.ok) {
        return res.json();
    }
})
.then (function(value){
    console.log(value);
})
.catch(function(err){
        //une erreur est survenue
    });
}
getProductList();





// //GET PRODUCTLIST FROM API
// fetch("http://localhost:3000/api/products")
// .then((res) =>{
//   //if OK the result is sent as json file
//   return res.ok ? res.json()
//   : alert("Page indisponible, merci de vous reconnecter ulterieurement.");
// })
// //      EXTRACTION DES DONNÉES
// .then((value) => {console.log(value)})
// .then()
// .catch((err) =>{
//   console.log(err);
// });



// }
// console.log(response)
// const itemsList = response;}
// }
   

    //let productItem ={name:'Jean', color:'red',}
    //console.log(productItem.name);
    //
    //


    //console.log()
    //mafonction (param1, param2)
    //si condition faire
    // retour calcul
    // sinon faire
    //mafonction(param1, param2)
    //retour qqch
    //fin condition faire
    // déclarer variable: const totalItems = ;
    //let items = 0;
    //}

    //fetch data 
// const fetchProductData = () => {
//     fetch('http://localhost:3000/api/products')
//     .then( response => response.json() )
//     .then( data => {
//     // render page
//     renderPage(data)
//     // save product data in LocalStorage
//     localStorage.setItem('productData',JSON.stringify(data));
//     })
//    // .catch( error => {itemsElement.innerText = error + 'problème de chargement de page';});
// }
// fetchProductData();


// function fetch('http://localhost:3000/api/products')  {

//     // A Promise
//     var ProductList = new Product (
//         function (resolve, reject) {

//             if (allthingOK) {
//                // ...
//                var response = ...;

//                resolve(response);
//             } else {
//                 var error = new Error('Error Cause');
//                 reject(error);
//             }

//         }
//     );

//     return aPromise;
// }

