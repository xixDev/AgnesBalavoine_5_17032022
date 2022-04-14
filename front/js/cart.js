/****************
Cart JS
start : 08/04/22
****************/
//console.log("Cart ?");
//var productTab = [];//??

//var kanapCart = [];// declare cartAll array
var kanapCart=JSON.parse(localStorage.getItem("products"));

//cartDisplay();// afficher les produits du panier

// Products Array 
//let productTab = [];
//let kanapCart = [];

// Show Cart
//getItem(kanapCart);

// Array products
let productsTab = [];// Objets in an array - liste produits 

// fetch 
const url='http://localhost:3000/api/products';// pr recuperer prix ect

fetch(url).then((res) => 
    {
      if (res.ok){
      res.json()// donnees en json
       .then((promise) => {
      productsTab= promise;
        // appel fonction
       // allProducts();
        cartDisplay();//
        //allProducts();
        
    }) 
    }else {
        console.log("Erreur");
    } 
  })

 


// displayJSON();// display all products

/**
 * Fonction permettant ...
 */
// Show all product in cart


// a revoir // product.js
function saveItem(kanapCart){ 
  console.log("-------------/JSON/--------------"); 
  localStorage.setItem("products",JSON.stringify(kanapCart));
  console.log(localStorage.setItem("products",JSON.stringify(kanapCart)));
  //
}
/**
 * Fonction permettant ...
 *  array to JSON - JSON to array ? parse ?
 */
/**
 * Fonction permettant ...
 */
function getKanap(){ 
console.log("-------------/JSON/--------------"); 
 let kanapCart=JSON.parse(localStorage.getItem("products"));//
  //console.log(JSON.parse(localStorage.getItem("products")));
  console.log(kanapCart);
}


// function list products / JSON backend
function allProducts(){
  for (let i=0; i<=productsTab.length-1;i++ ){//list array
    // list proprietes objects
    var kanapColors = productsTab[i].colors;
    var kanapId = productsTab[i]._id;
    var kanapName = productsTab[i].name;
    var kanapPrice = productsTab[i].price;
    var kanapImageUrl = productsTab[i].imageUrl;
    var kanapDescription = productsTab[i].description;
    var kanapAltTxt = productsTab[i].altTxt;
    console.log("Price / "+ kanapName +" : "+ productsTab[i].price);
  } 
} 

/**
 * Fonction permettant ...
 */
// function list products
//function cartDisplay(kanap_id,kanapName,colors,quantity){
function cartDisplay(kanapPrice){
  let kanapCart=JSON.parse(localStorage.getItem("products"));

  // for (let j=0; j<=productsTab.length-1;j++ ){//list array
  //   // list proprietes objects
  //   //var kanapColors = productsTab[j].colors;
  //   var kanapId = productsTab[j]._id;
  //   var kanapPrice = productsTab[j].price;
  //   //console.log("Price / "+ kanapName +" : "+ productsTab[j].price);
  //   console.log("Price / "+ kanapPrice);
  
  // }


  //showArray(productsTab);///

  // bug premier canape
  for (let i=1; i<=kanapCart.length-1;i++ ){//list array
    // kanapId= kanapId01;
    kanapId=kanapCart[i].kanap_id;
    kanapName01= kanapCart[i].kanapName;
    // 
    kanapImageUrl01 = kanapCart[i].kanapImageUrl;
    kanapAltTxt01= kanapCart[i].kanapAltTxt; 
    var colors01= kanapCart[i].colors;
    var quantity01=kanapCart[i].quantity;

    // lien tableau product ??
    kanapPrice = productsTab[i].price;
   
    
    console.log("Price / "+ kanapName01 +" : "+ kanapPrice);
    //console.log("Price / "+ kanapName +" : "+ kanapPrice + " : "+ kanapId01);
    //console.log(" CART / "+ kanapName +" : "+ kanapName01);
   //console.log(" CART / "+ kanapName01 +" : "+ kanapId);
   

    //var kanapAltTxt = kanapCart[i].altTxt;
    //console.log(kanapCart[i]);

    // console.log("--------- Numero " +i+ "---------");
    // console.log("Colors : "+ colors01);
    // console.log("Id : "+ kanapId);
    // console.log("Name : "+ kanapName01);
    // console.log("Url : "+ kanapImageUrl01);
    // console.log("quantity01 : "+quantity01);
    // // console.log("Image Url : "+ kanapImageUrl);
    // // console.log("Description : "+ kanapDescription);
    // // console.log("AltTxt : "+ kanapAltTxt);
    // console.log("-------------------------------"); 

    // SECTION #cart__items
    const cart__items = document.querySelector("#cart__items");//// SECTION 00
    const article=document.createElement("article");///// ARTICLE 01
    article.classList.add("cart__item");

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
        const nkp= document.createTextNode("Qté : ");
        div_settings_quant.appendChild(p_quant);
        p_quant.appendChild(nkp);

       //document.querySelector("input").value=quantity01;
        const input_quantity=document.createElement("input"); ///// 
        input_quantity.setAttribute("type", "number");
        input_quantity.classList.add("itemQuantity");//
        input_quantity.setAttribute("name", "itemQuantity");
        input_quantity.setAttribute("min", "1");
        input_quantity.setAttribute("max", "100");
        input_quantity.setAttribute("value", quantity01);

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
        
        ///to continued
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
  console.log(`**** ShowOf ${array} *****`);
  for (const element of array) {
  console.log(element);
  }
  console.log('*********');
}
