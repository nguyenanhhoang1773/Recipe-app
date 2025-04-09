const express = require('express');
const router = express.Router();
const { getLiked, addLiked, unLiked } = require('../controllers/Liked/Liked.js');
const { getFeedback, addFeedback } = require('../controllers/Feedback/Feedback.js');
const searchItems = require('../controllers/Search/Search.js');
const { getProfile, createProfile, updateProfile } = require('../controllers/Profile/profile.js');

// router liked
router.get('/liked/:id_user', getLiked);
router.post('/addLiked', addLiked);
router.delete('/unLiked', unLiked);


// router feedback
router.post('/getFeedback', getFeedback);
router.post('/addFeedback', addFeedback);

//router Search
router.post('/search', searchItems)

//router profile
router.get('/profile/:id_user', getProfile);
router.post('/profile', createProfile);
router.put('/profile/:id_user', updateProfile);

module.exports = router;