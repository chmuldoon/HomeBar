const mongoose = require("mongoose");
//will add a function that takes in a list of ingredients
//and outputs a list of cocktails
const Ingredient = mongoose.model("ingredient");
const Cocktail = mongoose.model("cocktail");
// const Igredient = require('../models/Ingredient')
async function _mustHave(mustHave,ids){
  let cocktails = await Cocktail.find({ _id: { $in: ids } });

  mustHave.forEach(item  => cocktails = cocktails.filter(cocktail => cocktail.using2.includes(item)))

  return cocktails
}
async function _userCocktails(list, mustHave) {
  if (list.length == 0) return [];
  let range = mustHave.length > 0 ? mustHave : list;
  let output = [];
  // console.log(list)
  let objs = await Ingredient.find({ _id: { $in: range } });
  let cocktails = objs.map((i) => i.cocktails);
  cocktails.forEach((c) => {
    output = output.concat(c);
  });

  output = output.map((c) => c.toString());
  output = [...new Set(output)]

  if(mustHave.length > 0){
    output = _mustHave(mustHave, output)
  }
  return output
}

function listMaker(list, mustHave) {
  return _userCocktails(list, mustHave).then((total) => {
    return total
    // .map((c) => Cocktail.findById(c));
  });
}
module.exports = { listMaker };
