const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const productModel = require("../models/product.model");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      textcolor,
      panelcolor,
    });
    req.flash("success", "Product created sucessfully");
    res.redirect("/owners/admin");
  }
  catch (err) {
    res.send(err.message);
  }
});

router.get("/", (req, res) => {
  res.send("Hey Product route is working !!");
});

module.exports = router;
