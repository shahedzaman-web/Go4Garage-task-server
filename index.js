const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ObjectID = require("mongodb").ObjectID;
const port = process.env.PORT || 4001;
require("dotenv").config();
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kljii.mongodb.net/project2?retryWrites=true&w=majority`;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected!"))
  .catch((error) => console.log(error));
const { User } = require("./Model/user");
const { Vendor } = require("./Model/vendor");
const { ProductList } = require("./Model/productList");
app.use(bodyParser.json());

app.post("/vendor/addProduct", (req, res) => {
  var productList = new ProductList({
    Title: req.body.Title,
    Description: req.body.Description,
    Price: req.body.Price,
  }).save((err, response) => {
    if (err) res.status(201).send(err);
    res.status(201).send(response);
  });
});
app.get("/vendor/list", function (req, res) {
  ProductList.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/user/register", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  }).save((err, response) => {
    if (err) res.status(400).send(err);
    res.status(200).send(response);
  });
});

app.post("/user/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) res.json({ message: "invalid credentials" });
      else {
        user.comparePassword(
          req.body.password,

          (err, isMatch) => {
            if (err) return console.log(err);
            else if (!isMatch) {
              return res.status(202).json({ message: "Invalid credentials" });
            } else res.status(201).json({ message: "success login" });
          }
        );
      }
    })

    .catch((error) => {
      res.status(500).json(error);
    });
});

app.post("/vendor/register", (req, res) => {
  const vendor = new Vendor({
    email: req.body.email,
    password: req.body.password,
  }).save((err, response) => {
    if (err) res.status(400).send(err);
    res.status(200).send(response);
  });
});

app.post("/vendor/login", (req, res) => {
  Vendor.findOne({ email: req.body.email })
    .then((vendor) => {
      if (!vendor) res.json({ message: "invalid credentials" });
      else {
        vendor.comparePassword(
          req.body.password,

          (err, isMatch) => {
            if (err) return console.log(err);
            else if (!isMatch) {
              return res.status(202).json({ message: "Invalid credentials" });
            } else res.status(201).json({ message: "success login" });
          }
        );
      }
    })

    .catch((error) => {
      res.status(500).json(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
