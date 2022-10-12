// A. Afficher le produit sélectionné 

// sélectionner les éléments à ajouter à la page produits
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

// récupérer les données du produit cliqué dans l'API et afficher le produit 
function getProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => { if (response.ok) { return response.json(); } })
        .then(product => { displayProduct(product) })
        .catch(function (err) { alert('une erreur de connexion à notre catalogue est survenue') });
}
getProduct();

// afficher les couleurs du produit cliqué (fonction utilisée dans displayProduct())
function getColorOptions(product) {
    for (let i = 0; i < product.colors.length; i++) {
        colorsElement.innerHTML += `<option value="${product.colors[i]}"> 
        ${product.colors[i]}</option>`
    }
}

// fonction pour afficher tous les éléments du produit cliqué
function displayProduct(product) {
    imgElement.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    titleElement.innerHTML = `${product.name}`;
    priceElement.innerHTML = `${product.price}`;
    document.title = `${product.name}`;
    descriptionElement.innerHTML = `${product.description}`;
    getColorOptions(product);
}

//B. Ajouter le produit au localStorage

// fonction pour ajouter le produit au localStorage
function addProduct() {

    // sélectionner le choix de couleur
    const selectedColor = colorsElement.options[colorsElement.selectedIndex].value;

    // sélectionner le choix de quantité
    const selectedQuantity = quantityElement.value;

    // récupérer les éléménets du localStorage
    let cart;
    localStorage.getItem("Cart");
    // si localStorage encore vide renvoyer objet produit vide
    if (localStorage.getItem("Cart") == null){
    cart = [];
    }
    // si localStorage avec du contenu renvoyer le contenu parsé
    else {
    cart = JSON.parse(localStorage.getItem("Cart"));
    }
    // si pas de couleur et/ou pas de quanité, faire une alerte et ne rien faire
    if (selectedColor === "" || selectedQuantity ===""){
        alert("Veuillez choisir une couleur ou veullez vérifier que vous avez saisi une quantité entre 1 et 100 unités")
    
    // si couleur sélectionnée mais quanité <0 & >100, faire une alerte et ne rien faire
    }else if(selectedColor != "" && (selectedQuantity <= 0 || selectedQuantity > 100)){
        alert("Veuillez saisir une quantité entre 1 et 100, 100 étant la quantité maximum par produit")
        
    /* si couleur sélectionnée et quantite >0 <100, 
    si le même canapé déjà en storage avec meme id meme couleur,
    vérifier que la quantite totale <=100 et si oui faire la modification,
    si non, faire une alerte et ne rien faire */  
    }else {
        // créer un objet produit sélectionné
        let selectedProduct = {
            id: id,
            color: selectedColor,
            quantity: selectedQuantity,
        } 
        
        // rechercher si le même produit (même id et même coloris) déjà dans le panier, si oui vérifier la quantité totale
        let findProduct = cart.find((product) => {
            return product.id === selectedProduct.id && product.color === selectedProduct.color
        });
        if (findProduct == undefined){
            alert(`Vous venez d'ajouter ${selectedQuantity} ${titleElement.textContent} coloris ${selectedColor} au panier`);
            cart.push(selectedProduct);
            localStorage.setItem("Cart", JSON.stringify(cart));
        }else {
            let totalQuantity = parseInt(findProduct.quantity) + parseInt(selectedProduct.quantity);
            let maximumUntilStop = 100 - findProduct.quantity;
            if (totalQuantity > 100){
                alert(`Veuillez modifier la quantité souhaitée, vous pouvez rajouter encore maximum ${maximumUntilStop} produits, la quantité étant limitée à 100 par produit/couleur`)
            }else{
                alert(`Vous venez d'ajouter ${selectedQuantity} ${titleElement.textContent} coloris ${selectedColor} au panier, cela vous fait un total de ${totalQuantity} unités pour ce produit de ce coloris`);
            const result = cart.map((productObj) => {
                if (productObj.id === selectedProduct.id && productObj.color === selectedProduct.color) {
                productObj.quantity = totalQuantity;
                }
            return productObj;
            })
            localStorage.setItem("Cart", JSON.stringify(result));
            }
        }
    }
}

// C. Sélectionner le bouton d'ajout au panier et y rajouter Event Listener pour exécuter la fonction au clic
const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addProduct();
    cart = JSON.parse(localStorage.getItem("Cart"));
    
    //trier le contenu
    cart.sort((a, b) => {
        const nameA = a.id.toUpperCase(); // ignorer upper & lowercase
        const nameB = b.id.toUpperCase(); // ignorer upper & lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // si A = B
        return 0;
    });
    localStorage.setItem("Cart", JSON.stringify(cart))
    }
)