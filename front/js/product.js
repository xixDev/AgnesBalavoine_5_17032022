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

// fetch 
const url='http://localhost:3000/api/products/'+productId;

fetch(url).then((res) => 
    {
      if (res.ok){
      res.json()// donnees en json
       .then((promise) => {
      productTab= promise;
      // appel fonction
      displayProduct();
        }) 
    }// catch ?
      else {
        console.log("Erreur");
    } 
  })

///*********************************** CART affichage ************************************/ 
/**
 * Fonction permettant d'afficher un produit 
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
  // si localStorage vide, initialisation tableau panier : kanapCart 
  var kanapCart=[];
}

// Submit / addToCart button
document.querySelector("#addToCart").addEventListener("click", function(event){
  //gestion event
  event.preventDefault();
  // données stockées dans tableau / API
  var kanapId = productTab._id;
  var kanapName = productTab.name;
  // Choix utilsateurs : couleur, quantité
  var colors=document.getElementById('colors').value;
  var quantity=document.getElementById('quantity').value;
  // appel fonction principale avec en parametres les donnees
  addToCart(kanapId,kanapName,colors,quantity);
});

///*********************************** MAIN  ************************************/ 

/***********************/
/**
 * Fonction pour ajouter des produits dans un tableau
 * en paramétres les données de l'API et les saisies utulisateurs
 * sauvegarde dans le localStarage
**/
 function addToCart(kanapId,kanapName,colors,quantity){
  // Objet kanap pour un produit
   kanap = {
      kanapId : productTab._id,
      kanapName : productTab.name,
      colors : colors,
      quantity : quantity
  }
  // si au moins un canape et saise du choix de couleur
  if (quantity >=1 && colors!== ""){  
  // ajout du produit au tableau kanapCart
  kanapCart.push(kanap);
  // sauvegarde dans le LocalStarage et traitement doublons
  saveKanap(kanapCart);  
  //
  alert("Vous avez ajouté des produits dans votre panier. Merci");
  // s'il manque soit la quantité ou la couleur
  }else{
  //
  alert("Veuillez choisir une couleur ou une quantité");
  }
}




 









