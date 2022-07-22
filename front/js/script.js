function getProductList() {
    fetch("http://localhost:3000/api/products")
        .then(response => {
            if (response.ok) { return response.json(); }
        })
        .then(function (productList) {

            
            const numberOfProducts = 8;
            for (let x = 0; x < numberOfProducts; x++) {
                console.log(productList[x]);
             const items = document.getElementById('items');
 items.innerHTML += `<a href="./product.html?id=${productList[x]._id}"><article><img src="${productList[x].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1"><h3 class="productName">${productList[0].name}</h3><p class="productDescription">${productList[0].description}Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>`
             }
        })
         .catch(function (err) {//une erreur est survenue
         });
 }
getProductList();
