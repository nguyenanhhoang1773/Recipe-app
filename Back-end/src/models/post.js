const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  id_user: { type: String, required: true },
  userName: { type: String },
  userAvatar: { type: String },
  name: { type: String },
  description: { type: String },
  ingredients: { type: String },
  instructions: { type: String },
  id_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", 
    required: true,
  },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
