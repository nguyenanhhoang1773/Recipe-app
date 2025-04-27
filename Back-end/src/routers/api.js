const express = require("express");
const router = express.Router();

// ==== Controllers ====
const {
  getLiked,
  addLiked,
  unLiked,
} = require("../controllers/Liked/Liked.js");
const {
  getFeedback,
  addFeedback,
} = require("../controllers/Feedback/Feedback.js");
const { login, updateUser, getUser } = require("../controllers/User/User.js");
const {
  getCategory,
  addCategory,
} = require("../controllers/Category/Category.js");
const searchItems = require("../controllers/Search/Search.js");
const {
  addRecipe,
  getRecipes,
  getRecipesWithType,
  searchRecipes,
} = require("../controllers/Recipe/Recipe.js");
//router Recipes

const {
  updateRecipe,
  getMyRecipes,
  deleteRecipe,
} = require("../controllers/Recipe/Recipe.js");

// ==== Router User ====
router.post("/login", login);
router.post("/getUser", getUser);
router.post("/updateUser", updateUser);

// ==== Router Recipe ====
router.post("/addRecipe", addRecipe);
router.get("/getRecipes", getRecipes);
router.put("/updateRecipe", updateRecipe);
router.post("/getMyRecipes", getMyRecipes);
router.delete("/deleteRecipe", deleteRecipe);
router.get("/getRecipesWithType", getRecipesWithType);
router.get("/searchRecipes", searchRecipes);

// ==== Router Category ====
router.get("/getCategory", getCategory);
router.post("/addCategory", addCategory);

// ==== Router Liked ====
router.get("/liked/:id_user", getLiked);
router.post("/addLiked", addLiked);
router.post("/unLiked", unLiked);

// ==== Router Feedback ====
router.post("/getFeedback", getFeedback);
router.post("/addFeedback", addFeedback);

// ==== Router Search ====
router.post("/search", searchItems);

module.exports = router;
