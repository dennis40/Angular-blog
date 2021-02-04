const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/db");

router.post("/reg", (req, res) => {
  const { name, email, login, password } = req.body;
  let newUser = new User({ name, email, login, password });
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: "User has not been added.",
      });
    } else {
      res.json({
        success: true,
        msg: "User has been added.",
      });
    }
  });
});

router.post("/auth", (req, res) => {
  const { login, password } = req.body;
  User.getUserByLogin(login, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({
        success: false,
        msg: "This user was not found",
      });
    }
    User.comparePass(password, user.password, (err, isMatch) => {
      if (err) {
        throw err;
      }
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 3600 * 24,
        });
        return res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            name: user.name,
            login: user.login,
            email: user.email,
          },
        });
      } else {
        return res.json({
          success: false,
          msg: "Password mismatch",
        });
      }
    });
  });
});

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Dashboard page");
  }
);

router.post(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { category, title, photo, text, author, date } = req.body;
    let newPost = new Post({ category, title, photo, text, author, date });
    Post.addPost(newPost, (err, post) => {
      if (err) {
        res.json({
          success: false,
          msg: "Post has not been added.",
        });
      } else {
        res.json({
          success: true,
          msg: "Post has been added.",
        });
      }
    });
  }
);

module.exports = router;
