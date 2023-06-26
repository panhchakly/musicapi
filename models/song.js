const mongoose = require("mongoose");
const Joi = require("joi");

const songSchema = new mongoose.Schema({
    name: { type: String, require: true },
    artist: { type: String, require: true },
    song: { type: String, require: true },
    img: { type: String, require: true },
    duration: { type: String, require: true }
});

//validate
const validate = (song) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        artist: Joi.string().required(),
        song: Joi.string().required(),
        img: Joi.string().required(),
        duration: Joi.number().required(),
    });
    return schema.validate(song);
}

const Song = mongoose.model("song", songSchema);
module.exports = { Song, validate }