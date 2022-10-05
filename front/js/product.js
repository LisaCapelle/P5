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
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => { if (response.ok) { return response.json(); } })
        .then(product => { displayProduct(product) })
        .catch(function (err) { alert('une erreur de connexion à notre catalogue est survenue') });
}
getProduct();

// afficher les couleurs du produit cliqué
function getColorOptions(product) {
    // console.log(product);
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

//B. créer la fonction d'ajouter le produit au Local Storage

function addProduct() {

// 1. Sélectionner le choix de couleur et le mettre dans une variable
    const selectedColor = colorsElement.options[colorsElement.selectedIndex].value;

// 2. Sélectionner le choix de quantité et le mettre dans une variable
    const selectedQuantity = quantityElement.value;

    // récupérer les éléménets du local storage
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
    // si (pas de couleur et/ou pas de quanité) {faire une alerte et ne rien faire}  
    if (selectedColor === "" || selectedQuantity ===""){
        alert("Veuillez choisir une couleur ou veullez vérifier que vous avez saisi une quantité entre 1 et 100 unités")
    
    // si (couleur OK et quanité <0 et > 100) {faire une alerte et ne rien faire}
    }else if(selectedColor != "" && (selectedQuantity <= 0 || selectedQuantity > 100)){
        alert("Veuillez saisir une quantité entre 1 et 100, 100 étant la quantité maximum par produit")
        
        /* si (couleur OK et quantite >0 <100) {
           alors
             (si le même canapé déjà en storage avec meme id meme couleur){
                 vérifier que la quantite totale <=100, faire la modification
             }si non {faire une alerte et ne rien faire}
        } */  
    }else if(selectedColor != "" && selectedQuantity > 0 && selectedQuantity <= 100){
        
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
        }else if(findProduct.id === selectedProduct.id && findProduct.color === selectedProduct.color){
            let totalQuantity = parseInt(findProduct.quantity) + parseInt(selectedProduct.quantity);
            let maximumUntilStop = 100 - findProduct.quantity;
            if (totalQuantity > 100){
                alert(`Veuillez modifier la quantité souhaitée, vous pouvez rajouter encore maximum ${maximumUntilStop} produits, la quantité étant limitée à 100 par produit/couleur`)
            }else{
                alert(`Vous venez d'ajouter ${selectedQuantity} ${titleElement.textContent} coloris ${selectedColor} au panier, cela vous fait un total de ${totalQuantity} unités pour ce produit de ce coloris`);
            selectedProduct.quantity = totalQuantity;
            const result = cart.map((productObj) => {
                if (productObj.id === selectedProduct.id && productObj.color === selectedProduct.color) {
                productObj.quantity = totalQuantity;
                return productObj;
                }
            return productObj
            })
            console.log(result);
            localStorage.setItem("Cart", JSON.stringify(result));
            // const result = cart.filter((productObj)=>{ return productObj.quantity != findProduct.quantity && productObj.id === findProduct.id})
            }
        }
    }
}

// C. Sélectionner le bouton d'ajout au panier et y rajouter Event Listener pour exécuter la fonction au clic
const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addProduct();
    //test rajouter fonction tri du panier produits dans LocalStorage
    cart = JSON.parse(localStorage.getItem("Cart"));
    console.log(cart);

    cart.sort((a, b) => {
        const nameA = a.id.toUpperCase(); // ignore upper and lowercase
        const nameB = b.id.toUpperCase(); // ignore upper and lowercase
        console.log(nameA);
        console.log(nameB);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
    });    
    console.log(cart);
    localStorage.setItem("Cart", JSON.stringify(cart))
    ///fin test
    }
)