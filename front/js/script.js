/****************
JS
start : 22/03/22
****************/

// const productsAll=window.location.search;
// console.log("productsAll : " + productsAll);

// let search = new URLSearchParams(window.location.search);
// let productId = search.get("id");

//
// colors, _id, name price, imageUrl, description, altText

// Etape 3
// function list products
let productsTab = [];// Objets in an array
// const productId=window.location.search;
// console.log("productId : " + productId);

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

    console.log("--------- Numero " +i+ "---------");
    console.log("Colors : "+ kanapColors);
    console.log("Id : "+ kanapId);
    console.log("Name : "+ kanapName);
    console.log("Price : "+kanapPrice);
    console.log("Image Url : "+ kanapImageUrl);
    console.log("Description : "+ kanapDescription);
    console.log("AltTxt : "+ kanapAltTxt);

    console.log("-------------------------------"); 
    // Etape 4
    
      // html 
      const items= document.querySelector("#items");
      // link
      const a=document.createElement("a");
      // let search = new URLSearchParams(window.location.search);
      // let productId = search.get("id");

      //a.href = './product.html?id='+productId;

      // const productId=window.location.search;$
      // console.log("productId : " + productId);$
      
      a.href = './product.html?id='+kanapId;//*** */
 
      const article=document.createElement("article");
      const h3=document.createElement("h3");
      h3.classList.add("productName");   // Ajoute la classe à l'élément
      const img=document.createElement("img");
      const p=document.createElement("p");
      p.classList.add("productDescription");   // Ajoute la classe à l'élément

      console.log(article);
      console.log(a);

      //
      const nkanapId= document.createTextNode(kanapId);
      const nkanapName= document.createTextNode(kanapName);
      const nkanapImageUrl= document.createTextNode(kanapImageUrl);
      const nkanapAltTxt= document.createTextNode(kanapAltTxt);
      const nkanapDescription= document.createTextNode(kanapDescription);
    
      items.appendChild(a)
      a.appendChild(article)
      article.appendChild(h3)
      //h3.appendChild(nkanapName)

      h3.appendChild(p)
      p.appendChild(nkanapDescription)

    // ajouter <a href="./product.html?id=42">
    // var items= document.querySelector("#items");
    // var item=document.createElement("article");
    // item.innerHTML='<img src="'+ kanapImageUrl +'" alt="'+ kanapAltTxt +'">'
    // +'<h3 class="productName">'+ kanapName +'</h3>'
    //     +'<p class="productDescription">'+ kanapDescription +'</p>';
    // items.appendChild(item);

      // article.innerHTML='<img src="'+ kanapImageUrl +'" alt="'+ kanapAltTxt +'">'
      //   +'<h3 class="productName">'+ kanapName +'</h3>'
      //   +'<p class="productDescription">'+ kanapDescription +'</p>';
      // items.appendChild(article);   
  }
}


// fetch 
const url='http://localhost:3000/api/products';

fetch(url).then((res) => 
    {
      if (res.ok){
      res.json()// donnees en json
       .then((promise) => {
      productsTab= promise;
        // appel fonction
        allProducts();
        }) 
    }
      else {
        console.log("Erreur");
    } 
  })














