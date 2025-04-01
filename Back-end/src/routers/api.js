const express = require('express');
const router = express.Router();
const getLiked = require('../controllers/Liked/Liked.js');




router.get('/liked', getLiked);


module.exports = router;