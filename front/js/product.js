// elements to add on product page
let imgElement = document.querySelector(".item__img");
let titleElement = document.querySelector("#title");
let priceElement = document.querySelector("#price");
let descriptionElement = document.querySelector("#description");
let colorsElement = document.getElementById("colors");

// get clicked product id from URL
const pageString = window.location.search;
const urlParams = new URLSearchParams(pageString);
const id = urlParams.get("id");

// get data of clicked product via API
function getProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => { if (response.ok) { return response.json(); } })
        .then(product => { displayProduct(product) })
        .catch(function (error) { alert('une erreur est survenue') });
}
getProduct();

// display colors of the clicked product
function getColorOptions(product) {
    console.log(product);
    for (let x = 0; x < product.colors.length; x++) {
        colorsElement.innerHTML += `<option value="${product.colors[x]}"> 
        ${product.colors[x]}</option>`
    }
}

// display all elements of the clicked product via API
function displayProduct(product) {
    imgElement.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    titleElement.innerHTML = `<h1 id="title">${product.name}</h1>`;
    priceElement.innerHTML = `<span id="price">${product.price}</span>`;
    descriptionElement.innerHTML = `<p id="description">${product.description}</p>`;
    getColorOptions(product);
}

// variables for local storage
let color = document.querySelector("#colors");
let quantity = document.querySelector("#quantity");
let addToCartBtn = document.querySelector("#addToCart");

// listen to product options chosen by user
color.addEventListener('select', e => {
    if (color.value === "") {
        alert("Veuillez sélectionner une couleur");
    }
    else {
        const product = {
            id: id,
            color: color.value,
        }
        addToCart(product)
    }
})

quantity.addEventListener('input', e => {
    if (quantity.value === 0) {
        alert("Veuillez indiquer la quantité voulue, entre 1 et 100");
    }
    else if (quantity.value > 100) {
        alert("Maximum 100 produits par commande");
    }
    else if (quantity.value > 0 && quantity.value <= 100) {
        const product = {
            id: id,
            quantity: quantity.value,
        }
        addToCart(product)
    }
})
// OU BIEN FAUT-IL REMPLACER LES 2 PREMIERS PAR 1 SEUL D'ECOUTE DU BOUTON D'AJOUT AU PANIER???
// addToCartBtn.addEventListener('click', e => {
//     if (color.value === "") {
//         alert("Veuillez sélectionner une couleur");}
//     else if (quantity.value === 0) {
//             alert("Veuillez indiquer la quantité voulue, entre 1 et 100");}
//     else if (quantity.value > 100){
//         alert("Maximum 100 produits par commande");}
//     else if (quantity.value > 0 && quantity.value <= 100) {
//             const product = {
//             id: id,
//             color: color.value,
//             quantity: quantity.value,
//         }
//         addToCart(product)
//     } 
// })

// save to local storage
function saveDataToLS(productsInCart) {
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
}
// get data from local storage
function getDataFromLS() {
    let productsInCart = localStorage.getItem('productsInCart');
    if (productsInCart == null) { return []; }
    else { return JSON.parse(productsInCart); }
}

// add product to cart
function addToCart(product) {
    let productsInCart = getDataFromLS();
    // check if product already in cart, if so increase quantity, if not add product to cart
    let foundProduct = productsInCart.find(p => p.id == product.id)
    if (foundProduct != undefined) { foundProduct.quantity++;
    // QUESTION: EST-CE QUE CELA SIGNIFIE QUE LA QUANTITE EST AUGMENTEE SEULEMENT DE 1? 
    // L'UTILISATEUR PEUT-IL RAJOUTER 5 DE PLUS D'UN COUP?//
    //COMMENT DIRE D'ADDITIONNER PAR UN SIMPLE OPERATEUR? 
    }
    else {
        product.quantity = 1;
        // MEME QUESTION - COMMENT ADDITIONNER ET NON PAS AJOUTER 1 SEUL
        productsInCart.push(product);
    }
    saveDataToLS(productsInCart);
}


// A SUPPRIMER: get data of the seleted product
// const getSelectedProduct = id => {
//     const selectedColor = colorsElement.options[colorsElement.selectedIndex].value;
//     const selectedProductInfo = {
//         id:id,
//         color:selectedColor,
//         quantity: + quantityElement.value,
//     };
//     return selectedProductInfo;
// }