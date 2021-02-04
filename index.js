const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const config = require("./config/db");
const account = require("./routes/account");
const Post = require("./models/post");

const app = express();

const PORT = 3000;

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use(cors());

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Successful connection to the database");
});
mongoose.connection.on("error", (error) => {
  console.log("Not successful connection to the database", error);
});

app.listen(PORT, () => {
  console.log("Listening server on port", PORT);
});

app.get("/", (req, res) => {
  Post.find().then((posts) => res.json(posts));
});

app.get("/post/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id).then((post) => res.json(post));
});

app.delete(
  "/post/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id } = req.params;
    Post.deleteOne({ _id })
      .then((err) => {
        return res.json({
          success: true,
          msg: "Post deleted ",
        });
      })
      .catch((err) => {
        return res.json({
          success: false,
          msg: "This post was not found",
        });
      });
  }
);

app.use("/account", account);
