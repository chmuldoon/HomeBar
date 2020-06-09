const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Ingredient = require("../../models/Ingredient");
const User = require("../../models/User");
const Cocktail = require("../../models/Cocktail");

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

router.get('/shelf', auth, async(req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    
    let ingredients = await Ingredient.find({_id: { $in: user.ingredients }});
    let mustHave = await Ingredient.find({ _id: { $in: user.mustHave } });
    let ingObj = {}
    let mustObj = {}
    ingredients.forEach(i => ingObj[i._id] = i)
    mustHave.forEach((i) => (mustObj[i._id] = i));

    res.json({ingredients: ingObj, mustHave: mustObj})
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at ingredient add");
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


    let cocktails = await Cocktail.find({ _id: { $in: user.cocktails } });
    




    res.json({cocktails, user});
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
    if(user.mustHave.includes(req.params.id)){
      
      let newMustHaveList = user.mustHave;
      newMustHaveList = newMustHaveList
        .slice()
        .slice(0, newMustHaveList.indexOf(req.params.id))
        .concat(
          newMustHaveList.slice(
            newMustHaveList.indexOf(req.params.id) + 1
          )
        );
      user.mustHave = newMustHaveList
    }

    let newCocktailList = await CocktailService.listMaker(
      newIngredientsList,
      user.mustHave
    );

    user.ingredients = newIngredientsList;
    user.cocktails = newCocktailList;
    await user.save();
    
    let cocktails = await Cocktail.find({ _id: { $in: user.cocktails } });


    res.json({ cocktails, user });
  } catch (err) {
    console.error(err.message, "hey");
    res.status(500).send("server err at ingredient remove");
  }
});

router.put("/add/musthave/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    let newMustHaveList = user.mustHave.concat(req.params.id);
    //if ingredients does not include, then add 
    if(!user.ingredients.includes(req.params.id)){
      let newIngredientsList = user.ingredients.concat(req.params.id);
      user.ingredients = newIngredientsList

    }

    user.mustHave = newMustHaveList;

    let newCocktailList = await CocktailService.listMaker(
      user.ingredients,
      newMustHaveList
    );
    user.cocktails = newCocktailList;

    await user.save();

    let cocktails = await Cocktail.find({ _id: { $in: user.cocktails } });


    res.json({user, cocktails});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at addmusthave");
  }
})

router.put("/remove/musthave/:id", auth, async (req, res) => {
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
    let cocktails = await Cocktail.find({ _id: { $in: user.cocktails } });


    res.json({user, cocktails});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err at ingredient remove must have");
  }
});

router.put("/find/:id1/replace/:id2", async (req, res) => {
  try {
    let dom = await Ingredient.findById(req.params.id1)
    let sub = await Ingredient.findById(req.params.id2)
    let subCocktails = await Cocktail.find({ _id: { $in: sub.cocktails }})


    subCocktails.forEach(cocktail => {
      let idx = cocktail["using2"].indexOf(sub._id);
      cocktail.using2[idx] = dom._id
      cocktail.ingredients[idx] = dom.name
      cocktail.using[idx] = dom.name;
      cocktail.save()
    })
    // console.log(subCocktails)
    dom.cocktails = dom.cocktails.concat(sub.cocktails)
    await dom.save()
    await Ingredient.findByIdAndRemove(req.params.id2);
    let test = await Ingredient.find({_id: req.params.id2})
    res.json({dom, test})

  } catch (err) {
     console.error(err.message);
     res.status(500).send("server err");
  }
})

router.put("/fix/:name", async (req, res) => {
  try {
    let id = "5e9d51a29a6bb767c4002d01";
    let replacer = "5e9d51a19a6bb767c4002c02";
    let cocktail = await Cocktail.findOne({name: req.params.name});
    let idx = cocktail.using2.indexOf(id)
    cocktail.using2[idx] = "5e9d51a19a6bb767c4002c02";
    cocktail.ingredients[idx] = "Club Soda"
    cocktail.using[idx] = "club soda"

    let newUse2 = cocktail.using2
    let newIng =cocktail.ingredients
    let newUse = cocktail.using
    cocktail = await Cocktail.findOneAndUpdate(
      { name: req.params.name },
      {
        $set: {
          using2: cocktail.using2,
          ingredients: "Club Soda",
          using: "club soda",
        },
      },
      { new: false }
    );
  
 

    res.json({ cocktail });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
});

// router.delete("/destroy", async (req, res) => {
//   try {
    
//     await Ingredient.deleteMany({cocktails: {$size: 0}})
//     ingredients = await Ingredient.find({ cocktails: { $size: 0 } });
//     res.json(ingredients);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server err at ingredient remove must have");
//   }
// })

// router.get("/mostused", async (req, res) => {
//   try {
//     let ingredients = await Ingredient.find()
//     ingredients = ingredients.filter(i => i.cocktails.length > 30).map(i => i.name)
//     res.json(ingredients)
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server err at ingredient remove must have");
//   }
// })

module.exports = router;

