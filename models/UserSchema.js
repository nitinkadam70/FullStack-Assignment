const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    username: { type: String, require: true, unique: [true, "username already present"] },
    email: { type: String, require: true },
    password: { type: String, require: true },
})

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;