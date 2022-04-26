/****************
Product JS
start : 22/03/22
28/03/22
****************/

///*********************************** //// ************************************/ 
// Products Array 
let productTab = [];// array un seul produit

// récupérer les paramètres dʼune URL avec JavaScript
let search = new URLSearchParams(window.location.search);
let productId = search.get("id");
//console.log("id : " + productId);

// fetch 
const url='http://localhost:3000/api/products/'+productId;

fetch(url).then((res) => 
    {
      if (res.ok){
      res.json()// donnees en json
       .then((promise) => {
      productTab= promise;
      // appel fonctions
      displayProduct();// show one product
      // addToCart;// add product to cart
        }) 
    }// catch ?
      else {
        console.log("Erreur");
    } 
  })

///*********************************** CART affichage d'un produit ************************************/ 
// Show one product
// Show one product
function displayProduct(){
  // list proprietes objects
  //let kanapColors = productTab.colors;
  //console.log("productTab.colors : "+productTab.colors)
  //let kanapId = productTab._id;
  let kanapName = productTab.name;
  let kanapPrice = productTab.price;
  let kanapImageUrl = productTab.imageUrl;
  let kanapDescription = productTab.description;
  let kanapAltTxt = productTab.altTxt;

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

///*********************************** CART BTN ************************************/ 
// localStorage
var kanapCart=JSON.parse(localStorage.getItem("products"));
if(kanapCart==null){
  var kanapCart=[];// si localStorage vide je cree mon tableau de produits
}

// Submit / addToCart button
document.querySelector("#addToCart").addEventListener("click", function(event){
  event.preventDefault();//gestion event
  // id kanap_id
  var kanapId = productTab._id;
  var kanapName = productTab.name;
  var colors=document.getElementById('colors').value;// Get form elements / string
  var quantity=document.getElementById('quantity').value;// Get form elements / string 
  //
  main(kanapId,kanapName,colors,quantity);// appel fonction principale avec en parametres les donnees
});

///*********************************** MAIN CART ************************************/ 
/**
 * Fonction ...
**/
// appel fonction avec en parametres les donnees
function main(kanapId,kanapName,colors,quantity){
  var kanapCart=JSON.parse(localStorage.getItem("products"));//***/
  // test si : 
  if (kanapCart==null && quantity >=1 && colors!== ""){
    console.log("--------------- Premier canape --------------");
    addToCart(kanapId,kanapName,colors,quantity);// appel fonction 
  
    // test si :
  } else if(quantity >=1 && colors!== ""){
      //var kanapCart=JSON.parse(localStorage.getItem("products"));// si deja JSON
      console.log("---------------Si au moins un canape--------------");
      var kanapId01=[];
      var colors01=[];
      var quantity01=[];
      var kanapName01;
      for (let i=0; i<= kanapCart.length-1;i++ ){//list array
      kanapId01= kanapCart[i].kanapId;  
      kanapName01= kanapCart[i].kanapName;
      colors01= kanapCart[i].colors;
      quantity01=kanapCart[i].quantity;
      }
      // Test si canapé de même couleur et même produit
      // trouver même couleur dans array et même id, pas le dernier
      if(colors01===colors && kanapId01===kanapId){
        alert("Même canapé, même couleur");
      //if(colors01===colors && kanapName01===kanapName){
        console.log("---------------TEST si meme couleur & modele identique --------------");
        // console.log(`colors : ${colors}`); 
        // console.log(`colors01 : ${colors01}`); 
        // console.log(`quantity : ${quantity}`);
        // console.log(`kanapId01 : ${kanapId01}`);
        // console.log(`kanapId : ${kanapId}`);
        
        let newVal = Number(quantity) +  Number(quantity01);// on additionne les quantites
        // console.log(`new Val : ${newVal}`);
        findAndReplace(kanapCart, quantity01, newVal);//update array
        saveKanap(kanapCart);// save to localStorage

        // sinon si couleur differente et même produit
      } else if(colors01 !=colors && kanapId01===kanapId) { 
      console.log("---------------TEST si couleur differente & modele  identique --------------");
      addToCart(kanapId,kanapName,colors,quantity);// appel fonction addToCart

      } else if(colors01 !=colors && kanapId01!=kanapId) { 
      console.log("---------------TEST si couleur & modele différent --------------");
      addToCart(kanapId,kanapName,colors,quantity);// appel fonction addToCart
    }
    } else if(colors01 ===colors && kanapId01!=kanapId) { 
      console.log("---------------TEST si couleur identique & modele différent --------------");
      addToCart(kanapId,kanapName,colors,quantity);// appel fonction addToCart
    }
  // ----------- > revoir fonction de tri avec Array voir dossier tools
}

 // // let car = cars.find(car => car.color === "red" && car.type === "cabrio");
//  let kanapFind = kanapCart.find(kanapFind => kanapFind.colors === colors01 && kanapFind.kanapId === kanapId01);
//  {
//  console.log(`kanapFind : ${kanapFind}`);
//  }

/***********************/
/**
 * Fonction ...
**/
 function addToCart(kanapId,kanapName,colors,quantity){
  // Objet kanap pour un produit
  var kanap = {
      kanapId : productTab._id,
      kanapName : productTab.name,
      colors : colors,
      quantity : quantity
  }
  // on teste si il y a un article
  if (quantity >=1 && colors!="") { // si au moins un canape + ajouter couleur && choix couleur
  //
    console.log("-------------CART --------------"); 
    console.log("-------------/Ajout canape/--------------"); 
    //setTimeout(kanapCart.push(kanap),10000);
    kanapCart.push(kanap);
    console.log(kanapCart);
    saveKanap(kanapCart);  // à revoir
  }else{
     // ----------- > revoir ajouter controle
    console.log("****************");
    console.log("---------------empty CART--------------");
  }
}





