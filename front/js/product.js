// elements to add on product page - OK
let imgElement = document.querySelector(".item__img");
let titleElement = document.querySelector("#title");
let priceElement = document.querySelector("#price");
let descriptionElement = document.querySelector("#description");
let colorsElement = document.getElementById("colors");

// get clicked product id from URL - OK
const pageString = window.location.search;
const urlParams = new URLSearchParams(pageString);
const id = urlParams.get("id");

// get data of clicked product via API - OK
function getProduct() {
    // if(id !== null){
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => { if (response.ok) { return response.json(); } })
        .then(product => { displayProduct(product) })
        .catch(function (error) { alert('une erreur est survenue') });
// }
}
getProduct();

// display colors of the clicked product - OK
function getColorOptions(product) {
    console.log(product);
    for (let x = 0; x < product.colors.length; x++) {
        colorsElement.innerHTML += `<option value="${product.colors[x]}"> 
        ${product.colors[x]}</option>`
    }
}

// display all elements of the clicked product via API - OK
function displayProduct(product) {
    imgElement.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    titleElement.innerHTML = `<h1 id="title">${product.name}</h1>`;
    priceElement.innerHTML = `<span id="price">${product.price}</span>`;
    descriptionElement.innerHTML = `<p id="description">${product.description}</p>`;
    getColorOptions(product);
}

// save product information to local storage: 
// select button to add to cart and add event listener
const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener("click", (e) =>{
    e.preventDefault();
// select color choice and add it into variable
const color = document.querySelector("#colors");
selectedColor = color.value;
// select quantity choice and add it into variable
const quantity = document.querySelector("#quantity");
selectedQuantity = quantity.value;

// get the data in selectedProductInfos variable provided user entered required data
if (selectedColor !== "" && selectedQuantity > 0 && selectedQuantity <= 100) {
    let selectedProductInfos = {
        selectedProductId: product._id ,
        selectedProductColor: selectedColor,
        selectedProductQuantity: selectedQuantity
    }

// create variable for message about LS updates
let messageUpdatesToLS = false;
// function add to LS selected product with its options id, color and quantity

// save data to local storage

const addProductToLS = () => {
    
    // if product and the color are already in LS: amend only quantity
    let findProduct = productSavedInLS.find((x) => {return x.selectedProductId === selectedProductInfos.selectedProductId && x.selectedProductColor === selectedProductInfos.selectedProductColor});
    if(findProduct){
        const total = Number(findProduct.selectedProductQuantity) + Number(selectedProductInfos.selectedProductQuantity);
        if(total <= 100){
            // switch message variable to false to display the corresponding message
            messageUpdatesToLS = false;
            findProduct.selectedProductQuantity = Number(findProduct.selectedProductQuantity) + Number(selectedProductInfos.selectedProductQuantity);
            alert(`La quantité du produit ${product.name}, coloris ${selectedColor} a été mise à jour.`);
        }
        else{
            // switch message variable to false to display the corresponding message
            messageUpdatesToLS = false;
            alert("Vous pouvez commander maximum 100 unités d'un même article d'une même couleur. Veuillez corriger la quantité souhaitée.");
        }
    }
    // if product and the color are not yet in LS: add product and its options id, color and quantity into LS
    else{
        // switch message variable to true to display message
        messageUpdatesToLS = true;
         // put options into variable "productSavedInLS"
         productSavedInLS.push(selectedProductInfos);
    }
    
    // transform into JSON and save data in LS with key "productsInCart"
    localStorage.setItem("productsInCart", JSON.stringify(productSavedInLS))
}

// create variable "productSavedInLS" to save keys and values and transform into JS object
let productSavedInLS = JSON.parse(localStorage.getItem("productsInCart"));

 // if LS already has a key "productsInCart"
if(productSavedInLS){
    addProductToLS();console.log(productSavedInLS);}
// if LS has no key "productsInCart" it is empty
else{
    productSavedInLS = [];
    addProductToLS(); console.log(productSavedInLS);
    // switch message variable to false to display the corresponding message
    messageUpdatesToLS = false;
    alert(`Vous venez d'ajouter votre premier produit dans le panier.`);
}
// if the variable messageUpdatesToLS is true the following message is displayed:
if(messageUpdatesToLS){
    alert(`Le produit ${product.name}, coloris ${selectedColor} a été ajouté au panier.`);
    }
}
// if color not selected or quantity not between 1 and 100: display following message:
else {
alert(`La couleur n'est pas sélectionnée et/ou la quantité n'est pas comprise entre 1 et 100`);
}
});

// .catch((error) => {
// console.log("Erreur fetch product.js : l'id du produit est incorrect.", error);
// alert(`Erreur: le produit sélectionné n'a pas été trouvé !`);
// window.location.href = "index.html";
// })
// else{
// console.log("L'id produit n'est pas indiqué dans l'url.");
// alert(`Erreur: le produit sélectionné n'a pas été trouvé.`);
// window.location.href = "index.html";
// }
































// // listen to color options chosen by user
// color.addEventListener('select', e => {
//     if (color.value === "") {
//         alert("Veuillez sélectionner une couleur");
//     }
//     else {
//         const product = {
//             id: id,
//             color: color.value,
//         }
//         addToCart(product)
//     }
// })
// // listen to quantity options chosen by user
// quantity.addEventListener('change', e => {
// eventPreventDefault();
// console.log(e.value); // Valeur saisie par l'utilisateur.
// let foundProduct = productsInCart.find(p => p.id == product.id)
//     if (foundProduct != undefined) { foundProduct.quantity.value;}
//     else {
//             product.quantity = 1;
//             productsInCart.push(product);
//         }
//         saveDataToLS(productsInCart);
//     }
// )
// //Là dedans, tu vas chercher la valeur dans le localStorage pour le modèle/couleur si elle existe, et ensuite tu additionnes à la valeur saisie, ce qui te permet de vérifier la quantité totale.


// // quantity.addEventListener('input', e => {
// //     if (quantity.value === 0) {
// //         alert("Veuillez indiquer la quantité voulue, entre 1 et 100");
// //     }
// //     else if (quantity.value > 100) {
// //         alert("Maximum 100 produits par commande");
// //     }
// //     else if (quantity.value > 0 && quantity.value <= 100) {
// //         const product = {
// //             id: id,
// //             quantity: quantity.value,
// //         }
// //         addToCart(product)
// //     }
// // })
// // OU BIEN FAUT-IL REMPLACER LES 2 PREMIERS PAR 1 SEUL D'ECOUTE DU BOUTON D'AJOUT AU PANIER???
// // addToCartBtn.addEventListener('click', e => {
// //     if (color.value === "") {
// //         alert("Veuillez sélectionner une couleur");}
// //     else if (quantity.value === 0) {
// //             alert("Veuillez indiquer la quantité voulue, entre 1 et 100");}
// //     else if (quantity.value > 100){
// //         alert("Maximum 100 produits par commande");}
// //     else if (quantity.value > 0 && quantity.value <= 100) {
// //             const product = {
// //             id: id,
// //             color: color.value,
// //             quantity: quantity.value,
// //         }
// //         addToCart(product)
// //     } 
// // })

// }
// // get data from local storage
// function getDataFromLS() {
//     let productsInCart = localStorage.getItem('productsInCart');
//     if (productsInCart == null) { return []; }
//     else { return JSON.parse(productsInCart); }
// }

// // add product to cart
// function addToCart(product) {
//     let productsInCart = getDataFromLS();
//     // check if product already in cart, if so change quantity, if not add product to cart
//     let foundProduct = productsInCart.find(p => p.id == product.id)
//     if (foundProduct != undefined) { foundProduct.quantity.value;
//     }
//     else {
//         product.quantity = 1;
//         productsInCart.push(product);
//     }
//     saveDataToLS(productsInCart);
// }




// // A SUPPRIMER: get data of the seleted product
// // const getSelectedProduct = id => {
// //     const selectedColor = colorsElement.options[colorsElement.selectedIndex].value;
// //     const selectedProductInfo = {
// //         id:id,
// //         color:selectedColor,
// //         quantity: + quantityElement.value,
// //     };
// //     return selectedProductInfo;
// }