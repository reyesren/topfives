const express = require("express");
const usersController = require("../controllers/userController");

const router = express.Router();

// get all accounts
// use query params to find certain accounts (search functionality)
router.get("/", (req, res, next) => {
  res.json({ message: "success retrieving accounts" });
});

// get account details
// use query params to retrieve certain fields
router.get("/:id", (req, res, next) =>
  res.json({ message: "success getting account" })
);
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
