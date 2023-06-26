require("dotenv").config();
require("./config/db");
require("express-async-errors");

const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

//Config API respond and can call to use
app.use(cors());
app.use(express.json());

//Config Route
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})