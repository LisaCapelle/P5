// function to get list of products from API
function getProductList() {
    fetch("http://localhost:3000/api/products")
        .then(response => {
            if (response.ok) { return response.json(); }
        })
        .then(function (productList) {

// function to display the whole list of products on index.html page
            const numberOfProducts = productList.length;
            for (let x = 0; x < numberOfProducts; x++) {
                console.log(productList[x]);
             const items = document.getElementById('items');
 items.innerHTML += `<a href="./product.html?id=${productList[x]._id}"><article><img src="${productList[x].imageUrl}" alt="${productList[x].altTxt}"><h3 class="productName">${productList[x].name}</h3><p class="productDescription">${productList[x].description}Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>`
             }
        })
         .catch(function (err) {//an error has occured
         });
 }
getProductList();