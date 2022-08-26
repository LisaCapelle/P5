// éléments à ajouter à la page produits  - OK 
let imgElement = document.querySelector(".item__img");
let titleElement = document.querySelector("#title");
let priceElement = document.querySelector("#price");
let descriptionElement = document.querySelector("#description");
let colorsElement = document.getElementById("colors");
let quantityElement = document.querySelector("#quantity");

// récupérer l'ID du produit cliqué dans son URL - OK
const pageString = window.location.search;
const urlParams = new URLSearchParams(pageString);
const id = urlParams.get("id");

// récupérer les données du produit cliqué dans l'API - OK
function getProduct() {
    // if(id !== null){
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => { if (response.ok) { return response.json(); } })
        .then(product => { displayProduct(product) })
        .catch(function (err) { alert('une erreur de connexion à notre catalogue est survenue') });
    // }
}
getProduct();

// afficher les couleurs du produit cliqué - OK
function getColorOptions(product) {
    console.table(product);
    // const ColorArray = product.colors;
    // for (color of colorArray){colorsElement.innerHTML += '<option value ="${color}"> ${color}</option>'}
    for (let x = 0; x < product.colors.length; x++) {
        colorsElement.innerHTML += `<option value="${product.colors[x]}"> 
        ${product.colors[x]}</option>`
    }
}

// afficher tous les éléments du produit cliqué - OK
function displayProduct(product) {
    imgElement.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    titleElement.innerHTML = `${product.name}`;
    priceElement.innerHTML = `${product.price}`;
    document.title = `${product.name}`;
    descriptionElement.innerHTML = `${product.description}`;
    getColorOptions(product);
}


// sauvegarder les données du produit dans le Web Storage

// 1. Sélectionner le bouton d'ajout au panier et y rajouter Event Listener
const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
// 2. Sélectionner le choix de couleur et le mettre dans une variable
    selectedColor = colorsElement.value;
// 3. Sélectionner le choix de quantité et le mettre dans une variable
    selectedQuantity = quantityElement.value;

//*ESSAI

// 4. ajouter le produit dans le LS si les conditions sont réunies
// 4.1. déclarer la variable pour stocker temporairement et mettre à jour la table des produits dans Web Storage:
//     var tabProducts = [];

// 4.2. créer une fonction de sauvegarde de produit dans le Web Storage: 
//     function saveBasket(basket) {localStorage.setItem("basket", JSON.stringify(basket))}
//     function getBasket() {
//         let basket = localStorage.getItem("basket");
//         console.log("basket");
//         if(basket == null){return[]}
//         else{return JSON.parse(basket);}
//     }    
// 4.3. créer une fonction de rajout de produit dans le Web Storage si les conditions sont réunies 
//function addBasket (product){
//         let basket = getBasket();
//         let foundProduct = basket.find(p => p.id == product.id)
//         if(foundProduct != undefined){foundProduct.quantity + selectedQuantity}
//         else {product.quantity = selectedQuantity;}
//         tabProducts.push(product);
//         saveBasket(basket);}
//     })

//  4.4.  // condition: vérifier si le produit est déjà dans le LS
// // let productFound = productSavedInLS.find
//     // ajouter produit dans le LS s'il n'y est pas 

//     // s'il y est incrémenter la quantité dans LS avec celle entrée par l'utilisateur.


    //*FIN ESSAI

    // // get the data in selectedProductInfos variable provided user entered required data
    // if (selectedColor !== "" && selectedQuantity > 0 && selectedQuantity <= 100) {
    //     let productOptions = {
    //         selectedProductId: id,
    //         selectedProductColor: selectedColor,
    //         selectedProductQuantity: selectedQuantity
    //     }
    
    //     // create variable for message about LS updates
    //     let messageUpdatesCart = false;

    //     // function add selected product with its options id, color and quantity to LS 

    //     const addProductToLS = () => {

    //         // check if product and color are already in LS. If so, amend only quantity
    //             let findProduct = productSavedInLS.find((p) => {
    //                 console.log(productSavedInLS);
    //                 return p.selectedProductId === productOptions.id && p.selectedProductColor === productOptions.selectedProductColor
    //             });
    //             if (findProduct) {
    //                 const total = Number(findProduct.selectedProductQuantity) + Number(productOptions.selectedProductQuantity);
    //                 console.log(total);

    //                 if (total <= 100) {
    //                     // switch message variable to false to display the corresponding message
    //                     messageUpdatesCart = false;
    //                     findProduct.selectedProductQuantity = Number(findProduct.selectedProductQuantity) + Number(productOptions.selectedProductQuantity);
    //                     alert(`La quantité du produit ${titleElement.textContent} coloris ${selectedColor} a été mise à jour.`);
    //                 }
    //                 else {
    //                     // switch message variable to false to display the corresponding message
    //                     messageUpdatesCart = false;
    //                     alert("Vous pouvez commander maximum 100 unités d'un même article d'une même couleur. Veuillez corriger la quantité souhaitée.");
    //                 }
    //             }

    //             // if product and the color are not yet in LS: add product and its options id, color and quantity into LS
    //             else {
    //                 // switch message variable to true to display message
    //                 messageUpdatesCart = true;
    //                 // put options into variable "productSavedInLS"
    //                 productSavedInLS.push(productOptions);
    //             }

    //             // transform into JSON and save data in LS with key "productsInCart"
    //             localStorage.setItem("contentsInCart", JSON.stringify(productSavedInLS))
    //         }

    //         // create variable "productSavedInLS" to save keys and values and transform into JS object
    //         let productSavedInLS = JSON.parse(localStorage.getItem("productsInCart"));

    //         // if LS already has a key "productsInCart"
    //         if (productSavedInLS) {
    //             addProductToLS(); console.log(productSavedInLS);
    //         }
    //         // if LS has no key "productsInCart" it is empty
    //         else {
    //             productSavedInLS = [];
    //             addProductToLS(); console.log(productSavedInLS);
    //             // switch message variable to false to display the corresponding message
    //             messageUpdatesCart = false;
    //             alert(`Vous venez d'ajouter votre premier produit dans le panier.`);
    //         }
    //         // if the variable messageUpdatesCart is true the following message is displayed:
    //         if (messageUpdatesCart) {
    //             alert(`Vous venez de rajouter ${selectedQuantity} unités du produit ${titleElement.textContent} coloris ${selectedColor} au panier.`);
    //         }
    //     }
    //     // if color not selected or quantity not between 1 and 100: display following message:
    //     else {
    //         alert(`La couleur n'est pas sélectionnée et/ou la quantité n'est pas comprise entre 1 et 100`);
    //     }

    })

// ***CONSEILS
//Pour faire un calcul numérique, on utilise parseInt() ou Number().
//const entree1 = document.querySelector('myInput1').value;
//const entree2 = document.querySelector('myInput2').value;
//ex : var nb = parseInt(entree1 + entree2);
//our cette histoire de tableau temporaire, il faut l'instancier en haut de ta page mais pas en tant que "constante", puisque le but est de pouvoir le modifier, et supprimer des éléments à l'avenir, donc ce sera en var.
//Tu peux le déclarer comme ça :  var tabProduits = [];
//Ensuite, très simple d'y ajouter des entrées à l'aide de push(), de cette façon => tabProduits.push('un truc en plus');
//Utilise tabProduits.splice(i, 1) pour supprimer une entrée du tableau indiquée par sa position i de ce même tableau.


// ***CATCH A LA FIN
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