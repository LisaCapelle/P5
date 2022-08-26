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
    id: id,
    color: selectedColor,
    quantity: selectedQuantity
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

    let findProduct = productSavedInLS.find((product) => {
        console.log(productSavedInLS);
        console.log(product.selectedProductId === selectedProduct.id && p.selectedProductColor === selectedProduct.selectedProductColor)
        return product.id === selectedProduct.id && product.color === selectedProduct.color
    })
        
    console.log(findProduct);
    if(!findProduct){
        console.log("pusher le produit sélectionné dans le tableau vide");
        productSavedInLS.push(selectedProduct);
        console.log("ajouter le tableau mis à jour dans le LS")
        localStorage.setItem("Cart", JSON.stringify(productSavedInLS))
    }
    else{
        console.log("changer qté");
        let totalQuantity = parseInt(findProduct.quantity) + parseInt(selectedProduct.quantity);
        if (totalQuantity > 100){
            alert("attention maximum 100")
        }
        else{
            selectedProduct.quantity = totalQuantity;
            //remplacer!!! et pas pusher. Soit filtrer pour remplacer un objet (filter) soit findindex pour trouver object puis remplacer l'objet avec index
            //on peut utiliser un même nom pour le contenu. L'object doit avoir un nom unique pas le contenu.
            // "how to replace object in an array, based on an index"
            productSavedInLS.push(selectedProduct);
            console.log("ajouter le tableau mis à jour dans le LS")
            localStorage.setItem("Cart", JSON.stringify(productSavedInLS))
            }
        }
    };

}

// C. Sélectionner le bouton d'ajout au panier et y rajouter Event Listener pour exécuter la fonction au clic
const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addProduct();
    }
)