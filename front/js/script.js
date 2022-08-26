// function to get list of products from API
function getProductList() {
    fetch("http://localhost:3000/api/products")
        .then(response => {
            if (response.ok) { 
                return response.json(); }
        })
        .then(function (productList) {

// function to display the whole list of products on index.html page
            const numberOfProducts = productList.length;
            for (let i = 0; i < numberOfProducts; i++) {
                console.log(productList[i]);
                const items = document.getElementById('items');
                items.innerHTML += `<a href="./product.html?id=${productList[i]._id}">
                <article>
                <img src="${productList[i].imageUrl}" alt="${productList[i].altTxt}">
                <h3 class="productName">${productList[i].name}</h3>
                <p class="productDescription">${productList[i].description}</p>
                </article>
                </a>`
            }
        })
        .catch((error) => {alert("Une erreur est survenue")
        });
}
getProductList();
