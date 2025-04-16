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
const searchItems = require("../controllers/Search/Search.js");
const { getPost, addPost, deletePost } = require('../controllers/Post/Post.js');

// ==== Router User ====
router.post("/login", login);
router.post("/getUser", getUser);
router.patch("/updateUser", updateUser);

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

module.exports = router;
