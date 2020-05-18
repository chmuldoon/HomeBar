const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Cocktail = require('../../models/Cocktail')

//get all cocktails
//public
//testing

router.get('/', async (req, res) => {
  try {
    const cocktails = await Cocktail.find()

    res.json(cocktails)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server err");
  }
})

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

module.exports = router;