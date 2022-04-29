/****************
TOOLS JS
start : 24/04/22
maj : 28/04/22
****************/

/**
 * Fonction permettant ...
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
  // kanapCart=magic.map((el) => {
  //   console.log(el);
  // });
  // console.log(kanapCart);

  //localStorage.setItem("products",JSON.stringify(kanapCart));
  localStorage.setItem("products",JSON.stringify(magic));
}




 