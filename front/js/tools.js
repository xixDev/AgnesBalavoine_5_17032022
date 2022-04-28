/****************
TOOLS JS
start : 24/04/22
maj : 00/04/22
****************/

/**
 * 
 * @param {*} data 
 * @returns 
 */
// Tri par nom Canapé
function orderList(data) {
  const orderedData = data.sort((a,b) => {
    if(a.kanapId < b.kanapId) {
      return -1;
    }
    if(a.kanapId > b.kanapId) {
      return 1;
    }
    return 0;
  })
  return orderedData;
}

////***********************************************************************/
/**
 * Fonction ...
**/
function addToCartO2(kanapId,kanapName,colors,quantity){
  // Objet kanap pour un produit
  var kanap = {
      kanapId : kanapId,
      kanapName : kanapName,
      colors : colors,
      quantity : quantity
  }
    console.log("-------------CART --------------"); 
    console.log("-------------/Modif canape/--------------"); 
    //setTimeout(kanapCart.push(kanap),10000);
    kanapCart.push(kanap);
    magicTool();//enlever doublons
}
 
/**
 * Fonction permettant ...
 */
function saveKanap(kanapCart){ 
  //-------------/JSON/--------------");
  localStorage.setItem("products",JSON.stringify(kanapCart));
  magicTool();//enlever doublons
 }

 /**
 * Fonction permettant de faire des choses magiques
 */
function magicTool(){ 
  var kanapCart=JSON.parse(localStorage.getItem("products"));
  // trier doublons, fusionner 
  //console.table(kanapCart);
  const magic = kanapCart.reduce((acc, e) => {
    e.quantity=parseFloat(e.quantity);
    const found = acc.find(x => (e.colors === x.colors && e.kanapId === x.kanapId))
    found ? found.quantity += e.quantity : acc.push(e)
    return acc
  }, [])
  console.table(magic);
  // recopier magic dans kanapCart ??
  localStorage.setItem("products",JSON.stringify(magic));
}


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
       // object["quantity"] = replacevalue.toString();// 
       break; // uncomment to stop after first replacement
     }
   }
 }

/// CART 
 function findAndReplaceQ(object, value, replacevalue){
  for(var x in object){
    if(typeof object[x] == typeof {}){
      findAndReplaceQ(object[x], value, replacevalue);
    }
    if(object[x] == value){ 
      object["quantity"] = replacevalue;
      // object["quantity"] = replacevalue.toString();// 
     break; // uncomment to stop after first replacement
    }
  }
}



 /*** **************************** */
 /*** TOOLS */

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
 
