const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Liked = new Schema({
    idUser: { type: String },
    idProduct: { type: String },
    name: { type: String },
    image: { type: String },
    quantity: { type: Number },
    realPrice: { type: Number },
    createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Liked', Liked);