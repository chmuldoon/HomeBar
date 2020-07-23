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
// router.get("/", async (req, res) => {
//   try {
//     const cocktails = await Cocktail.find();

//     res.json(cocktails)
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server err");
//   }
// })
router.post("/", 
  auth,
  async (req, res) => {
    const { name, instructions, glass, using2, using,  measurements, photo, userMade } = req.body
  try {
    const ingredients = using.slice()
    while(ingredients.length < 15){
      ingredients.push(null)
    }
    while(measurements.length < 15){
      measurements.push(null)
    }
    ///MAKE SURE COCKTAIL DOESNT ALREADY EXIST


    const cocktail = new Cocktail({
      name,
      instructions,
      glass,
      ingredients,
      measurements,
      using,
      using2,
      photo,
      userMade
    });
    await cocktail.save()
    // const ings = await Ingredient.find({ _id: { $in: using2 } })
    // for (let i = 0; i < ings.length; i++) {
    //   ings[i].cocktails.push(cocktail._id)
    //   ings[i].save()
    // }
    


    res.json(cocktail)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
})
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
router.get("/favorites", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    let cocktails = await Cocktail.find({ _id: { $in: user.favorites } });

    res.json(cocktails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at addmusthave");
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


router.put("/add/favorites/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    if(!user.favorites) { user.favorites = []}

    let newFavoritesList = user.favorites.concat(req.params.id);
    //if ingredients does not include, then add
    if (!user.favorites.includes(req.params.id)) {
      let newFavoritesList = user.favorites.concat(req.params.id);
      user.favorites = newFavoritesList;
    }

    user.favorites = newFavoritesList;


    await user.save();

    let cocktails = await Cocktail.find({ _id: { $in: user.favorites } });

    res.json({ user, cocktails });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at addmusthave");
  }
});
router.put("/remove/favorites/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    let newFavoritesList = user.favorites;
    newFavoritesList = newFavoritesList
      .slice()
      .slice(0, newFavoritesList.indexOf(req.params.id))
      .concat(
        newFavoritesList.slice(newFavoritesList.indexOf(req.params.id) + 1)
      );
  
    user.favorites = newFavoritesList;

    await user.save();
    let cocktails = await Cocktail.find({ _id: { $in: user.favorites } });

    res.json({ user, cocktails });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at ingredient remove must have");
  }
});
router.get("/similar/:id", async (req, res) => {
  try {
    let cocktail = await Cocktail.findById(req.params.id)
    let ingredients = await Ingredient.find({ _id: { $in: cocktail.using2 }})
    let ids = ingredients.map(ing => ing.cocktails)
    let flat = [].concat.apply([], [].concat.apply([], ids));
    // flat = flat.filter(i => i !== req.params.id)
    let countObj = {}
    for(let i = 0; i < flat.length; i++) {
      const el = flat[i]
      if(el == req.params.id){
        continue
      }
      if(!countObj[el]) countObj[el] = 0
      countObj[el]++
    }
    let sorted = Object.keys(countObj).sort((a, b) => countObj[b] - countObj[a]).slice(0, 6)
    cocktails = await Cocktail.find({ _id: { $in: sorted } });

    res.json(cocktails)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at similar drinks");
    
  }
})
router.delete("/:id", async (req, res) => {
  try {
    await Cocktail.findOneAndRemove({_id: req.params.id})
    res.json({ msg: "artist was removed" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at similar drinks");
  }
})



module.exports = router;