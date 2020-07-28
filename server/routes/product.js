const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middlewares/auth");
const { Product } = require("../models/Product");

let storage;

let upload;

router.post("/uploadImage", auth, (req, res) => {
  // after getting that image from client we need to save it inside node server
  // Multer library
});

router.post("/uploadProduct", auth, (req, res) => {
  // save all the data we got from the client into the DB
});

router.post("/getProducts", (req, res) => {
  Product.find((err, products) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, products });
  });
});

module.exports = router;
