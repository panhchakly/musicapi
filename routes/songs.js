const router = require("express").Router();
const { User } = require("../models/user");
const { Song, validate } = require("../models/song");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const validObjectId = require("../middleware/validObjectId");

//Create Song
router.post("/", isAdmin, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const song = await Song(req.body).save();
    res.status(201).send({ data: song, message: "Song created successfully" });

});

// Get all song
router.get("/", async (req, res) => {
    const songs = await Song.find();
    res.status(200).send({ data: songs });
});

// Update Song

