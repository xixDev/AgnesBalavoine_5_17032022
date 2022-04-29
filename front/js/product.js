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
let kanap={}; // un produit
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
/**
 * Fonction ...
**/
function displayProduct(){
  // list proprietes objects
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
  // si localStorage vide, initialisation tableau kanapCart
  var kanapCart=[];
}

// Submit / addToCart button
document.querySelector("#addToCart").addEventListener("click", function(event){
  //gestion event
  event.preventDefault();
  // données stockées dans tableau / API
  var kanapId = productTab._id;
  var kanapName = productTab.name;
  // Get form elements / string
  var colors=document.getElementById('colors').value;
  var quantity=document.getElementById('quantity').value;
  // appel fonction principale avec en parametres les donnees
  addToCart(kanapId,kanapName,colors,quantity);
});

///*********************************** MAIN  ************************************/ 

/***********************/
/**
 * Fonction ...
**/
 function addToCart(kanapId,kanapName,colors,quantity){
  // Objet kanap pour un produit
   kanap = {
      kanapId : productTab._id,
      kanapName : productTab.name,
      colors : colors,
      quantity : quantity
  }
  // si au moins un canape + choix de couleur
  if (quantity >=1 && colors!== ""){  
  // ajout du produit au tableau kanapCart
  kanapCart.push(kanap);
  // sauvegarde dans le LocalStarage et traitment doublons
  saveKanap(kanapCart);  

  }else{
   //
   alert("Veuillez choisir une couleur ou une quantité");
  }
}




 









