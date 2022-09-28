// A. Afficher le produit sélectionné

// éléments à ajouter à la page produits
let imgElement = document.querySelector(".item__img");
let titleElement = document.querySelector("#title");
let priceElement = document.querySelector("#price");
let descriptionElement = document.querySelector("#description");
let colorsElement = document.getElementById("colors");
let quantityElement = document.querySelector("#quantity");

// récupérer l'ID du produit cliqué dans son URL
const pageString = window.location.search;
const urlParams = new URLSearchParams(pageString);
const id = urlParams.get("id");

// récupérer les données du produit cliqué dans l'API
function getProduct() {
    // if(id !== null){
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => { if (response.ok) { return response.json(); } })
        .then(product => { displayProduct(product) })
        .catch(function (err) { alert('une erreur de connexion à notre catalogue est survenue') });
    // }
}
getProduct();

// afficher les couleurs du produit cliqué
function getColorOptions(product) {
    console.log(product);
    for (let i = 0; i < product.colors.length; i++) {
        colorsElement.innerHTML += `<option value="${product.colors[i]}"> 
        ${product.colors[i]}</option>`
    }
}

// afficher tous les éléments du produit cliqué
function displayProduct(product) {
    imgElement.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    titleElement.innerHTML = `${product.name}`;
    priceElement.innerHTML = `${product.price}`;
    document.title = `${product.name}`;
    descriptionElement.innerHTML = `${product.description}`;
    getColorOptions(product);
}

//B. Créer la fonction d'ajouter le produit au Local Storage

function addProduct() {

// sélectionner le choix de couleur et le mettre dans une variable
    const selectedColor = colorsElement.options[colorsElement.selectedIndex].value;

// sélectionner le choix de quantité et le mettre dans une variable
    const selectedQuantity = quantityElement.value;

// créer un objet produit avec clés + variables ci-dessus
const selectedProduct = {
    id: id,
    color: selectedColor,
    quantity: selectedQuantity,
} 
// vérifier que les données entrées correctement et si oui les sauvegarder
if (selectedColor === ""){
    alert("Veuillez choisir une couleur")
}else if(selectedQuantity <= 0 || selectedQuantity > 100){
    alert("Veuillez saisir une quantité entre 1 et 100, 100 étant la quantité maximum par produit")
}else{
    // vérifier la quantité totale si le produit déjà dans panier et que le total de la qte rajoutee ne depasse pas les 100
    let cart;
    localStorage.getItem("Cart");
    
    // si localStorage encore vide renvoyer objet produit vide
    if (localStorage.getItem("Cart") == null){
        cart = [];
        console.log(cart);
        alert(`Vous venez d'ajouter ${selectedQuantity} ${titleElement.textContent} coloris ${selectedColor} au panier`);
    }
    // si localStorage avec du contenu renvoyer le contenu parsé
    else {
        cart = JSON.parse(localStorage.getItem("Cart"));
        let findProduct = cart.find((product) => {
            return product.id === selectedProduct.id && product.color === selectedProduct.color
        })
        console.log(selectedQuantity);
        let newQuantity = selectedQuantity + findProduct.quantity;
        let maximumUntilStop = 100 - findProduct.quantity;
        if (newQuantity > 100){
            alert(`Vous devez rajouter encore maximum ${maximumUntilStop} produits, la quantité étant limitée à 100 par produit/couleur`);
        }else{
            alert(`Vous venez d'ajouter ${selectedQuantity} ${titleElement.textContent} coloris ${selectedColor} au panier`)
        }
    }

    let findProduct = cart.find((product) => {
        console.log(product.id === selectedProduct.id && product.color === selectedProduct.color);
        return product.id === selectedProduct.id && product.color === selectedProduct.color
    })
    console.log(findProduct.quantity);
    
    if(!findProduct){
        cart.push(selectedProduct);
        console.log(cart);
        localStorage.setItem("Cart", JSON.stringify(cart))
    }
    else{
        console.log("test");
        // modifier la quantité dans l'objet produit puis mettre à jour cette donnée dans le local Storage
        let totalQuantity = parseInt(findProduct.quantity) + parseInt(selectedProduct.quantity);
        console.log(findProduct.quantity);
        if (totalQuantity > 100){
            alert("attention maximum 100")
        }
        else{
            selectedProduct.quantity = totalQuantity;
            //remplacer!!! et pas pusher. Soit filtrer pour remplacer un objet (filter) soit findindex pour trouver object puis remplacer l'objet avec index
            cart.push(selectedProduct);
            console.log(cart);
            const result = cart.filter((productObj)=>{ return productObj.quantity != findProduct.quantity && productObj.id === findProduct.id})
            console.log(result);
            console.log("ajouter le tableau mis à jour dans le LS")
            localStorage.setItem("Cart", JSON.stringify(result))
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