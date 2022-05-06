/****************
JS Index
start : 22/03/22
****************/

///*********************************** //// ************************************/
// Tableau des produits
// colors, _id, name price, imageUrl, description, altText
let productsTab = [];

// URL fetch
const url = "http://localhost:3000/api/products";

fetch(url).then((res) => {
    if (res.ok) {
        res.json() // donnees en json
            .then((promise) => {
                productsTab = promise;
                // appel fonction
                displayProducts();
            })
            .catch(() => {
                alert("Erreur");
            });
    }
});

///*********************************** DISPLAY ************************************/
/**
 * fonction permettant d'afficher les produits après l'appel à l'API
 */
function displayProducts() {
    //
    for (let i = 0; i <= productsTab.length - 1; i++) {
        // list proprietes objects
        //var kanapColors = productsTab[i].colors;
        var kanapId = productsTab[i]._id;
        var kanapName = productsTab[i].name;
        //var kanapPrice = productsTab[i].price;
        var kanapImageUrl = productsTab[i].imageUrl;
        var kanapDescription = productsTab[i].description;
        var kanapAltTxt = productsTab[i].altTxt;

        // html
        const items = document.querySelector("#items");
        // link
        const a = document.createElement("a");
        a.href = "./product.html?id=" + kanapId;
        //
        const article = document.createElement("article");
        const h3 = document.createElement("h3");
        // Ajoute la classe à l'élément
        h3.classList.add("productName");
        /// img
        const img = document.createElement("img");
        //** img Url
        img.src = kanapImageUrl;

        img.alt = kanapAltTxt;
        // p
        const p = document.createElement("p");
        // Ajoute la classe à l'élément
        p.classList.add("productDescription");
        //
        const nkanapName = document.createTextNode(kanapName);
        const nkanapDescription = document.createTextNode(kanapDescription);
        //
        items.appendChild(a);
        a.appendChild(article);
        article.appendChild(h3); //** */
        h3.appendChild(nkanapName);
        article.appendChild(img);

        article.appendChild(p); //
        p.appendChild(nkanapDescription);
    }
}
