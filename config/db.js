const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log("Connected to database successfully.");
    } catch (error) {
        console.log("Could not connect to database!");

    }
}
module.exports = connection();