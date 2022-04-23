/****************
Cart JS
start : 08/04/22
maj : 13/04/22
21/04/22
****************/

///*********************************** localStorage ************************************/
let productsTab = [];// Objets in an array - liste produits

var kanapCart=JSON.parse(localStorage.getItem("products"));
// if(kanapCart==null){
//   var kanapCart=[];// si localStorage vide je cree mon tableau de produits
// }
// afficher : Panier vide ----- > ****

// fetch appel à l'API 
const url='http://localhost:3000/api/products/';// pr recuperer prix ect

///*********************************** MAIN ************************************/

/***********************/
var total=0; // total par modèle de canapé
var totalTab =[];//
var quantityTab =[];//
var kanapTotalQuantity="";
var kanapTotalPrice=0;
/***********************/
displayCart();// afficher le panier

/***********************/
/**
 * Fonction permettant ...
 */
// function list products
function displayCart(){
  //
  let kanapCart=JSON.parse(localStorage.getItem("products"));
  // boucle sur tableau kanapCart / panier JSON 
  for (let i=0; i<= kanapCart.length-1;i++){//list array

    var kanapId=kanapCart[i].kanapId;// ?? ?

    var kanapPrice ="";
    var kanapName01= "";
    var kanapImageUrl01 = "";
    var kanapAltTxt01= "";
    var colors01= "";
    var quantity= "";
    

    // requete fetch API 
    fetch(url+kanapId).then((res) => 
    {
      if (res.ok){
      res.json()// donnees en json
       .then((promise) => {
      productsTab= promise;
      //
      // kanapId=productsTab._id;// bug ??? ?????????????,

      kanapPrice = productsTab.price;
      kanapImageUrl01 = productsTab.imageUrl;
      kanapAltTxt01= productsTab.altTxt; 
      //
      kanapName01= kanapCart[i].kanapName;
      colors01= kanapCart[i].colors;
      quantity=Number(kanapCart[i].quantity);//** avant quantity01 */
      
      // console.log("--------- Numero " +i+ "---------");
      // console.log("Id : "+ kanapId);
      // console.log("Name : "+ kanapName01);

      // TOTAL pr chaque canape
      total=quantity*kanapPrice;
      totalTab.push(total);// array de tous les total
      quantityTab.push(quantity);//
      // console.log("totalTab : "+ totalTab);
      // console.log("quantityTab : "+ quantityTab);
      
      // console.log("total : "+total);
      // console.log("-------------------------------");
      
      // pour afficher liste produits / ajout await, then ect
      
      // kanapTotalPrice,kanapTotalQuantity;
      cartTotal(totalTab,quantityTab);// ici ??? 
      console.log("TOTAUX dans fetch : "+ kanapTotalPrice);
      
      //
      displayProducts(kanapId,kanapName01,kanapPrice,kanapImageUrl01,kanapAltTxt01,colors01,quantity,total);
      displayTotal(kanapId,kanapPrice,quantity);//
      mainOrder(kanapId,kanapName01,kanapPrice,kanapImageUrl01,kanapAltTxt01,colors01,quantity,total);
    
    })
    }else {
      console.log("Erreur");// ajouter catch
    }

  })
 
}
// pour afficher Nombre d'articles & total, hors boucle
//  displayTotal(kanapId,kanapPrice,quantity);//
}


///*********************************** MAIN Order ************************************/
/**
 * Fonction permettant d'afficher les donnees dans la page html
 */

 /*************
    * BTN MODIFIER
    *************/
function mainOrder(kanapId,kanapName01,kanapPrice,kanapImageUrl01,kanapAltTxt01,colors01,quantity){
    // si choix 01 > modifier 
    // voir pb kanapId ++++++ 
    /*************
    * BTN UPDATE
    *************/
    var input_quantity = document.getElementsByClassName("itemQuantity"); 
        for (var j = 0; j <  input_quantity.length; j++) {
            var input =  input_quantity[j];
            //console.log(`***/// kanapCart price dans display : ${kanapName01} ${kanapPrice}`); 
            // change input 
          }
      //   input.addEventListener("blur", function(event){
      //     event.preventDefault();//gestion event
      //     console.log("Perte du focus");
      //     event.stopPropagation();// ??????
      // }); //
        // change or input ???????
        input.addEventListener("change", function(event){
          //event.preventDefault();//gestion event
          console.log("Modification du contenu");
          console.log("-----------------------");
          console.log(`INPUT kanapCart :${input.parentElement}`);

          console.log(input.parentElement.parentElement.parentElement.parentElement);
          updateProduct(event,input,kanapId,kanapPrice,quantity);//
          event.stopPropagation();// ??????
        }); // 
      //}, false); // 
        
        
      
  //  //Uncaught (in promise) TypeError: input.addEventListener is not a function
  //     var input = document.getElementsByClassName("itemQuantity"); 
  //     input.addEventListener("input", function(event){
  //       event.preventDefault();//gestion event
  //       console.log("Modification du contenu");
  //       console.log("-----------------------");
  //       console.log(`INPUT kanapCart : ${kanapId} ${kanapName01} ${kanapPrice} ${quantity}`);
  //       console.log("-----------------------");
  //       updateProduct(event,input,kanapId,kanapPrice,quantity);//
  //       //event.stopPropagation();// ??????

  //   }, false); //

     
    // si choix 02 > supprimer   
    /*************
    * BTN DELETE
    *************/
   // OK almost 
      // var deleteProductButtons = document.getElementsByClassName("deleteItem");
      //     for (var i = 0; i < deleteProductButtons.length; i++) {
      //       var button = deleteProductButtons[i]; 
      //       button.addEventListener("click", deleteProduct);    
      // }
      var deleteProductButtons = document.getElementsByClassName("deleteItem");
          for (var i = 0; i < deleteProductButtons.length; i++) {
            var button = deleteProductButtons[i]; 
            button.addEventListener("click", deleteProduct);    
      }

    
    // si choix 03 > envoyer donnees     
    /*************
     * BTN SUBMIT
     * à envoyer si tests # ok
    *************/
    document.querySelector("#order").addEventListener("click", function(event){
      event.preventDefault();//gestion event
      // 
      var kanapIds=[];// tableau des ID 
      for (let i=0; i<=kanapCart.length-1;i++ ){//list array
        kanapId=kanapCart[i].kanapId;// OU ?
        kanapIds.push(kanapId);
      // Get form / contacts infos
      var firstName=document.getElementById('firstName').value;// Get form elements / string
      var lastName=document.getElementById('lastName').value;// Get form elements / string 
      var address=document.getElementById('address').value;// Get form elements / string
      var city=document.getElementById('city').value;// Get form elements / string
      var email=document.getElementById('email').value;// Get form elements / string
    }
      // Appel fonction
      orderForm(firstName,lastName,address,city,email,kanapIds);
      
    });

}



///*********************************** UPDATE ************************************/
/**
 *
 * function
 * @param {*} position 
 */
 //function updateProduct(event,input,kanapId,kanapPrice,quantity){
function updateProduct(event,input,quantity){
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
      console.log(`input dans condition if : ${input.value}`);
      console.log("-----------------------");
  }
  console.log(`input hors cond : ${input.value}`);
  console.log("-----------------------");

  console.log(`quantity dans updateProduct : ${quantity}`);
  console.log(`*** PRICE updateProduct : ${kanapPrice}`);
  let newVal = input.value;// on additionne les quantites
  console.log(`new Val : ${newVal}`);
  findAndReplace(kanapCart, quantity, newVal);// bug ???

  localStorage.setItem("products",JSON.stringify(kanapCart));// save to LocalStorage
  //
  console.table(kanapCart);
  updateCartTotal(kanapId,kanapPrice,newVal);//
  //updateCartTotal(kanapId,kanapPrice,newVal);//
}

///*********************************** CALCUL TOTAL PRICE & NB  ARTICLES ************************************/
function updateCartTotal(kanapId,kanapPrice,newVal){
  //console.log(`new Valquantity dans updareCartTotal : ${quantity}`);
  //saveKanap(kanapCart);// save to localStorage
  console.log(`*** PRICE dans updateCartTotal (prix pour 1 produit : ${kanapPrice} )`);
  console.log("-----------------------");
      var totalNew = kanapPrice * newVal ;//
      console.log(`*** TOTAL update : ${totalNew} pour ${kanapId}`);  
      console.log("-----------------------"); 
      console.log("////////////////////////////-");
  
   //cartTotal(totalTab,quantityTab);// update total à tester !!
   //displayProducts(); 
}

/**
 * 
 */
function cartTotal(totalTab,quantityTab){
  // calcul totaux
  var kanapTotalQuantity=0;
  var kanapTotalPrice=0;
  for (let i=0; i< totalTab.length;i++ ){//list array
    kanapTotalPrice += totalTab[i];
  }
  // calcul nombre d'articles
  for (let j=0; j< quantityTab.length;j++ ){//list array
    kanapTotalQuantity+=quantityTab[j];
  }
 console.log(`*** TOTAUX : ${kanapTotalPrice}`); 
 console.log(`*** NOMBRE PRODUITS : ${kanapTotalQuantity}`);

// affichage totaux produits & nombre d'articles
const totalPrice = document.querySelector("#totalPrice");////
totalPrice.innerHTML=kanapTotalPrice;

const totalQuantity = document.querySelector("#totalQuantity");////
totalQuantity.innerHTML=kanapTotalQuantity;

}

///*********************************** DELETE ************************************/
// document.querySelector("#addToCart").addEventListener("click", function(event){
//   event.preventDefault();//gestion event

/**
 * function 
 * @param {*} position 
 */

// **** good almost
function deleteProduct(position){
  if(confirm("Voulez-vous vraiment supprimer ? ")){
    if (position !== -1) {
    kanapCart.splice(position,1);//supprime 1 element à partir de la position - id choisie
    // $$$$$$ ajouter suppirmer noeud correspondant
    //var buttonClicked = position.target;
    //buttonClicked.parentElement.parentElement.parentElement.remove();// a voir
    //buttonClicked.parentElement.removeChild();// a voir
    //elt.removeChild(newElt); 
    localStorage.setItem("products",JSON.stringify(kanapCart));
    location.reload();// reload
    alert("suppression effectuée");
    }
  } else {
      alert("suppression annulée");
  }
}


///*********************************** autres fonctions ************************************/ 
/**
 * Fonction permettant ...
 */
// Save item > array 
function saveKanap(kanapCart){ 
  //-------------/JSON/--------------"); 
  // order sort 
   localStorage.setItem("products",JSON.stringify(kanapCart));
  //
 }

/**
 * Fonction pour modifier un Objet dans un Array
 * ex si même couleur modifier la quantité
 */ 
 function findAndReplace(object, value, replacevalue){
  for(var x in object){
    if(typeof object[x] == typeof {}){
      findAndReplace(object[x], value, replacevalue);
    }
    if(object[x] == value){ 
      object["quantity"] = replacevalue;
      // object["quantity"] = replacevalue.toString();// 
     //break; // uncomment to stop after first replacement
    }
  }
}


///*********************************** AFFICHAGE HTML ************************************/
/**
 * Fonction permettant d'afficher les donnees dans la page html
 */
 function displayProducts(kanapId,kanapName01,kanapPrice,kanapImageUrl01,kanapAltTxt01,colors01,quantity,total){
  //
  const cart__items = document.querySelector("#cart__items");//// SECTION 00
  const article=document.createElement("article");///// ARTICLE 01
  article.classList.add("cart__item");
  article.setAttribute('data-id', kanapId);//
  article.setAttribute('data-color', colors01);//


  const div_img=document.createElement("div");///// div IMG
  div_img.classList.add("cart__item__img");

  const img=document.createElement("img");/////img
      img.src = kanapImageUrl01;
      img.alt = kanapAltTxt01;
  //
  cart__items.appendChild(article);
  article.appendChild(div_img);
  div_img.appendChild(img);

  ///03//BIG div 03 
  const div_big=document.createElement("div");/////BIG div 02
  div_big.classList.add("cart__item__content");//
  article.appendChild(div_big);
  
  ///04// div 04 description
  const div_description=document.createElement("div"); ///// 
  div_description.classList.add("cart__item__content__description");//
  div_big.appendChild(div_description);

      /// name
      const h2=document.createElement("h2");
      //const nkanapName= document.createTextNode(kanapName01+" : "+ kanapId);
      const nkanapName= document.createTextNode(kanapName01);
      div_description.appendChild(h2);
      h2.appendChild(nkanapName);

      // colors
      const p_color=document.createElement("p");
      const nkanapColor= document.createTextNode(colors01);
      div_description.appendChild(p_color);
      p_color.appendChild(nkanapColor);

      // price ///*** &euro;*/
      const p_price=document.createElement("p");
      //console.log(kanapPrice);
      const nkanapPrice= document.createTextNode(kanapPrice +" €");
      div_description.appendChild(p_price);
      p_price.appendChild(nkanapPrice);


  ////05// med div 05 settings
    const div_settings=document.createElement("div");
    div_settings.classList.add("cart__item__content__settings");//
    div_big.appendChild(div_settings);

      // div settings__quantity
      const div_settings_quant=document.createElement("div");
      div_settings_quant.classList.add("cart__item__content__settings__quantity");//
      div_settings.appendChild(div_settings_quant);

      // quantity -> btn *******************************
      // <p>Qté : </p>
      const p_quant=document.createElement("p");
      const nkp= document.createTextNode("Qté (total: " + total +")");// ???? 
      div_settings_quant.appendChild(p_quant);
      p_quant.appendChild(nkp);

     //document.querySelector("input").value=quantity;
      const input_quantity=document.createElement("input"); ///// 
      input_quantity.setAttribute("type", "number");
      input_quantity.classList.add("itemQuantity");//
      input_quantity.setAttribute("name", "itemQuantity");
      input_quantity.setAttribute("min", "1");
      input_quantity.setAttribute("max", "100");
      input_quantity.setAttribute("value", quantity);
      //console.log(`quantity dans display : ${quantity} : ${total}`);

      div_settings_quant.appendChild(input_quantity);
      // div settings__delete
      // delete -> btn *******************************
      const div_settings_del=document.createElement("div");
      div_settings_del.classList.add("cart__item__content__settings__delete");//
      div_settings.appendChild(div_settings_del);

      // BTN delete
      const p_delete=document.createElement("p");
      const nkdelete= document.createTextNode("Supprimer");
      p_delete.classList.add("deleteItem");
      div_settings_del.appendChild(p_delete);
      p_delete.appendChild(nkdelete); 
}


///***********************************/
// Affichage Total & nombre articles
function displayTotal(kanapId,kanapPrice,quantity){

console.log("******************");
console.log(`*** TOTAUX dans displayTotal : ${kanapTotalPrice}`); 
console.log(`*** NOMBRE PRODUITS dans displayTotal : ${kanapTotalQuantity}`);

  //kanapTotalQuantity kanapTotalPrice
  // $$$$ en dehors boucle produits
  // DIV PRICE
  // SPAN #totalQuantity <div class="cart__price">
  // Nombre articles span à cacher ?

  // const totalQuantity = document.querySelector("#totalQuantity");////
  // const ntotalQuantity= document.createTextNode(kanapTotalQuantity);//
  // totalQuantity.appendChild(ntotalQuantity);

   // Total articles
  // const totalPrice = document.querySelector("#totalPrice");////
  // const ntotalPrice= document.createTextNode(kanapTotalPrice);//totalPrice ???? $$$$$$$$$$$$$$$$$$$
  // //const ntotalPrice= document.createTextNode("totalPrice" +kanapName01);// TEST
  // totalPrice.appendChild(ntotalPrice);

}

//*********************************** ORDER FORM ************************************/ 

/*****************/
/**
 * 
 */
 function orderForm(firstName,lastName,address,city,email,kanapIds){
  /*** REGEX ***/
  var regexName =/^[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ .'-]*$/;
  var regexAdress =/[0-9a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ ,.'-/]*$/;
  var regexCity =/^[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ'-]*$/;
  var regexEmail = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;

  /*** MSG ERR ***/
  var firstNameErrorMsg=document.querySelector("#firstNameErrorMsg");//
  var lastNameErrorMsg=document.querySelector("#lastNameErrorMsg");//
  var addressErrorMsg=document.querySelector("#addressErrorMsg");//
  var cityErrorMsg=document.querySelector("#cityErrorMsg");//
  var emailErrorMsg=document.querySelector("#emailErrorMsg");//
 
  //Objet formCart pour un user
   const formCart = {
    contact : {
     firstName: firstName,
     lastName: lastName,
     address: address,
     city: city,
     email:email
   },
   products : kanapIds,
 }
 
 
   // on teste si les # champs sont remplis
   console.log("------------- FORM --------------"); 
   console.log("-------------/ Ajout contact /--------------"); 
   
   // on teste si les # champs sont remplis
   if(regexName.test(firstName) !== true)
   {
    firstNameErrorMsg.innerHTML="Remplissez le champ PRENOM correctement";
   }
   else if(regexName.test(lastName) !== true){
    lastNameErrorMsg.innerHTML="Remplissez le champ NOM correctement";
   }
   else if(regexAdress.test(address) !== true){
    addressErrorMsg.innerHTML="Remplissez l'ADRESSE correctement"; 
   }
   else if(regexCity.test(city) !== true){
    cityErrorMsg.innerHTML="Remplissez le champ VILLE correctement";
   }
   else if(regexEmail.test(email) !== true){
    emailErrorMsg.innerHTML="EMAIL invalide";

   } else {
     ///  ajouter si OK enlever msg *******
     firstNameErrorMsg.innerHTML="";
     lastNameErrorMsg.innerHTML="";
     lastNameErrorMsg.innerHTML="";
     cityErrorMsg.innerHTML="";
     emailErrorMsg.innerHTML="";
     console.log(`kanapIds dans contactform apres : ${kanapIds}`);
     console.table(formCart);
      /**
      * <form method="get" class="cart__order__form">
      */
     cartOrderForm(formCart);// fetch
   }
 
 }

// POST fetch
function cartOrderForm(formCart){
  const headersForm = {
    method: 'POST',
    body: JSON.stringify(formCart),
    headers: {
        'Accept': 'application/json', 
        "Content-Type": "application/json" 
    },
};
fetch("http://localhost:3000/api/products/order", headersForm)
.then((response) => response.json())
 .then((data) => {
    console.log(`data ${data}`);
    localStorage.setItem("orderId", data.orderId);
    document.location.href = "confirmation.html";
})
.catch(() => { alert ("Erreur");});
}