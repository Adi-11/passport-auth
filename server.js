const express = require("express");
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/db");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//App setup
const app = express();

//passport config
require("./config/passport")(passport);

//load config
dotenv.config({ path: "./config/config.env" });

//Database Connected
connectDB();

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//BodyParser
app.use(express.urlencoded({ extended: false }));

//Express sessions
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect Flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

//POrt setup
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
