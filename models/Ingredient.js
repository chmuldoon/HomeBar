const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  cocktails: {
    type: [Schema.Types.ObjectId],
    ref: "cocktail",
  },
});


module.exports = mongoose.model("ingredient", IngredientSchema);
