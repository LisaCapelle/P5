// fonction pour récupérer la liste des produits via l'API
function getProductList() {
    fetch("http://localhost:3000/api/products")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (productList) {

            // fonction pour afficher tous les produits sur la page d'accueil
            const numberOfProducts = productList.length;
            // boucle for pour afficher les produits un par un
            for (let i = 0; i < numberOfProducts; i++) {
                const items = document.getElementById('items');
                // modification contenu balises grâce à l'attribut innerHTML de l'objet Element du DOM (par interpolation)
                items.innerHTML += `<a href="./product.html?id=${productList[i]._id}">
                <article>
                <img src="${productList[i].imageUrl}" alt="${productList[i].altTxt}">
                <h3 class="productName">${productList[i].name}</h3>
                <p class="productDescription">${productList[i].description}</p>
                </article>
                </a>`
            }
        })
        .catch((error) => {
            alert("Une erreur est survenue, le catalogue n'est pas disponible")
        });
}
getProductList();