const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Ingredient = require("../../models/Ingredient");
const User = require("../../models/User");
const CocktailService = require('../../services/cocktail');

router.get('/', async (req, res) => {
  try {
    let ingredients = await Ingredient.find()
    console.log("git")
    res.json(ingredients)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
})
router.put('/add/:id', auth, async (req, res) => {
  // console.log("woo")
  try {
    let user = await User.findById(req.user.id).select("-password")
    let newIngredientsList = user.ingredients.concat(req.params.id)
    console.log(newIngredientsList)
    let newCocktailList = await CocktailService.listMaker(newIngredientsList, user.mustHave)
    console.log(newCocktailList);
    user.ingredients = newIngredientsList
    user.cocktails = newCocktailList

    await user.save()


    res.json(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
})

router.put("/remove/:id", auth, async (req, res) => {
  // console.log("woo")
  try {
    let user = await User.findById(req.user.id).select("-password");
    let newIngredientsList = user.ingredients
    newIngredientsList = newIngredientsList
      .slice()
      .slice(0, newIngredientsList.indexOf(req.params.id))
      .concat(newIngredientsList.slice(newIngredientsList.indexOf(req.params.id) + 1));
    console.log(newIngredientsList);
    let newCocktailList = await CocktailService.listMaker(
      newIngredientsList,
      user.mustHave
    );
    console.log(newCocktailList);
    user.ingredients = newIngredientsList;
    user.cocktails = newCocktailList;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});


module.exports = router;

