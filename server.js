const express = require("express");
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/db");

//load config
dotenv.config({ path: "./config/config.env" });
//Database Connected
connectDB();
//App setup
const app = express();
//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//BodyParser
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
