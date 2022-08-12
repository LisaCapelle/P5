// elements to add on product page
let imgElement = document.querySelector(".item__img");
let titleElement = document.querySelector("#title");
let priceElement = document.querySelector("#price");
let descriptionElement = document.querySelector("#description");
let colorsElement = document.getElementById("colors");

// get product id from URL
const pageString = window.location.search;
const urlParams = new URLSearchParams(pageString);
const id = urlParams.get("id");

// get the clicked product via API
function getProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => { if (response.ok) { return response.json(); } })
        .then(product => {displayProduct(product)})
        .catch(function (error) {alert('une erreur est survenue')});
}
getProduct();

// display colors of the clicked product
function getColorOptions(product) {
    console.log(product);
    for (let x = 0; x < product.colors.length; x++){
        colorsElement.innerHTML += `<option value="${product.colors[x]}"> 
        ${product.colors[x]}</option>`
    }
}

// display all elements of the clicked product via API
function displayProduct(product){
    imgElement.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    titleElement.innerHTML = `<h1 id="title">${product.name}</h1>`;
    priceElement.innerHTML = `<span id="price">${product.price}</span>`;
    descriptionElement.innerHTML = `<p id="description">${product.description}</p>`;
    getColorOptions(product);
}

// add to local storage
let addToCartBtn = document.querySelector("#addToCart");
let color = document.querySelector("#colors")
let quantity = document.querySelector("#quantity")

// add selected product options to local storage on click
addToCartBtn.addEventListener('click', e => {
    if (color.value === "") {
        alert("Veuillez sélectionner une couleur")
    } else if (quantity.value > 0 && quantity.value < 100) {
            const productOptions = {
            id: productId,
            color: color.value,
            quantity: quantity.value,
//         }
//         addToCart(productOptions)
//     } else if (quantity.value > 100){alert("Maximum 100 produits par commande")}
// })

// // get seleted product
// const getSelectedProduct = id => {
//     const selectedColor = colorsElement.options[colorsElement.selectedIndex].value;
//     const selection = {
//         id:id,
//         quantity: + quantityElement.value,
//         color:selectedColor
//     };
//     return selection;
// }
