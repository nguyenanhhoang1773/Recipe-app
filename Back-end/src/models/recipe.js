const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  id_recipe: String,
  title: String,
  image: String,
  type: String,
  duration: String,
  author: String,
  number_or_ingredients: Number,
  ingredients: String || [String],
  formula: String,
  description: String,
});
module.exports = mongoose.model("Recipe", RecipeSchema);
