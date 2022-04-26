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

// Tri nombre
function orderListNb(data) {

  const orderedData = data.sort((a,b) => {
    return a-b;
  })
  console.log(data);
  return orderedData;
}

// Tri par champ
function orderListField(data,field) {
  var field="";//field='title
  //sort by field - title, price
  //return a sorted shallow copy of the CART.contents array
  const orderedData = data.sort( (a, b)=>{
      if(a[field] > b[field]){
          return 1;
      }else if(a[field] < a[field]){
          return -1;
      }else{
          return 0;
      }
  });
  return orderedData;
}

///*********************************** autres fonctions ************************************/ 
/**
 * Fonction permettant ...
 */
// Save item > array 
function saveKanap(kanapCart){ 
  //-------------/JSON/--------------");
  console.log("-------------/JSON/--------------"); 
  localStorage.setItem("products",JSON.stringify(kanapCart));

   //
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


/**
 * Fonction permettant de modifier la valeur d'un tableau 
 * ex si même couleur
 *  updateArray(totalTab, total, newTotal);// bug ???
 updateArray(quantityTab, total, newVal);// bug ???
 */ 
 function updateArray(array, index, newValue) {
  array[index] = newValue;
}

function updateArray02(array, index, newValue) {
  array[index].quantity = newValue;
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
 
 /**
  * Fonction permettant ...
  */