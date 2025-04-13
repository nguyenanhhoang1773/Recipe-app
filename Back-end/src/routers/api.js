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
const { login } = require("../controllers/User/User.js");
const searchItems = require("../controllers/Search/Search.js");
const { createPost } = require('../controllers/Post/Post');

//router User
router.post("/login", login);

// router liked
router.get("/liked/:id_user", getLiked);
router.post("/addLiked", addLiked);
router.delete("/unLiked", unLiked);

// router feedback
router.post("/getFeedback", getFeedback);
router.post("/addFeedback", addFeedback);

//router Search
router.post("/search", searchItems);

//  router Post
router.post("/create-post", createPost);

module.exports = router;
