const express = require("express");
const { check, validationResult } = require("express-validator");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("./login");
});

app.post(
  "/login",
  [
    check("username", "Email error").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors);
    else {
      const username = req.body.username;
      res.json({
        username: username,
      });
    }
  }
);

app.listen(3000);
