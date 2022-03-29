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
console.log("id : " + productId);

// fetch 
const url='http://localhost:3000/api/products/'+productId;
console.log("url : " + url);

fetch(url).then((res) => 
    {
      if (res.ok){
      res.json()// donnees en json
       .then((promise) => {
      productTab= promise;
      console.log("productsTab : " +promise);
        // appel fonctions
      oneProduct();// show one product
      cartProduct();// cart
      


        }) 
    }
      else {
        console.log("Erreur");
    } 
  })

// Show one product
function oneProduct(){
      // list proprietes objects
      var kanapColors = productTab.colors;
      console.log("productTab.colors : "+productTab.colors)
      var kanapId = productTab._id;
      var kanapName = productTab.name;
      var kanapPrice = productTab.price;
      var kanapImageUrl = productTab.imageUrl;
      var kanapDescription = productTab.description;
      var kanapAltTxt = productTab.altTxt;
  
      console.log("-------------------------------"); 
      console.log("Colors : "+ kanapColors);
      console.log("Id : "+ kanapId);
      console.log("Name : "+ kanapName);
      console.log("Price : "+kanapPrice);
      console.log("Image Url : "+ kanapImageUrl);
      console.log("Description : "+ kanapDescription);
      console.log("AltTxt : "+ kanapAltTxt);
      console.log("-------------------------------"); 

      // html

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


// Cart function info

// Array = id, quantite du produit, couleur du produit
/*
Il est nécessaire d’utiliser localStorage pour pouvoir accéder à cet
array depuis la page Panier.
● Lorsqu’on ajoute un produit au panier, si celui-ci n'était pas déjà
présent dans le panier, on ajoute un nouvel élément dans l’array.
● Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent dans le panier (même id + même couleur), on incrémente
simplement la quantité du produit correspondant dans l’array.
*/
/*
<div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>
              <!--#P5 -->
              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

*/

// Cart function
// local storage
let cart=[];
// let cartQuantity= localStorage.getItem('quantity');
// console.log("quantity 02? : "+ cartQuantity);
// let cartColors= localStorage.getItem('colors');
// console.log("colors 02 ? : "+cartColor);

function cartProduct(){

let cartQuantity= localStorage.getItem('quantity');
console.log("quantity 02? : "+ cartQuantity);
let cartColors= localStorage.getItem('colors');
console.log("colors 02 ? : "+cartColors);
}

 // localStorage btn
 function cartProduct0(){
  //var kanapId = productTab._id;

 if(window.localStorage){
        
  let txtColor=document.getElementById('colors');// Get form elements / string
  let txtQuantity=document.getElementById('quantity');// Get form elements / string
  console.log("---------local storage ----------------------"); 

  // btn
  // kanapId.addEventListener('imput', function(){
  //   localStorage.setItem('id',kanapId.value ); 
  //   console.log("id ? : "+ kanapId);
  // }, false);

  // data saved
  txtColor.addEventListener('select', function(){
    localStorage.setItem('colors',txtColor.value ); 
    console.log("Colors ? : "+ colors);
  }, false);

  txtQuantity.addEventListener('imput', function(){
    localStorage.setItem('quantity',txtQuantity.value ); 
    console.log("quantity ? : "+ quantity);
  }, false);

  }  
}



