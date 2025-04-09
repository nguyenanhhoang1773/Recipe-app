const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Profile = new Schema({
    id_user: { type: String },
    avatar: { type: String },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Profile", Profile);
