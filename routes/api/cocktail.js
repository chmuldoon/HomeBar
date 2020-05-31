const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Cocktail = require('../../models/Cocktail')
const Ingredient = require("../../models/Ingredient");

const User = require("../../models/User");


//get all cocktails
//public
//testing

// router.get('/', async (req, res) => {
//   try {
//     const cocktails = await Cocktail.find().select('_id name photo')

//     res.json(cocktails)
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server err");
//   }
// })
router.get("/search", async (req, res) => {
  try {
    let cocktails = await Cocktail.find({}).select("-glass -ingredients -instructions -measurements -using -using2 -__v");
    let ingredients = await Ingredient.find({}).select("_id name img cocktails");

    res.json({ cocktails, ingredients });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at search items");
  }
});

//get cocktail by id
//public
//likely for app


router.get("/:id", async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) return res.status(400).json({ msg: "Cocktail not found" });

    res.json(cocktail);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

//fetch user's cocktails

router.get('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: "User is not found" });

    let cocktails = await Cocktail.find( { _id : { $in: user.cocktails}})

    res.json(cocktails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at fetch user cokctails");
  }
})

module.exports = router;