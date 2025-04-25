const Recipe = require("../../models/recipe");

// Thêm công thức
const addRecipe = async (req, res) => {
  try {
    const {
      id_recipe,
      id_user,
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
      id_user,
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
    res.status(201).json({ status: true, recipe });
  } catch (error) {
    res.status(500).json({ message: "Thêm công thức thất bại", error: error.message });
  }
};

// Lấy tất cả công thức
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ _id: -1 });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyRecipes = async (req, res) => {
  try {
    const { id_user } = req.body;
    const recipes = await Recipe.find({ id_user }).sort({ _id: -1 });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy công thức cá nhân", error: err.message });
  }
};

// Cập nhật công thức
const updateRecipe = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const updated = await Recipe.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ status: true, recipe: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: "Cập nhật thất bại", error: err.message });
  }
};

// Xoá công thức
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.body;
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Xoá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Xoá thất bại", error: err.message });
  }
};

module.exports = {
  addRecipe,
  getRecipes,
  updateRecipe,
  getMyRecipes,
  deleteRecipe,
};
