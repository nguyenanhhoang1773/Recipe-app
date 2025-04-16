const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Feedback = new Schema({
    user_name: { type: String },
    id_recipe: { type: String },
    text: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Feedback', Feedback);