/****************
Confirmation JS
start : 22/03/22
21/04/22
****************/
//console.log("Confirmation ?");

/**
 *  <div class="confirmation">
          <p>Commande validée ! <br>Votre numéro de commande est : 
            
            <!--01 / orderId = 65431343444684674 -->
            <span id="orderId">
            65431343444684674 
          </span>
           <!-- //orderId-->
        </p>
        </div>
 */
confirmOrder();  //affichage numéro de commande
//
function confirmOrder(){
  const orderIdn= document.getElementById("orderId");
  orderIdn.innerText = localStorage.getItem("orderId");// obtenir ID de la commande
  console.log(localStorage.getItem("orderId"))
  localStorage.clear(); // vider le localStorage  
  }
    
