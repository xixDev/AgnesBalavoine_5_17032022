/****************
TOOLS JS
start : 24/04/22
maj : 28/04/22
****************/

/**
 * Fonction permettant de trier une liste 
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
 * Fonction permettant de sauvegarder les données dans le localStaorage
 */
function saveKanap(kanapCart){ 
  //-------------/JSON/--------------");
  localStorage.setItem("products",JSON.stringify(kanapCart));
  //enlever doublons
  magicTool();
 }

 /**
 * Fonction permettant d'enlever les doublons et d'ajouter les quantités
 * 
 */
function magicTool(){ 
  // trier doublons par ID et couleurs, fusionner les identiques
  kanapCart = kanapCart.reduce((acc, e) => {
    e.quantity=parseFloat(e.quantity);
    // on cherche les enrgistrements : même couleurs et même id
      const found = acc.find(x => (e.colors === x.colors && e.kanapId === x.kanapId))
      // si doublons, on ajoute la quantité 
      found ? found.quantity += e.quantity : acc.push(e)
      return acc
  }, [])
  //sauvegarde du panier dans le localStorage au format JSON 
  localStorage.setItem("products",JSON.stringify(kanapCart));
}








 