const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middlewares/auth");
const { Product } = require("../models/Product");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".gif") {
      return cb(res.status(400).end("Only images are allowed"), false);
    }
    cb(null, true);
  }
});

let upload = multer({ storage }).single("file");

router.post("/uploadImage", auth, (req, res) => {
  // after getting that image from client we need to save it inside node server
  // Multer library
  upload(req, res, err => {
    if (err) if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({
      success: true,
      image: res.req.file.path
    });
  });
});

router.post("/uploadProduct", auth, (req, res) => {
  // save all the data we got from the client into the DB
  const product = new Product(req.body);
  product.writer = req.user._id;

  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/getProducts", (req, res) => {
  let skip = req.body.skip ? req.body.skip : 0;
  let limit = req.body.limit ? req.body.limit : 0;

  // filters
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  // console.log(findArgs);
  // { continents: [ 3, 4 ], price: [] }

  Product.find(findArgs)
    .populate("writer")
    .sort([["_id", "desc"]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, products });
    });
});

module.exports = router;
