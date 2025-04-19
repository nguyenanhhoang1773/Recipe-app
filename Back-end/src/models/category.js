const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Category = new Schema({
    image: { type: String },
    type: { type: String },
});

module.exports = mongoose.model('Category', Category);