const express = require('express');
const router = express.Router();
const Detail = require('../controllers/detail');




router.get('/test', Detail);


module.exports = router;