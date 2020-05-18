const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CocktailSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  glass: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  measurements: {
    type: [String],
    required: true,
  },
  using: {
    type: [String],
    required: true,
  },
  using2: {
    type: [Schema.Types.ObjectId],
    ref: "ingredient",
  },
  photo: {
    type: String,
    required: true,
  },
});

CocktailSchema.statics.findIngredients = function (id) {
  return this.findById(id)
    .populate("using2")
    .then((cocktail) => cocktail.using2);
};

module.exports = mongoose.model("cocktail", CocktailSchema);
