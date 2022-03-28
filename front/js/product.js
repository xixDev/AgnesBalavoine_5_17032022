/****************
Product JS
start : 22/03/22
28/03/22
****************/

// 
let productTab = [];// Objets in an array

// 
let search = new URLSearchParams(window.location.search);
let productId = search.get("id");
console.log("id : " + productId);

// fetch 
//const url='http://localhost:3000/api/products/'+productId;
const url='http://localhost:3000/api/products/'+productId;
console.log("url : " + url);

fetch(url).then((res) => 
    {
      if (res.ok){
      res.json()// donnees en json
       .then((promise) => {
      productTab= promise;
      console.log("productsTab : " +promise);
        // appel fonction
      oneProduct();
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
  
      //console.log("--------- Numero " +i+ "---------");
      console.log("Colors : "+ kanapColors);
      console.log("Id : "+ kanapId);
      console.log("Name : "+ kanapName);
      console.log("Price : "+kanapPrice);
      console.log("Image Url : "+ kanapImageUrl);
      console.log("Description : "+ kanapDescription);
      console.log("AltTxt : "+ kanapAltTxt);
      console.log("-------------------------------"); 

      // html

       // img
      //  const title= document.querySelector("#title");
      //  const h1=document.createElement("h1");
      //  const nkanapName= document.createTextNode(kanapName);
      //  title.appendChild(h1);
      //  h1.appendChild(nkanapName);

      // title
      const title= document.querySelector("#title");
      const h1=document.createElement("h1");
      const nkanapName= document.createTextNode(kanapName);
      title.appendChild(h1);
      h1.appendChild(nkanapName);

      // price
      const price= document.querySelector("#price");
      const span=document.createElement("span");
      const nkanapPrice= document.createTextNode(kanapPrice);
      price.appendChild(span);
      span.appendChild(nkanapPrice);

      //<p id="description"
      const description= document.querySelector("#description");
      const p=document.createElement("p");
      const nkanapDescription= document.createTextNode(kanapDescription);
      description.appendChild(p);
      p.appendChild(nkanapDescription);

      // colors
      for (let i in productTab.colors){
        const colors= document.querySelector("#colors");
        const option=document.createElement("option");
        option.value=productTab.colors[i];
        const nkanapColors= document.createTextNode(productTab.colors[i]);
        colors.appendChild(option);
        option.appendChild(nkanapColors);

      }
      //    
  
  }
