const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});
// handle register
router.post("/register", (req, res) => {
  // console.log(req.body);
  // res.send("hello");
  const { name, email, password, password2 } = req.body;
  let error = [];

  //required feilds
  if (!name || !email || !password || !password2) {
    error.push({ msg: "Please fill all the feilds" });
  }

  //check Password
  if (password !== password2) {
    error.push({ msg: "Passwword didn't matched" });
  }

  //check password lenght
  if (password.length < 6) {
    error.push({ msg: "password must be of more than 6 characters" });
  }

  if (error.length > 0) {
    res.render("register", {
      error,
      name,
      email,
      password,
      password2,
    });
  } else {
    res.send("All Good!!!");
  }
});

module.exports = router;
