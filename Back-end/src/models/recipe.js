const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  type: String,
  duration: Number,
  author: String,
  number_or_ingredients: Number,
  formula: String,
  description: String,
});
module.exports = mongoose.model("Recipe", RecipeSchema);
