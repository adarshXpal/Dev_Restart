const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner.model");


if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(503)
        .send("You don't have permission to create owner !!");
    }
    let { fullname, email, password } = req.body;
    let createOwner = await ownerModel.create({
      fullname,
      email,
      password
    });
    res.status(201).send(createOwner);
  });
}

router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success });
})

router.get("/", (req, res) => {
  res.send("Hey owner route is working !!");
});


module.exports = router;
