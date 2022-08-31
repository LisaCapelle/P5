//modification du nom d'onglet
document.title = "Page Panier";

/*faire un fetch des données produits (image, alt, nom, prix) et tout mettre à l'intérieur du fetch 
puisqu'il est asynchrone sinon les produits ne pourront pas s'afficher correctement dans le panier*/
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

            // sélectionner la balise où insérer l'affichage des produits du panier
            let cartItems = document.querySelector("#cart__items");

            // déclarer les variables
            let str = "";

            // faire une boucle pour insérer les informations de chacun des produits contenus dans le panier dans le HTML
            contentInCart.forEach((productObj, index)=>{
                
                const productInfo = data.find((element) => element._id === productObj.id);
                
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
            })
            cartItems.innerHTML = str;
            
            // sélectionner la balise input qui permet de renseigner la quantité
            let qtyInputs = document.querySelectorAll(".itemQuantity");
            console.log(qtyInputs);
            // ajouter EventListener pour chaque input l'un après l'autre (boucle ForEach)
            qtyInputs.forEach((input, index) =>{
                input.addEventListener("change", (e)=>{
                console.log(index);
            // récupérer les infos input et les sauvegarder dans une variable
            console.log(e.target.value);
            let value = e.target.value;
            // console.log(e.currentTarget.closest(".cart__item"));

            // récupérer les infos produit concerné (son id et sa couleur)
            let id = e.currentTarget.closest(".cart__item").dataset.id;
            console.log(e.currentTarget.closest(".cart__item").dataset.id);

            let color = e.currentTarget.closest(".cart__item").dataset.color;
            console.log(e.currentTarget.closest(".cart__item").dataset.color);
                   
            // actualiser le localStorage
            let findProduct = contentInCart.find((product)=>{

            //return ...
            })
            // methode map ??? sinon filtrer le tableau, puis pusher, puis enlever 
            // le précédent. 
            })

        
        // actualiser input.value

        })
        })
        .catch((error) => {alert("ERREUR")
        })