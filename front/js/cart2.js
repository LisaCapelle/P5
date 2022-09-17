// 1. créer les Regex pour chaque input (regrouper nom et prénom ensemble) et les mettre dans les variables
const nameRegex = /^[a-zA-Zéèàùçûü\s]+[-a-zA-Zéèàùçûü\s]*$/;
const addressRegex = /^[a-zA-Z0-9éèàùçûü\s-,]+$/;
const cityRegex = /^[-a-zA-Zéèàùçûü\s]+$/;
const emailRegex = /^[0-9a-z._-\s]+[+0-9a-z._-]*@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}\s*$/;

// 2. créer une variable pour chaque message d'erreur à afficher dans le HTML (regrouper nom et prénom ensemble) 
const nameErrorMsgText = "Les prénom et nom ne peuvent contenir que des lettres et un trait d'union si prénom ou nom composé";
const addressErrorMsgText = "L'adresse ne peut contenir que des lettres, des chiffres et des virgules";
const cityErrorMsgText = "Le nom de la ville ne peut contenir que des lettres et un trait d'union ";
const emailErrorMsgText = "Attention adresse mail invalide, une adresse mail doit contenir @";
const emptyFieldText = "Veuillez renseigner ce champ";

// 3. mettre toutes les fonctions ne nécessitant pas de données appelées via fetch

// modifier le nom d'onglet
document.title = "Page Panier";

// vérifier la validité d'un input dans la partie formulaire
const isItValid = (inputValue, regexCode) => {
    // console.log(inputValue);
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

/* 4. faire un fetch des données produits (image, alt, nom, prix) et tout mettre à l'intérieur du fetch 
puisqu'il est asynchrone pour que les produits s'affichent correctement dans le panier*/
    fetch("http://localhost:3000/api/products")
        .then(response => {
            if (response.ok) { 
                return response.json(); 
            }
        })
        .then((data) => {
            console.log(data);
            // déclarer une variable pour y récupérer les données du local storage pour les produits contenus dans le panier (id, couleur, qté)
            let contentInCart = JSON.parse(localStorage.getItem("Cart"));
            console.log(contentInCart);

            // sélectionner les balises où insérer l'affichage des produits du panier
            let cartItems = document.querySelector("#cart__items");
            let totalQuantity = document.querySelector("#totalQuantity");
            let totalPrice = document.querySelector("#totalPrice");

            /* déclarer les variables: 
            string pour l'injection dans le HTML et 
            tableau temporaire pour stoquer le prix des produits*/
            let str = "";
            let temporaryArray = [];

            // faire une boucle pour insérer les informations de chacun des produits contenus dans le panier dans le HTML
            contentInCart.forEach((productObj, index)=>{
                const productInfo = data.find((element) => element._id === productObj.id);
                const newObject = {...productObj, price: productInfo.price};
                temporaryArray.push(newObject);
                str += `
                <article class="cart__item" data-id="${productObj.id}" data-color="${productObj.color}">
                <div class="cart__item__img"><img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}"></div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${productInfo.name}</h2><p>${productObj.color}</p><p>${productInfo.price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productObj.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div>
                    </div>
                </div>
                </article>`;             
            }) // fin de forEach ligne 104
            console.log(temporaryArray);
            cartItems.innerHTML = str;

            // récupérer la quantité et le prix de chaque produit dans le panier et faire un total
            let totalQty = 0;
            let totalPr = 0;
            for(let i = 0; i < temporaryArray.length; i++){
                totalQty = totalQty + temporaryArray[i].quantity;
                console.log(temporaryArray[i].price);
                let subTotal = temporaryArray[i].price * temporaryArray[i].quantity;
                console.log(subTotal);
                totalPr = totalPr + subTotal;
            }
            console.log(totalQty);
            console.log(totalPr);

            // injecter les 2 résultats dans le HTML
            totalQuantity.innerText = totalQty;
            totalPrice.innerText = totalPr;

            // sélectionner toutes les balises input qui permettent de renseigner la quantité
            let qtyInputs = document.querySelectorAll(".itemQuantity");
            console.log(qtyInputs);

            // ajouter EventListener pour chaque input l'un après l'autre avec boucle ForEach
            qtyInputs.forEach((input, index) =>{
                input.addEventListener("change", (e)=>{
                console.log(index);
                // récupérer les infos input et les sauvegarder dans une variable value
                let value = + e.target.value;
                if(value < 1 || value > 100){
                    alert("Veuillez renseigner une quantité entre 1 et 100 maximum")
                    return;
                    // retirer le RETURN et mettre un ELSE
                }
                // récupérer les infos du produit concerné par le changement d'input (son id et sa couleur) et tout sauvegarder dans des variables
                let id = e.currentTarget.closest(".cart__item").dataset.id;
                console.log(id);
                let color = e.currentTarget.closest(".cart__item").dataset.color;
                console.log(color);        
            
                // remplacer la quantité par la quantité modifiée (variable value) et mettre à jour cette quantité dans local Storage et modifier l'affichage de la page en la rechargeant
                for (let i = 0; i< contentInCart.length; i++){
                    if(contentInCart[i].id == id && contentInCart[i].color == color){
                    contentInCart[i].quantity = value;
                    localStorage.setItem("Cart", JSON.stringify(contentInCart));
                    cartItems.innerHTML = "";
                    location.reload();
                    }
                }
                }) // fin du addEventListener ligne 150
            }) // fin du forEach ligne 149

            // supprimer un produit:
            // sélectionner la balise, déterminer l'index de la balise 
            let deleteItems = document.querySelectorAll(".deleteItem");
            deleteItems.forEach((deleteItem, index) =>{
                let indexToDelete = index;
                console.log(index);
                deleteItem.addEventListener("click", (e) => {
                    console.log(e.target, index);
                    
                    // récupérer les infos du produit concerné par le changement d'input (son id et sa couleur) et tout sauvegarder dans des variables
                    let id = e.currentTarget.closest(".cart__item").dataset.id;
                    console.log(e.currentTarget.closest(".cart__item"));
                    let color = e.currentTarget.closest(".cart__item").dataset.color;
                    console.log(color);
                    console.log(contentInCart);
                    const newContentInCart = contentInCart.filter((productObj)=>{ return !(id === productObj.id && color === productObj.color)})
                    console.log(newContentInCart);
                    // écraser l'ancien localStorage avec la nouvelle valeur (result) et recharger la page
                    localStorage.setItem("Cart", JSON.stringify(newContentInCart));
                    cartItems.innerHTML = "";
                    location.reload();
                }) // fin de EventListener sur deleteItem ligne 182
            })//fin de forEach sur deleteItems ligne 179

        // PARTIE FORMULAIRE
        // 1. sélectionner les balises à remplir et les 5 balises pour les messages d'erreur
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

        // 2. déclarer les fonctions qui nécessitent les données du fetch
        const isAllValid = () => {
            if(nameRegex.test(firstName.value) && nameRegex.test(lastName.value) && addressRegex.test(address.value) && cityRegex.test(city.value) && emailRegex.test(email.value)) {
            return true;
            }else{
            return false;
            }
        }

        const inputsData = () => {
            firstNameInput(firstName.value);
            lastNameInput(lastName.value);
            addressInput(address.value);
            cityInput(city.value);
            emailInput(email.value);
        }

        const confirmation = () => {
            // envoyer les données à l'API
        

            // rédiriger à la page de confirmation
        //document.location.href=".../confirmation.html"
            // supprimer le localStorage
        // localStorage.clear();
            console.log("youpi!")
        } 

        // 3. vérifier les inputs un par un
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

        // 4. fonction finale à la fin: au clin sur "commander"
        orderBtn.addEventListener("click", (e) => {
            // empêcher le comportement par défaut
            e.preventDefault();
            // vérifier que le panier n'est pas vide
            if(contentInCart.length === 0){alert("Attention votre panier est vide, veuillez d'abord choisir un produit")
            /* si panier pas vide vérifier si tous les inputs du formulaire ont été validés,
            si oui passer à confirmation si non repartir sur le remplissage du formulaire */
            }else{isAllValid() ? confirmation() : inputsData();
            }
        })

})//fin du deuxieme then
.catch((error) => {alert("Une erreur s'est produite")
})