const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Ingredient = require("../../models/Ingredient");
const User = require("../../models/User");
const CocktailService = require('../../services/cocktail');

router.get('/', async (req, res) => {
  try {
    let ingredients = await Ingredient.find().select("-cocktails")
    res.json(ingredients)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
})
router.put('/add/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password")
    let newIngredientsList = user.ingredients.concat(req.params.id)
    let newCocktailList = await CocktailService.listMaker(newIngredientsList, user.mustHave)
    user.ingredients = newIngredientsList
    user.cocktails = newCocktailList

    await user.save()


    res.json(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at ingredient add");
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
    let newCocktailList = await CocktailService.listMaker(
      newIngredientsList,
      user.mustHave
    );
    user.ingredients = newIngredientsList;
    user.cocktails = newCocktailList;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at ingredient remove");
  }
});

router.put("/addmusthave/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    let newMustHaveList = user.mustHave.concat(req.params.id);
    let newCocktailList = await CocktailService.listMaker(
      user.ingredients,
      newMustHaveList
    );
    user.mustHave = newMustHaveList;
    user.cocktails = newCocktailList;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at addmusthave");
  }
})

router.put("/removemusthave/:id", auth, async (req, res) => {
  // console.log("woo")
  try {
    let user = await User.findById(req.user.id).select("-password");
    let newMustHaveList = user.mustHave;
    newMustHaveList = newMustHaveList
      .slice()
      .slice(0, newMustHaveList.indexOf(req.params.id))
      .concat(
        newMustHaveList.slice(newMustHaveList.indexOf(req.params.id) + 1)
      );
    let newCocktailList = await CocktailService.listMaker(
      user.ingredients,
      newMustHaveList
    );
    user.mustHave = newMustHaveList;
    user.cocktails = newCocktailList;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at ingredient remove must have");
  }
});


module.exports = router;

