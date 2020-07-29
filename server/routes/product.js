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
    let ext = path.extname(file.originalname);
    if (ext !== ".png" || ext !== ".jpg") {
      return cb(new Error("Only images are allowed"), false);
    }
    cb(null, true);
  }
});

let upload = multer({ storage }).single("file");

router.post("/uploadImages", auth, (req, res) => {
  // after getting that image from client we need to save it inside node server
  // Multer library
  upload(req, res, err => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({
      success: true,
      fileName: res.req.file.filename,
      image: res.req.file.path
    });
  });
});

router.post("/uploadProduct", auth, (req, res) => {
  // save all the data we got from the client into the DB
  let product = new Product(req.body);

  product.writer = req.user._id;
  // console.log("product:", product);

  product.save((err, product) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

// SELECT * FROM BOARD ORDER BY moddate DESC limit startPage,15
// Board.find({})
// .sort({'moddate':-1})
// .skip(startPage)
// .limit(15)
// .exec(function(err, boardList){});

router.post("/getProducts", (req, res) => {
  let sort = req.body.sort ? req.body.sort : "_id";
  let orderBy = req.body.orderBy ? req.body.orderBy : -1;
  let skip = req.body.skip ? req.body.skip : 0;
  let limit = req.body.limit ? req.body.limit : 0;
  let conditions = {};
  // filters, category
  console.log(req.body.filters);
  if (req.body.filters) {
    for (const [key, value] of Object.entries(req.body.filters)) {
      if (value.length > 0) {
        if (key === "continents") {
          conditions[key] = { $in: value };
        } else if (key === "price") {
          // [280, 299]
          conditions[key] = {
            $gte: value[0],
            $lte: value[1]
          };
        }
      }
    }
  }
  console.log(req.body, conditions);
  // MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});
  Product.find(conditions)
    .sort({ [sort]: orderBy })
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, products });
    });
});

module.exports = router;
