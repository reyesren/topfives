const express = require("express");
const usersController = require("../controllers/userController");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

const router = express.Router();

// get account details
// use query params to retrieve certain fields
router.get("/:id", usersController.getUser);

// get all accounts
// use query params to find certain accounts (search functionality)

router.get("/", (req, res, next) => {
  res.json({ message: "success retrieving accounts" });
});

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

// edit details of an account
router.patch("/:id/edit", (req, res, next) =>
  res.json({ message: "success editting" })
);

// router.get("/:id/subscribers", (req, res, next) =>
//   res.json({ message: "success getting subscribers" })
// );

module.exports = router;
