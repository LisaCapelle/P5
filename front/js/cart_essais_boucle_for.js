// DECLARER LES VARIABLES

// Regex pour chaque input (regrouper nom et prénom ensemble) 
const nameRegex = /^[a-zA-Zéèàùçûü\s]+[-a-zA-Zéèàùçûü\s]*$/;
const addressRegex = /^[a-zA-Z0-9éèàùçûü\s-,]+$/;
const cityRegex = /^[-a-zA-Zéèàùçûü\s]+$/;
const emailRegex = /^[0-9a-z._-\s]+[+0-9a-z._-]*@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}\s*$/;

// variables pour messages d'erreur à afficher dans le HTML (regrouper nom et prénom ensemble) 
const nameErrorMsgText = "Les prénom et nom ne peuvent contenir que des lettres et un trait d'union si prénom ou nom composé";
const addressErrorMsgText = "L'adresse ne peut contenir que des lettres, des chiffres et des virgules";
const cityErrorMsgText = "Le nom de la ville ne peut contenir que des lettres et un trait d'union ";
const emailErrorMsgText = "Attention adresse mail invalide, une adresse mail doit contenir @";
const emptyFieldText = "Veuillez renseigner ce champ";

// sélectionner les balises pour insérer l'affichage des produits et les totaux du panier
let cartItems = document.querySelector("#cart__items");
let totalQuantity = document.querySelector("#totalQuantity");
let totalPrice = document.querySelector("#totalPrice");

// string pour l'injection dans le HTML 
let str = "";

// récupérer les éléments du panier
let cart;
console.log(cart);

// // tableau temporaire pour stocker le prix des produits
// let temporaryArray = [];
// console.log(temporaryArray);

// quantité et prix totaux
let totalQty = 0;
let totalPr = 0;

// DECLARER LES FONCTIONS

// modifier le nom d'onglet
document.title = "Page Panier";

// changer la quantité et recalculer le total
const handleChange = (qtyInputs, cart) => {
    // ajouter EventListener pour chaque input l'un après l'autre (forEach)
    // console.log(qtyInputs);
    qtyInputs.forEach((input, index) =>{
        input.addEventListener("change", (e) => {
            // récupérer les infos input
            let value = + e.target.value;
            if(value < 1 || value > 100){
                alert("Veuillez renseigner une quantité entre 1 et 100 maximum")
            }else{
                // récupérer les infos (id & couleur) du produit concerné par le changement d'input
                let id = e.currentTarget.closest(".cart__item").dataset.id;
                let color = e.currentTarget.closest(".cart__item").dataset.color;    

                /* remplacer la quantité par la quantité modifiée (variable value) + 
                mettre à jour cette quantité dans local Storage + modifier 
                l'affichage de la page en la rechargeant*/
                for (let i = 0; i< cart.length; i++){
                    if(cart[i].id == id && cart[i].color == color){
                    cart[i].quantity = value;
                    localStorage.setItem("Cart", JSON.stringify(cart));
                    cartItems.innerHTML = "";
                    location.reload();
                    }
                }
            }
        }) // fin du addEventListener handleChange
    }) // fin du forEach handleChange
}
// supprimer un produit et recalculer le total
const handleDelete = (deleteItems, cart) => {
    // ajouter EventListener pour chaque bouton l'un après l'autre (forEach)
    deleteItems.forEach((deleteItem, index) =>{
        deleteItem.addEventListener('click', (e) => {
                        
            // récupérer les infos (id et couleur) du produit concerné par la suppression
            let id = e.currentTarget.closest(".cart__item").dataset.id;
            let color = e.currentTarget.closest(".cart__item").dataset.color;

            // filtrer et supprimer le produit concerné
            const newCart = cart.filter((productObj)=>{ return !(id === productObj.id && color === productObj.color)})
            console.log(newCart);
            // écraser l'ancien localStorage avec la maj et recharger la page
            localStorage.setItem("Cart", JSON.stringify(newCart));
            cartItems.innerHTML = "";
            location.reload();                  
        })
    })
};

// vérifier la validité d'un input dans la partie formulaire
const isItValid = (inputValue, regexCode) => {
    if(regexCode.test(inputValue) && inputValue !="") return true;
    if(regexCode.test(inputValue) === false && inputValue != "") return false;
}
// afficher le message dans le HTML partie formulaire
const displayMessage = (tag, text) => {
    tag.innerText = text;
}
// vérifier chaque input séparément et afficher le message adapté dans le HTML partie formulaire
let firstNameInput = (inputValue) => {
        if(inputValue.trim() === ""){
        displayMessage (firstNameErrorMsg, emptyFieldText);
        console.log('testDisplayMessage');
    }else{
        const isValid = isItValid(inputValue, nameRegex);
        isValid ? displayMessage(firstNameErrorMsg, "") : displayMessage(firstNameErrorMsg, nameErrorMsgText)
    }
}

let lastNameInput = (inputValue) => {
    if(inputValue.trim() === ""){
        displayMessage (lastNameErrorMsg, emptyFieldText);
        console.log('testDisplayMessage');
    }else{
        const isValid = isItValid(inputValue, nameRegex);
        isValid ? displayMessage(lastNameErrorMsg, "") : displayMessage(lastNameErrorMsg, nameErrorMsgText)
    }
}

let addressInput = (inputValue) => {
    if(inputValue.trim() === ""){
        displayMessage (addressErrorMsg, emptyFieldText);
        console.log('testDisplayMessage');
    }else{
        const isValid = isItValid(inputValue, addressRegex);
        isValid ? displayMessage(addressErrorMsg, "") : displayMessage(addressErrorMsg, addressErrorMsgText)
    }
}

let cityInput = (inputValue) => {
    if(inputValue.trim() === ""){
        displayMessage (cityErrorMsg, emptyFieldText);
        console.log('testDisplayMessage');
    }else{
        const isValid = isItValid(inputValue, cityRegex);
        isValid ? displayMessage(cityErrorMsg, "") : displayMessage(cityErrorMsg, cityErrorMsgText)
    }
}

let emailInput = (inputValue) => {
    if(inputValue.trim() === ""){
        displayMessage (emailErrorMsg, emptyFieldText);
        console.log('testDisplayMessage');
    }else{
        const isValid = isItValid(inputValue, emailRegex);
        isValid ? displayMessage(emailErrorMsg, "") : displayMessage(emailErrorMsg, emailErrorMsgText)
    }
}
// si le panier n'est ni null ni vide faire un fetch sur les produits du panier pour compléter les informations manquantes
cart = localStorage.getItem("Cart");
if (cart == null){
    cart = [];
    alert("Le panier n'existe pas");
    let cartOrderElement = document.querySelector('.cart__order');
    // console.log(cartOrderElement);
    cartOrderElement.style.visibility='hidden';
}else{
    cart = JSON.parse(localStorage.getItem("Cart"));
    
    if(cart.length == 0){
        alert("Votre panier est vide")
            let cartOrderElement = document.querySelector('.cart__order');
            // console.log(cartOrderElement);
            cartOrderElement.style.visibility='hidden';
    }else{
        console.log(cart);
        
        // ASYNC POUR ATTENDRE LES RESULTATS DU FETCH

        for (let i = 0; i < cart.length; i++) {
            async (productObj) => {
            try{
            let id = productObj.id;
            let color = productObj.color;
            let quantity = productObj.quantity;
            
            const response = await fetch(`http://localhost:3000/api/products/${id}`);
            if(!response.ok){
                throw new Error (`Erreur HTTP: ${response.status}`)
            };
            const data = await response.json();
            console.log(data.name);
            // str = cartItems.innerHTML;
            str += `
            <article class="cart__item" data-id="${productObj.id}" data-color="${productObj.color}">
            <div class="cart__item__img"><img src="${data.imageUrl}" alt="${data.altTxt}"></div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2><p>${productObj.color}</p><p>${data.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productObj.quantity}">
                </div>
                <div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div>
                </div>
            </div>
            </article>`; 
            cartItems.innerHTML = str;
            console.log(cartItems.innerHTML);
            totalQty = totalQty + Number(productObj.quantity);
            let subTotal = Number(data.price) * Number(productObj.quantity);
            totalPr = totalPr + subTotal;
        
            totalQuantity.innerText = totalQty;
            totalPrice.innerText = totalPr;
            
            // ICI RAJOUTER LES EVENEMENTS SUR SUPPRESSION ET MODIF QTES 
            //sélectionner toutes les balises input qui permettent de renseigner la quantité & supprimer
            let qtyInputs = document.querySelectorAll(".itemQuantity");
            // console.log(qtyInputs);
            let deleteItems = document.querySelectorAll(".deleteItem");

            // gérer la modification des quantités  
            handleChange(qtyInputs, cart);
            // gérer la suppression de produit(s)
            handleDelete(deleteItems, cart);
            }
            catch(error){console.error(`Aie: ${error}`);}
            }
        }
    }
}


// PARTIE FORMULAIRE
  // VARIABLES
  // sélectionner les balises à remplir et les balises pour les messages d'erreur
  let firstName = document.querySelector("#firstName");
  let lastName = document.querySelector("#lastName");
  let address = document.querySelector("#address");
  let city = document.querySelector("#city");
  let email = document.querySelector("#email");
  let orderBtn = document.querySelector("#order");
  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
  let addressErrorMsg = document.querySelector("#addressErrorMsg");
  let cityErrorMsg = document.querySelector("#cityErrorMsg");
  let emailErrorMsg = document.querySelector("#emailErrorMsg");

// FONCTIONS
// vérifier si tous les champs sont validés
const isAllValid = () => {
      if(nameRegex.test(firstName.value) && nameRegex.test(lastName.value) && addressRegex.test(address.value) && cityRegex.test(city.value) && emailRegex.test(email.value)) {
      return true;
      }else{
      return false;
      }
  }
// vérifier toutes les données saisies dans le formulaire, une par une
const inputsData = () => {
      firstNameInput(firstName.value);
      lastNameInput(lastName.value);
      addressInput(address.value);
      cityInput(city.value);
      emailInput(email.value);
  }
  
// envoyer les données à l'API, rédiriger vers la page de confirmation, supprimer le local storage
const confirmation = (dataToSend) => {
    
// envoyer les données à l'API
fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {"content-type": "application/json"
    }
})
    .then((res) => res.json())
    .then((data) => {
        console.log(data.orderId);
        // rédiriger à la page de confirmation
        document.location.href=`confirmation.html?id=${data.orderId}`
        // supprimer le localStorage
        localStorage.clear();
        })
    } 

  // vérifier les inputs un par un
  firstName.addEventListener('blur', (e) => {
      firstNameInput(e.target.value)});
  lastName.addEventListener('blur', (e) => {
      lastNameInput(e.target.value)})
  address.addEventListener('blur', (e) => {
      addressInput(e.target.value)})
  city.addEventListener('blur', (e) => {
      cityInput(e.target.value)})
  email.addEventListener('blur', (e) => {
      emailInput(e.target.value)})

  // exécution des commandes au clic sur bouton "envoyer" 
  orderBtn.addEventListener("click", (e) => {
    // empêcher le comportement par défaut
    e.preventDefault();
    let productIds = cart.map((element) => {return element.id})
    console.log(productIds);
    let dataToSend = {
                        contact: {
                                    firstName:firstName.value,
                                    lastName:lastName.value,
                                    address:address.value,
                                    city:city.value,
                                    email:email.value,
                        },
                        products: productIds,
    }

    isAllValid ? confirmation(dataToSend) : inputsData()  
  })