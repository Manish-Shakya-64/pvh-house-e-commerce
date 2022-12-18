const express = require("express");
const product = require("./routes/productRoute");
const errormiddleware = require("./middleware/error");
const user = require("./routes/userRoute");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", product);
app.use("/api/v1", user);

//middleware for error
app.use(errormiddleware);

module.exports = app;
