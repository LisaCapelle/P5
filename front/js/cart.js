//modification du nom d'onglet
document.title = "Page Panier";

/*faire un fetch des données produits (image, alt, nom, prix) et tout mettre à l'intérieur du fetch 
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
            }) // fin de forEach ligne 30
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
                }) // fin du addEventListener ligne 50
            }) // fin du forEach ligne 74

//MES RAJOUTS
            let deleteItems = document.querySelectorAll(".deleteItem");
            deleteItems.forEach((deleteItem, index) =>{
                let indexToDelete = index;
                let productToDelete;
                console.log(index);
                deleteItem.addEventListener("click", (e)=>{
                    // e.target.indexOf();
                    // console.log(e.target.index);
                    for (let i = 0; i< contentInCart.length; i++){
                        if(i == index){
                            contentInCart.splice(1, 1);
                            location.reload();
                        }
                    }
                }) // fin de EventListener ligne 108
            })//fin de forEach ligne 104


// 1. récupérer les balises du formulaire
// 2. créer les variables pour les Regex de chaque input
// 3. créer une variable pour chaque message d'erreur (car pas alerte mais dans HTML)
// 4. récupérer les données saisies. 
// 5. vérifier les données saisies et si nécessaire afficher le message d'erreur.
// penser à faire vérifier un par un les inputs via console.log (e.targert.value) sur onchange, et vérifier - if e.target.value correspond à ceci faire ceci sinon msg d'erreur
// penser à faire vérifier pour le bouton final - si les inputs ne sont pas vides, si chaque input a été validé. Prevent Default?  
//FIN DE MES RAJOUTS

        })//fin du deuxieme then
        .catch((error) => {alert("ERREUR")
        })