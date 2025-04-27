const Recipe = require("../../models/recipe");

const addRecipe = async (req, res) => {
  try {
    const {
      id_recipe,
      title,
      image,
      type,
      duration,
      author,
      number_or_ingredients,
      ingredients,
      formula,
      description,
    } = req.body;
    const recipe = new Recipe({
      id_recipe,
      title,
      image,
      type,
      duration,
      author,
      number_or_ingredients,
      ingredients,
      formula,
      description,
    });
    await recipe.save();
    console.log("Recipe saved!");
    res.status(201).json(recipe);
  } catch (error) {
    console.log("Recipe save fail");
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getRecipesWithType = async (req, res) => {
  try {
    const { type } = req.query; // Lấy type từ query param
    console.log("type:", type);
    if (!type) {
      return res.status(400).json({ message: "Type parameter is required" });
    }
    const recipes = await Recipe.find({ type: type });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const searchRecipes = async (req, res) => {
  try {
    const { textSearch } = req.query; // Lấy type từ query param
    if (!textSearch) {
      return res.status(400).json({ message: "Type parameter is required" });
    }
    const recipes = await Recipe.find({
      title: { $regex: textSearch, $options: "i" },
    });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { addRecipe, getRecipes, getRecipesWithType, searchRecipes };
