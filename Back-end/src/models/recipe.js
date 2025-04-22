const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  id_recipe: String,
  title: String,
  image: String,
  duration: Number,
  author: String,
  number_or_ingredients: Number,
  formula: String,
  description: String,
});
module.exports = mongoose.model("Recipe", RecipeSchema);
