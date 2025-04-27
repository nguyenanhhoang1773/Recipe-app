const Recipe = require("../../models/recipe");
const Feedback = require("../../models/feedback");

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

    // Kiểm tra dữ liệu đầu vào
    if (!title || !ingredients || !formula || !description) {
      return res.status(400).json({ message: "Thiếu thông tin công thức" });
    }

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

// Lấy tất cả công thức (kèm feedbackCount)
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ _id: -1 });

    if (recipes.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy công thức nào" });
    }

    const recipesWithFeedback = await Promise.all(
      recipes.map(async (recipe) => {
        const feedbackCount = await Feedback.countDocuments({ id_recipe: recipe.id_recipe });
        return {
          ...recipe.toObject(),
          feedbackCount,
        };
      })
    );

    res.status(200).json(recipesWithFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Lấy công thức theo loại (type)
const getRecipesWithType = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({ message: "Type parameter is required" });
    }

    const recipes = await Recipe.find({ type });

    if (recipes.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy công thức nào cho loại này" });
    }

    const recipesWithFeedback = await Promise.all(
      recipes.map(async (recipe) => {
        const feedbackCount = await Feedback.countDocuments({ id_recipe: recipe.id_recipe });
        return {
          ...recipe.toObject(),
          feedbackCount,
        };
      })
    );

    res.status(200).json(recipesWithFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Tìm kiếm công thức
const searchRecipes = async (req, res) => {
  try {
    const { textSearch } = req.query;
    if (!textSearch) {
      return res.status(400).json({ message: "Text search parameter is required" });
    }

    const recipes = await Recipe.find({
      title: { $regex: textSearch, $options: "i" },
    });

    if (recipes.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy công thức nào" });
    }

    const recipesWithFeedback = await Promise.all(
      recipes.map(async (recipe) => {
        const feedbackCount = await Feedback.countDocuments({ id_recipe: recipe.id_recipe });
        return {
          ...recipe.toObject(),
          feedbackCount,
        };
      })
    );

    res.status(200).json(recipesWithFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Lấy công thức cá nhân (theo user)
const getMyRecipes = async (req, res) => {
  try {
    const { id_user } = req.body;
    const recipes = await Recipe.find({ id_user }).sort({ _id: -1 });

    if (recipes.length === 0) {
      return res.status(404).json({ message: "Không có công thức nào" });
    }

    const recipesWithFeedback = await Promise.all(
      recipes.map(async (recipe) => {
        const feedbackCount = await Feedback.countDocuments({ id_recipe: recipe.id_recipe });
        return {
          ...recipe.toObject(),
          feedbackCount,
        };
      })
    );

    res.status(200).json(recipesWithFeedback);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy công thức cá nhân", error: err.message });
  }
};

// Cập nhật công thức
const updateRecipe = async (req, res) => {
  try {
    const { id, ...data } = req.body;

    // Kiểm tra xem công thức có tồn tại không
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Công thức không tồn tại" });
    }

    const updated = await Recipe.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ status: true, recipe: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: "Cập nhật thất bại", error: err.message });
  }
};

// Xóa công thức
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.body;

    // Kiểm tra xem công thức có tồn tại không
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Công thức không tồn tại" });
    }

    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Xoá thành công" });
  } catch (err) {
    res.status(500).json({ message: "Xoá thất bại", error: err.message });
  }
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipesWithType,
  searchRecipes,
  updateRecipe,
  getMyRecipes,
  deleteRecipe,
};
