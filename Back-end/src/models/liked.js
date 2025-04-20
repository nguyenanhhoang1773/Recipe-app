const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Liked = new Schema({
    id_user: { type: String },
    id_recipe: { type: String },
    name: { type: String },
    image: { type: String },
    description: { type: String },
    ingredients: { type: String },
    instructions: { type: String },
    createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Liked', Liked);