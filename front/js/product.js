// A. Affichage du produit sélectionné
// éléments à ajouter à la page produits - OK 
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
    for (let i = 0; i < product.colors.length; i++) {
        colorsElement.innerHTML += `<option value="${product.colors[i]}"> 
        ${product.colors[i]}</option>`
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

//B. créer la fonction d'ajouter le produit au Local Storage
function addProduct() {

// 1. Sélectionner le choix de couleur et le mettre dans une variable
    const selectedColor = colorsElement.options[colorsElement.selectedIndex].value;

// 2. Sélectionner le choix de quantité et le mettre dans une variable
    const selectedQuantity = quantityElement.value;

// 3. créer un objet produit avec clés + variables ci-dessus
const selectedProduct = {
    selectedProductId: id,
    selectedProductColor: selectedColor,
    selectedProductQuantity: selectedQuantity
} 
// 4. vérifier que les données entrées sont correctes et si oui les sauvegarder
if (selectedColor === ""){
    alert("veuillez choisir une couleur")
}else if(selectedQuantity < 0 || selectedQuantity > 100){
    alert("veuillez saisir qté entre 1 et 100")
}else{
    let productSavedInLS;
    localStorage.getItem("Cart");
    console.log(localStorage.getItem("Cart"));

    if (localStorage.getItem("Cart") == null){
        productSavedInLS = [];
    }
    else {
        productSavedInLS = JSON.parse(localStorage.getItem("Cart"))
    }

    let findProduct = productSavedInLS.find((p) => {
        console.log(productSavedInLS);
        return p.selectedProductId === selectedProduct.id && p.selectedProductColor === selectedProduct.selectedProductColor
    })
    if(!findProduct){
        console.log("pusher le produit sélectionné dans le tableau vide");
        productSavedInLS.push(selectedProduct);
        console.log("ajouter le tableau mis à jour dans le LS")
        localStorage.setItem("Cart", JSON.stringify(productSavedInLS))
    }
    else{
        console.log("changer qté");
        let totalQuantity = Number(findProduct.selectedProductQuantity) + Number(selectedProduct.selectedProductQuantity);
        if (totalQuantity > 100){
            alert("attention maximum 100")
        }
        else{
            selectedProduct.selectedQuantity = totalQuantity;
            productSavedInLS.push(selectedProduct);
            console.log("ajouter le tableau mis à jour dans le LS")
            localStorage.setItem("Cart", JSON.stringify(productSavedInLS))
        }
    }
};

         
    //si produit déjà dans panier avec le meme couleur
    // dans ce cas modifier la quantite et verifier qu'elle ne
    // depasse pas 100
    // si produit pas dans le panier l'ajouter

}

// C. Sélectionner le bouton d'ajout au panier et y rajouter Event Listener pour exécuter la fonction au clic
const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addProduct();})























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