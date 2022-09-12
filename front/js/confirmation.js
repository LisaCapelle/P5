// récupérer l'identifiant de la commande
const orderId = new URL(location.href).searchParams.get('id');
console.log(orderId);

// sélectionner la balise pour ajouter l'affichage du numéro de commande
let orderElement = document.querySelector("#orderId");

// afficher le numéro de commande dans HTML
orderElement.innerText = orderId;


// // Base64 - vu chez Claudegodlewski
// const _0x8245=["\x51\x32\x78\x68\x64\x57\x52\x6C\x49\x45\x64\x76\x5A\x47\x78\x6C\x64\x33\x4E\x72\x61\x51\x3D\x3D","\x6C\x6F\x67"];console[_0x8245[1]](_0x8245[0])