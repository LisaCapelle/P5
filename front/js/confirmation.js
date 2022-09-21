// récupérer l'identifiant de la commande
const orderId = new URL(location.href).searchParams.get('id');
console.log(orderId);

// sélectionner la balise pour ajouter l'affichage du numéro de commande
let orderElement = document.querySelector("#orderId");

// afficher le numéro de commande dans HTML
orderElement.innerText = orderId;

