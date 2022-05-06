/****************
Confirmation JS
start : 22/03/22
21/04/22
****************/

// Array order
let formCart = [];
// récupérer les paramètres dʼune URL avec JavaScript
let search = new URLSearchParams(window.location.search);
let orderId = search.get("order");
confirmOrder();

/**
 * Fonction pour confirmer commande
 *
 **/
function confirmOrder() {
    const orderIdn = document.getElementById("orderId");
    // obtenir ID de la commande
    orderIdn.innerText = orderId;
    //vider le localStorage
    localStorage.clear();
}
