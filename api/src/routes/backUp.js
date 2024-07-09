const { Router } = require("express");
const { Product, Type, Waist, Genre, User } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { products, types, waists, genres, users } = req.body;

  try {
    let backUpData = {};

    if (products) backUpData.products = await Product.findAll();
    if (types) backUpData.types = await Type.findAll();
    if (waists) backUpData.waists = await Waist.findAll();
    if (genres) backUpData.genres = await Genre.findAll();
    if (users) backUpData.users = await User.findAll();

    const filename = "backup.json";
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.status(200).json(backUpData);
  } catch (error) {
    console.log("Error durante el backUp: ", error);
    res.status(400).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
