const express = require("express");
const router = express.Router();

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
const { getCategory, addCategory } = require("../controllers/Category/Category.js");
const searchItems = require("../controllers/Search/Search.js");
const { getPost, addPost, deletePost, updatePost} = require('../controllers/Post/Post.js');

// ==== Router User ====
router.post("/login", login);
router.post("/getUser", getUser);
router.post("/updateUser", updateUser);

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

// ==== Router Post ====
router.post("/getPost", getPost);
router.post("/addPost", addPost);
router.delete("/deletePost", deletePost);
router.put("/updatePost", updatePost);

module.exports = router;
