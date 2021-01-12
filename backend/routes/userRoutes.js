const express = require("express");
const usersController = require("../controllers/userController");

const router = express.Router();

router.get("/:id", (req, res, next) =>
  res.json({ message: "success getting account" })
);
router.post("/signup", usersController.signup);
// router.post("/login", (req, res, next) =>
//   res.json({ message: "success logging in" })
// );
router.post("/login", usersController.login);
router.put("/:id/edit", (req, res, next) =>
  res.json({ message: "success editting" })
);
router.get("/:id/subscribers", (req, res, next) =>
  res.json({ message: "success getting subscribers" })
);

module.exports = router;
