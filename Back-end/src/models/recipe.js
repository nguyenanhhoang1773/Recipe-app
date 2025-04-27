const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  id_recipe: String,
  id_user: { type: String, required: true },
  title: String,
  image: String,
  type: { type: [String] },
  duration: String,
  author: String,
  number_or_ingredients: Number,
  ingredients: { type: [String] },
  formula: String,
  description: String,
});
module.exports = mongoose.model("Recipe", RecipeSchema);