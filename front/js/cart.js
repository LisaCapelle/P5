//fetch donnees produits (image, alt, description...) mettre le tout dedans avant catch
//adapter le string
//innerHTML.addCartItems
//


let cartItems = document.querySelector("#cart__items");

let contentInCart = JSON.parse(localStorage.getItem("Cart"));
// console.log(contentInCart);

contentInCart.forEach( (productObj, index)=>{
    let str = "";
    str += `<article class="cart__item" data-id="${productObj.id}" data-color="${productObj.color}">
    <div class="cart__item__img">
      <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>Nom du produit</h2>
        <p>Vert</p>
        <p>42,00 €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`

  console.log(productObj, index)
    }
)


//forEach(string)
function displayCartItems(cartItem) {
   
    let str =` 
 `
}
