/****************
Cart JS
start : 08/04/22
maj : 13/04/22
21/04/22
****************/

///*********************************** localStorage ************************************/
let productsTab = [];// liste produits / API
// order list
var kanapCart=JSON.parse(localStorage.getItem("products"));// panier stocké dans le localStorage

// if(kanapCart==null){
//   var kanapCart=[];// si localStorage vide je cree mon tableau de produits
// }
// afficher : Panier vide ----- > ****

// fetch appel à l'API 
const url='http://localhost:3000/api/products/';// pr recuperer prix ect

///*********************************** MAIN ************************************/

/***********************/
var total=0; // total par modèle de canapé
var totalTab =[];// totaux
var quantityTab =[];// 
var kanapTotalQuantity="";
var kanapTotalPrice=0;

/***********************/
// mainCart();// appel fonction principale
// appel fonction principale
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", mainCart);
} else {
  mainCart();
}
 
/***********************/
/**
 * Fonction ...
**/
function mainCart(){
  orderList(kanapCart);// tri par modele / ID
  // boucle sur tableau kanapCart JSON du panier client
  for (let i=0; i<= kanapCart.length-1;i++){
    var kanapId01=kanapCart[i].kanapId;// bug ???
    var kanapPrice ="";
    var kanapName01= "";
    var kanapImageUrl01 = "";
    var kanapAltTxt01= "";
    var colors01= "";
    var quantity= "";
 
      // requete fetch API pour récupérer les prix, les URL d'images, les textes alternatifs
        fetch(url+kanapId01).then((res) => 
      {
        if (res.ok){
        res.json()// donnees en json
        .then((promise) => {
         productsTab= promise;
         // API price, et url image, alt texte
         kanapId=productsTab._id;// bug ???? hack
         kanapPrice = productsTab.price;
         kanapImageUrl01 = productsTab.imageUrl;
         kanapAltTxt01= productsTab.altTxt; 

        // JSON kanapcart
        kanapName01= kanapCart[i].kanapName;
        colors01= kanapCart[i].colors;
        quantity=parseFloat(kanapCart[i].quantity);//
        
        // Affichage Html du panier
        displayProducts(kanapId,kanapName01,kanapPrice,kanapImageUrl01,kanapAltTxt01,colors01,quantity,total);
        cartManager(kanapId,kanapPrice,quantity);//
        cartTotal(quantity,kanapPrice);// ici ???
      })
    }else {
      console.log("Erreur");// ajouter catch
    }
  })
}

}

///*********************************** MAIN Order ************************************/
/**
 * Fonction ...
**/
function cartManager(kanapId,kanapPrice,quantity){
    /*************
    * BTN UPDATE
    *************/
     //var article=document.querySelectorAll(".cart__item");
     // if(article.dataset.id.value===kanapId)
    // var article=document.querySelectorAll(".cart__item");
    var inputsQuantity= document.querySelectorAll(".itemQuantity");
    var input="";
    for (let i=0; i<= inputsQuantity.length-1;i++){
      input =  inputsQuantity[i]; 
   }
   // click change input
   input.addEventListener("change", function(event){
    console.log("click");
      event.preventDefault();//gestion event
       updateProduct(event,input,kanapId,kanapPrice,quantity);//
       
    }); // 
    input.removeEventListener('blur',function(event){
      event.preventDefault();//gestion event
      console.log("no click");
      
   },false); // 

    

    /*************
    * BTN DELETE
    *************/
      var deleteProductButtons = document.getElementsByClassName("deleteItem");
          for (var i = 0; i < deleteProductButtons.length; i++) {
            var button = deleteProductButtons[i]; 
            button.addEventListener("click", deleteProduct);    
      }
      console.log(button.parentElement.parentElement.parentElement.parentElement);
      button.addEventListener("click", deleteProduct); 
    /*************
     * BTN SUBMIT
    *************/
    document.querySelector("#order").addEventListener("click", function(event){
      event.preventDefault();//gestion event 
      // 
      var kanapIds=[];// tableau des ID 
      for (let i=0; i<= kanapCart.length-1;i++ ){//list array
        kanapId=kanapCart[i].kanapId;// OU ?
        kanapIds.push(kanapId);
      // Get form / contacts infos
      var firstName=document.getElementById('firstName').value;// Get form elements / string
      var lastName=document.getElementById('lastName').value;// Get form elements / string 
      var address=document.getElementById('address').value;// Get form elements / string
      var city=document.getElementById('city').value;// Get form elements / string
      var email=document.getElementById('email').value;// Get form elements / string
    }
      // Appel fonction envois des données
      orderForm(firstName,lastName,address,city,email,kanapIds);
    });
}

///*********************************** UPDATE ************************************/
/**
 * Fonction ...
**/
function updateProduct(event,input,kanapId,kanapPrice,quantity) {
  var input= event.target;

  if (isNaN( input.value) ||  input.value <= 0) {
    input.value = 1;
  }
  var newVal= input.value;
  console.log("********* dans updateProduct");
  console.log(`quantity : ${quantity}`);
  console.log(`newVal : ${newVal}`);
  console.log(kanapId);

  console.log(event.currentTarget);
  findAndReplaceQ(kanapCart,quantity,newVal);//update an object (à modifier)
  saveKanap(kanapCart);// save to localStorage
  console.table(kanapCart);

 //////////////// ----> 
 //location.reload();// hack :) ben ça marche avec ça.. (pb de input / click)
 //////////////// ----> 
//cartTotal(newVal,kanapPrice);//recalcul, totaux
}

///*********************************** CALCUL TOTAL PRICE & NB  ARTICLES ************************************/
/**
 * 
 */
function cartTotal(quantity,kanapPrice){
  total=quantity*kanapPrice;
  totalTab.push(total);// array de tous les totaux
  quantityTab.push(quantity);//

  // console.log(totalTab);
  // console.log(quantityTab);
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
// affichage totaux produits & nombre d'articles
const totalPrice = document.querySelector("#totalPrice");////
totalPrice.innerHTML=kanapTotalPrice;

const totalQuantity = document.querySelector("#totalQuantity");////
totalQuantity.innerHTML=kanapTotalQuantity;
}

///*********************************** DELETE ************************************/
/**
 * function 
 * @param {*} position 
 */

// **** good almost
function deleteProduct(event){
  if(confirm("Voulez-vous vraiment supprimer ? ")){
    if (event !== -1) {
    kanapCart.splice(event,1);//supprime 1 element à partir de la position - id choisie
    var removeA=document.querySelector(".cart__item");
    var containerA=removeA.parentNode;
    containerA.removeChild(removeA);// supprimer du dom l'article correspondant
    saveKanap(kanapCart);
    cartTotal();// recalcul totaux
    location.reload();//
    alert("suppression effectuée");
    }
  } else {
    alert("suppression annulée");
  }
}

///*********************************** AFFICHAGE HTML ************************************/
/**
 * Fonction permettant d'afficher les donnees dans la page html
**/
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
      //const nkp= document.createTextNode("Qté (total: " + total +")");// ???? 
      
      const nkp= document.createTextNode("Qté");// ???? 
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

//*********************************** ORDER FORM ************************************/ 
/**
 * Fonction ...
**/
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

/**
 * Fonction ...
**/
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
    localStorage.setItem("orderId", data.orderId);
    document.location.href = "confirmation.html";
})
.catch(() => { alert ("Erreur");});
}