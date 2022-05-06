/****************
Cart JS
start : 08/04/22
maj : 13/04/22
21/04/22
****************/

///*********************************** localStorage / API ************************************/
// liste produits / API
let productsTab = [];

// localStorage
let kanapCart = JSON.parse(localStorage.getItem("products"));
if (kanapCart == null) {
    // si localStorage vide, initialisation tableau kanapCart
    kanapCart = [];
}

// fetch appel à l'API / URL sur serveur local
// pr recuperer prix ect
const url = "http://localhost:3000/api/products/";

///*********************************** MAIN ************************************/

/***********************/
// total par modèle de canapé
var total = 0;
// totaux
var totalTab = [];
var quantityTab = []; //
var kanapTotalQuantity = "";
var kanapTotalPrice = 0;
//index du canapé sauvegardé dans LocalStorage
var index = 0;

/***********************/
// On vérifie que l'arborescence DOM est construite, le HTML chargé
// puis appel fonction principale mainCart
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", mainCart);
} else {
    mainCart();
}

/***********************/
/**
 * Fonction permettant d'afficher les produits dans le panier
 * appel à l'API pour récupérer les prix, les URL d'images, les textes alternatifs
 **/
function mainCart() {
    orderList(kanapCart); // tri par modele / ID
    // boucle sur tableau kanapCart JSON du panier client
    for (let i = 0; i <= kanapCart.length - 1; i++) {
        var kanapId01 = kanapCart[i].kanapId;
        var kanapPrice = "";
        var kanapName01 = "";
        var kanapImageUrl01 = "";
        var kanapAltTxt01 = "";
        var colors01 = "";
        var quantity = "";

        // requete fetch API
        fetch(url + kanapId01).then((res) => {
            if (res.ok) {
                // donnees en json
                res.json()
                    .then((promise) => {
                        productsTab = promise;
                        // API price, et url image, alt texte
                        kanapId = productsTab._id;
                        kanapPrice = productsTab.price;
                        kanapImageUrl01 = productsTab.imageUrl;
                        kanapAltTxt01 = productsTab.altTxt;
                        index = i;

                        // JSON kanapcart
                        kanapName01 = kanapCart[i].kanapName;
                        colors01 = kanapCart[i].colors;
                        quantity = parseFloat(kanapCart[i].quantity);
                        total = quantity * kanapPrice;
                        // array de tous les totaux
                        totalTab.push(total);
                        quantityTab.push(quantity);

                        // Affichage Html du panier
                        displayProducts(
                            kanapId,
                            kanapName01,
                            kanapPrice,
                            kanapImageUrl01,
                            kanapAltTxt01,
                            colors01,
                            quantity,
                            total
                        );
                        // Gestion des actions (modification produit, supression, envoi formulaire)
                        cartManager(
                            kanapId,
                            kanapName01,
                            colors01,
                            quantity,
                            kanapPrice,
                            index
                        );
                        // Calcul Totaux et nombre articles
                        cartTotal();
                    })

                    .catch(() => {
                        alert("Erreur");
                    });
            }
        });
    }
}

///*********************************** MAIN Order ************************************/
/**
 * Fonction regroupant les actions sur le panier, modiifer, supprimer, envoyer les données
 **/
function cartManager(
    kanapId,
    kanapName01,
    colors01,
    quantity,
    kanapPrice,
    index
) {
    /*************
     * BTN UPDATE
     *************/
    var inputsQuantity = document.querySelectorAll(".itemQuantity");
    var input = "";
    for (let i = 0; i <= inputsQuantity.length - 1; i++) {
        input = inputsQuantity[i];
    }
    input.addEventListener("change", function (event) {
        //gestion event
        event.preventDefault();
        updateProduct(event, input, kanapId, quantity, kanapPrice, index);
    });

    /*************
     * BTN DELETE
     *************/
    var deleteProductButtons = document.querySelectorAll(".deleteItem");
    for (var i = 0; i < deleteProductButtons.length; i++) {
        var button = deleteProductButtons[i];
    }
    button.addEventListener("click", function (event) {
        //gestion event
        event.preventDefault();
        deleteProduct(event, kanapId, quantity, index);
    });
    /*************
     * BTN SUBMIT
     *************/
    document
        .querySelector("#order")
        .addEventListener("click", function (event) {
            event.preventDefault(); //gestion event
            // tableau des ID des produits dans le panier
            var kanapIds = [];
            for (let i = 0; i <= kanapCart.length - 1; i++) {
                kanapId = kanapCart[i].kanapId; // OU ?
                kanapIds.push(kanapId);
                // Get form / contacts infos
                var firstName = document.getElementById("firstName").value;
                var lastName = document.getElementById("lastName").value;
                var address = document.getElementById("address").value;
                var city = document.getElementById("city").value;
                var email = document.getElementById("email").value;
            }
            // Appel fonction envois des données
            orderForm(firstName, lastName, address, city, email, kanapIds);
        });
}

///*********************************** UPDATE ************************************/
/**
 * Fonction pour modiifer un produit
 **/
function updateProduct(event, input, kanapId, quantity, kanapPrice, index) {
    var input = event.target;
    //
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    var newVal = parseFloat(input.value);
    // modifie produit dans tableau JSON
    kanapCart[index].quantity = newVal;
    // save to LocalStorage
    saveKanap(kanapCart);
    //tab total update
    totalTab[index] = newVal * kanapPrice;
    quantityTab[index] = newVal;
    //recalcul, totaux
    cartTotal();
}

///*********************************** DELETE ************************************/
/**
 * function pour supprimer un produit
 */
function deleteProduct(event, kanapId, quantity, index) {
    var button = event.target;
    // test confirmation supression
    if (confirm("Voulez-vous vraiment supprimer cet article ? ")) {
        if (event !== -1) {
            // supprimer du DOM l'article correspondant
            const removeB =
                button.parentElement.parentElement.parentElement.parentElement;
            removeB.remove();
            // modifie produit dans tableau JSON
            kanapCart[index].quantity = 0;
            //tableau totaux et nombres articles mis à jour
            totalTab[index] = 0;
            quantityTab[index] = 0;
            //recalcul, totaux
            cartTotal();
            //
            kanapCart.splice(index, 1);
            // sauvegarde au localStorage
            localStorage.setItem("products", JSON.stringify(kanapCart));
            location.reload();
            alert("Suppression effectuée");
        }
    } else {
        alert("Suppression annulée");
    }
}

///*********************************** CALCUL TOTAL PRICE & NB  ARTICLES ************************************/
/**
 * function pour afficher totaux et nombre articles
 */
function cartTotal() {
    // calcul totaux
    var kanapTotalQuantity = 0;
    var kanapTotalPrice = 0;
    for (let i = 0; i < totalTab.length; i++) {
        kanapTotalPrice += totalTab[i];
    }
    // calcul nombre d'articles
    for (let j = 0; j < quantityTab.length; j++) {
        kanapTotalQuantity += quantityTab[j];
    }
    // affichage totaux produits & nombre d'articles
    const totalPrice = document.querySelector("#totalPrice"); ////
    totalPrice.innerHTML = kanapTotalPrice;

    const totalQuantity = document.querySelector("#totalQuantity"); ////
    totalQuantity.innerHTML = kanapTotalQuantity;
}

///*********************************** AFFICHAGE HTML ************************************/
/**
 * Fonction permettant d'afficher les donnees dans la page html
 **/
function displayProducts(
    kanapId,
    kanapName01,
    kanapPrice,
    kanapImageUrl01,
    kanapAltTxt01,
    colors01,
    quantity,
    total
) {
    const cart__items = document.querySelector("#cart__items"); //// SECTION 00
    const article = document.createElement("article"); ///// ARTICLE 01
    article.classList.add("cart__item");
    article.setAttribute("data-id", kanapId); //
    article.setAttribute("data-color", colors01); //
    ///// div IMG
    const div_img = document.createElement("div"); ///// div IMG
    div_img.classList.add("cart__item__img");

    const img = document.createElement("img"); /////img
    img.src = kanapImageUrl01;
    img.alt = kanapAltTxt01;
    //
    cart__items.appendChild(article);
    article.appendChild(div_img);
    div_img.appendChild(img);

    ///03//BIG div 03
    const div_big = document.createElement("div"); /////BIG div 02
    div_big.classList.add("cart__item__content"); //
    article.appendChild(div_big);

    ///04// div 04 description
    const div_description = document.createElement("div"); /////
    div_description.classList.add("cart__item__content__description"); //
    div_big.appendChild(div_description);

    /// name
    const h2 = document.createElement("h2");
    //const nkanapName= document.createTextNode(kanapName01+" : "+ kanapId);
    const nkanapName = document.createTextNode(kanapName01);
    div_description.appendChild(h2);
    h2.appendChild(nkanapName);

    // colors
    const p_color = document.createElement("p");
    const nkanapColor = document.createTextNode(colors01);
    div_description.appendChild(p_color);
    p_color.appendChild(nkanapColor);

    // price ///*** &euro;*/
    const p_price = document.createElement("p");
    //console.log(kanapPrice);
    const nkanapPrice = document.createTextNode(kanapPrice + " €");
    div_description.appendChild(p_price);
    p_price.appendChild(nkanapPrice);

    ////05// med div 05 settings
    const div_settings = document.createElement("div");
    div_settings.classList.add("cart__item__content__settings"); //
    div_big.appendChild(div_settings);

    // div settings__quantity
    const div_settings_quant = document.createElement("div");
    div_settings_quant.classList.add("cart__item__content__settings__quantity"); //
    div_settings.appendChild(div_settings_quant);

    // quantity -> btn *******************************
    const p_quant = document.createElement("p");

    const nkp = document.createTextNode("Qté");
    div_settings_quant.appendChild(p_quant);
    p_quant.appendChild(nkp);

    const input_quantity = document.createElement("input"); /////
    input_quantity.setAttribute("type", "number");
    input_quantity.classList.add("itemQuantity"); //
    input_quantity.setAttribute("name", "itemQuantity");
    input_quantity.setAttribute("min", "1");
    input_quantity.setAttribute("max", "100");
    input_quantity.setAttribute("value", quantity);

    div_settings_quant.appendChild(input_quantity);
    // div settings__delete
    // delete -> btn *******************************
    const div_settings_del = document.createElement("div");
    div_settings_del.classList.add("cart__item__content__settings__delete"); //
    div_settings.appendChild(div_settings_del);

    // BTN delete
    const p_delete = document.createElement("p");
    const nkdelete = document.createTextNode("Supprimer");
    p_delete.classList.add("deleteItem");
    div_settings_del.appendChild(p_delete);
    p_delete.appendChild(nkdelete);
}

//*********************************** ORDER FORM ************************************/
/**
 * Fonction validation des données utilisateurs
 **/
function orderForm(firstName, lastName, address, city, email, kanapIds) {
    /*** REGEX ***/
    var regexName =
        /^[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ .'-]*$/;
    var regexAdress =
        /[0-9a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ ,.'-/]*$/;
    var regexCity =
        /^[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ'-]*$/;
    var regexEmail = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;

    /*** MSG ERR ***/
    var firstNameErrorMsg = document.querySelector("#firstNameErrorMsg"); //
    var lastNameErrorMsg = document.querySelector("#lastNameErrorMsg"); //
    var addressErrorMsg = document.querySelector("#addressErrorMsg"); //
    var cityErrorMsg = document.querySelector("#cityErrorMsg"); //
    var emailErrorMsg = document.querySelector("#emailErrorMsg"); //

    //Objet formCart pour un user
    const formCart = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        },
        products: kanapIds,
    };

    // Tests si les différents champs sont remplis
    if (
        regexName.test(firstName) === true &&
        regexName.test(lastName) === true &&
        regexAdress.test(address) === true &&
        regexCity.test(city) === true &&
        regexEmail.test(email) === true
    ) {
        // si ok, requete fetch
        cartOrderForm(formCart);
        // sinon
    } else {
        if (regexName.test(firstName) !== true) {
            firstNameErrorMsg.innerHTML =
                "Remplissez le champ PRENOM correctement";
        } else {
            firstNameErrorMsg.innerHTML = "";
        }
        if (regexName.test(lastName) !== true) {
            lastNameErrorMsg.innerHTML = "Remplissez le champ NOM correctement";
        } else {
            lastNameErrorMsg.innerHTML = "";
        }
        if (regexAdress.test(address) !== true) {
            addressErrorMsg.innerHTML = "Remplissez l'ADRESSE correctement";
        } else {
            addressErrorMsg.innerHTML = "";
        }
        if (regexCity.test(city) !== true) {
            cityErrorMsg.innerHTML = "Remplissez le champ VILLE correctement";
        } else {
            cityErrorMsg.innerHTML = "";
        }
        if (regexEmail.test(email) !== true) {
            emailErrorMsg.innerHTML = "EMAIL invalide";
        } else {
            emailErrorMsg.innerHTML = "";
        }
    }
}

/**
 * Fonction pour envoyer les données à l'API
 * POST fetch
 **/
function cartOrderForm(formCart) {
    const headersForm = {
        method: "POST",
        body: JSON.stringify(formCart),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    fetch("http://localhost:3000/api/products/order", headersForm)
        .then((response) => response.json())
        .then((formCart) => {
            let orderId = formCart.orderId;
            document.location.href = "confirmation.html?order=" + orderId;
        })
        .catch(() => {
            alert("Erreur");
        });
}
