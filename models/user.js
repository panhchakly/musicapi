const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    gender: { type: String, require: true },
    month: { type: String, require: true },
    date: { type: String, require: true },
    year: { type: String, require: true },
    likedSongs: { type: [String], default: [] },
    playlists: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false }
});

//create function
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, name: this.name, isAdmin: this.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    return token;
}

//validate schema
const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required(),
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
        month: Joi.string().required(),
        date: Joi.string().required(),
        year: Joi.string().required(),
        gender: Joi.string().valid("male", "female", "non-binary").required(),
    });
    return schema.validate(user);
}
const User = mongoose.model("user", userSchema);

module.exports = { User, validate }