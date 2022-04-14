/****************
Product JS
start : 22/03/22
28/03/22
****************/

// Products Array 
let productTab = [];

// récupérer les paramètres dʼune URL avec JavaScript
let search = new URLSearchParams(window.location.search);
let productId = search.get("id");
//console.log("id : " + productId);

// fetch 
const url='http://localhost:3000/api/products/'+productId;
//console.log("url : " + url);

fetch(url).then((res) => 
    {
      if (res.ok){
      res.json()// donnees en json
       .then((promise) => {
      productTab= promise;
      //console.log("productsTab : " +promise);
      // appel fonctions
      oneProduct();// show one product
      addToCart;// add product to cart
      
        }) 
    }// catch ?
      else {
        console.log("Erreur");
    } 
  })


// Show one product
function oneProduct(){
      // list proprietes objects
      let kanapColors = productTab.colors;
      //console.log("productTab.colors : "+productTab.colors)
      let kanapId = productTab._id;
      let kanapName = productTab.name;
      let kanapPrice = productTab.price;
      let kanapImageUrl = productTab.imageUrl;
      let kanapDescription = productTab.description;
      let kanapAltTxt = productTab.altTxt;
  
      // console.log("-------------------------------"); 
      // console.log("Colors : "+ kanapColors);
      // console.log("Id : "+ kanapId);
      // console.log("Name : "+ kanapName);
      // console.log("Price : "+kanapPrice);
      // console.log("Image Url : "+ kanapImageUrl);
      // console.log("Description : "+ kanapDescription);
      // console.log("AltTxt : "+ kanapAltTxt);
      // console.log("-------------------------------"); 

      // html

      /// img
      const item__img= document.querySelector("#item__img");
      const img=document.createElement("img");
      img.src = kanapImageUrl;
      img.alt = kanapAltTxt;
      item__img.appendChild(img);


      // title
      // <title>Nom du produit</title>
      const title= document.querySelector("#title");
      const nkanapName= document.createTextNode(kanapName);
      title.appendChild(nkanapName);

      // price
      const price= document.querySelector("#price");
      //const span=document.createElement("span");
      const nkanapPrice= document.createTextNode(kanapPrice);
      price.appendChild(nkanapPrice);
    
      //<p id="description"
      const description= document.querySelector("#description");
      const nkanapDescription= document.createTextNode(kanapDescription);
      description.appendChild(nkanapDescription);
    
      // colors
      for (let i in productTab.colors){
        const colors= document.querySelector("#colors");
        const option=document.createElement("option");
        option.value=productTab.colors[i];
        const nkanapColors= document.createTextNode(productTab.colors[i]);
        colors.appendChild(option);
        option.appendChild(nkanapColors);
      }
  }

/**
 * Cart function
/*
Il est nécessaire d’utiliser localStorage pour pouvoir accéder à cet
array depuis la page Panier.
● Lorsqu’on ajoute un produit au panier, si celui-ci n'était pas déjà
présent dans le panier, on ajoute un nouvel élément dans l’array.
● Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent dans le panier (même id + même couleur), on incrémente
simplement la quantité du produit correspondant dans l’array.
*/

// localStoage
var kanapCart=JSON.parse(localStorage.getItem("products"));

// bug si localStorage vide ;/ j'arrive pas à inserer premier canapé

// ou if(!kanapCart){
// ou if(kanapCart.length===0){
// if(!localStorage){
//   var kanapCart=[];// si localStorage vide je cree mon tableau de produits
//   //kanapCart=JSON.parse(localStorage.getItem("products"));// si deja JSON
// }
// else{
//   var kanapCart=JSON.parse(localStorage.getItem("products"));// si deja JSON
// }


// Submit / addToCart button
document.querySelector("#addToCart").addEventListener("click", function(event){
  event.preventDefault();//gestion event
  // id kanap_id
  var kanap_id = productTab._id;
  var kanapName = productTab.name;
  var kanapImageUrl = productTab.imageUrl;
  var kanapAltTxt = productTab.altTxt;

  var colors=document.getElementById('colors').value;// Get form elements / string
  var quantity=document.getElementById('quantity').value;// Get form elements / string 
  //
  main(kanap_id,kanapName,kanapImageUrl,kanapAltTxt,colors,quantity);// appel fonction principale avec en parametres les donnees
});

/**
 * Fonction MAIN permettant ...
 * 
 */
// appel fonction avec en parametres les donnees
function main(kanap_id,kanapName,kanapImageUrl,kanapAltTxt,colors,quantity){
  var kanapCart=[];
  kanapCart=JSON.parse(localStorage.getItem("products"));// si deja JSON
  //if(kanapCart.length===0 && quantity >=1){
  if (!kanapCart && quantity >=1){
  //if(kanapCart.length===0 && quantity >=1){

    console.log("---- Premier canape ----");
    var kanapCart=[];// data localStorage vide
    // bug premier canape
    var k1 = {
        kanap_id: "055743915a544fde83cfdfc904935ee7",
        kanapName : "Canape K1",
        kanapImageUrl : "kanap05.jpeg",
        kanapAltTxt : "legende",
        colors : "Green",
        quantity : 4
      }

      kanapCart=[k1];
      saveKanap(kanapCart);
      addToCart(kanap_id,kanapName,kanapImageUrl,kanapAltTxt,colors,quantity);// appel fonction addToCart
  //  } else if(kanapCart != null && kanapCart.length < 1){
  } else {
      var kanapCart=JSON.parse(localStorage.getItem("products"));// si deja JSON
      console.log("---------------Si au moins un canape--------------");
      var colors01=[];
      var quantity01=[];
      var kanapName01;
      for (let i=0; i<=kanapCart.length-1;i++ ){//list array
      kanapName01= kanapCart[i].kanapName;
      colors01= kanapCart[i].colors;
      quantity01=kanapCart[i].quantity;
      }
      ////****  */
      // Test si canapé de même couleur et même produit
      if(colors01===colors && kanapName01===kanapName){
        //if(colors01==colors){
          console.log("---------------CART MAIN meme couleur --------------");
          console.log(`colors : ${colors}`); 
          console.log(`colors01 : ${colors01}`); 
          console.log(`quantity : ${quantity}`);
          
          let newVal = Number(quantity) +  Number(quantity01);// on additionne les quantites
          console.log(`new Val : ${newVal}`);
          findAndReplace(kanapCart, quantity01, newVal);//update array
          saveKanap(kanapCart);// save to localStorage

        // sinon si couleur differente
        } else if(colors01 !=colors) { 
          //addToCart(kanap_id,kanapName,colors,quantity);
          console.log("****Couleur differente ****");
        addToCart(kanap_id,kanapName,kanapImageUrl,kanapAltTxt,colors,quantity);// appel fonction addToCart
        }
      }
      // console.log("--------------- empty CART MAIN --------------");  
}

/**
 * Fonction permettant ...
 * 
 */
// ***** sans test couleurs kanap_id,kanapName,color,quantity
 function addToCart(kanap_id,kanapName,kanapImageUrl,kanapAltTxt,colors,quantity){
  var kanap = {
      kanap_id : productTab._id,
      kanapName : productTab.name,     
      kanapImageUrl : productTab.imageUrl,
      kanapAltTxt : productTab.imageimageUrl,
      colors : colors,
      quantity : quantity
  }

    // on teste si il y a un article
    // switch ?
    if (quantity >=1) { // si au moins un canape + ajouter couleur
    //
    console.log("-------------CART --------------"); 
    console.log("-------------/Ajout canape/--------------"); 
    //setTimeout(kanapCart.push(kanap),10000);
    kanapCart.push(kanap);
    console.log(kanapCart);

    // bug premier canape suprimer
    // kanapCart.unshift(k1);

    saveKanap(kanapCart);  // à revoir
    }else{
      console.log("****************");
      console.log("---------------empty CART--------------");
      console.log("---- choisir un canape !!!-----"); 
    }
  
}

/**
 * Fonction permettant ...
 */

// Save item > array 
function saveKanap(kanapCart){ 
 //-------------/JSON/--------------"); 
  localStorage.setItem("products",JSON.stringify(kanapCart));
  //
}

/**
 * 
 */
function getKanap(){ 
  console.log("-------------/JSON/--------------"); 
 //localStorage.getItem("products");
 let kanapCart=JSON.parse(localStorage.getItem("products"));//
  //console.log(JSON.parse(localStorage.getItem("products")));
  console.log(kanapCart);

}



/*** **************************** */
/*** TOOLS */

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
      // break; // uncomment to stop after first replacement
    }
  }
}


//
function showArray(array){
  console.log(`**** Show ${array} *****`);
  array.forEach(function(item, index, array) {
    console.log(item, index); 
  });
  console.log('*********');
}

//
function showArrayOf(array){
  console.log(`**** Show ${array} *****`);
  for (const element of array) {
  console.log(element);
  console.log('*********');
  }
}

//
function showObj(objet){
 //
 console.log(`**** Show ${objet} *****`);
 const indexes = Object.keys(objet);
 const valeurs = Object.values(objet);
 const indexesValeurs = Object.entries(objet);
 //
//  console.log(indexes);
//  console.log(valeurs);
//  console.log(indexesValeurs);

 for(let[index,valeur] of indexesValeurs ){
  console.log(`${index} : ${valeur}`);
 }
 console.log('*********');
 
}

/**
 * Fonction permettant ...
 */



