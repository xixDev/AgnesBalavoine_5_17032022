/****************
Confirmation JS
start : 22/03/22
21/04/22
****************/

// Affichage numéro de commande et mise à zéro du localStorage
confirmOrder();  

/**
 * Fonction ...
**/
function confirmOrder(){
  const orderIdn= document.getElementById("orderId");
  // obtenir ID de la commande
  orderIdn.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
  //vider le localStorage  
  localStorage.clear(); 
  }
    
