const express = require("express");

const router = express.Router();

router.get("/:id", (req, res, next) =>
  res.json({ message: "success getting account" })
);
router.post("/signup", (req, res, next) =>
  res.json({ message: "success creating" })
);
router.post("/login", (req, res, next) =>
  res.json({ message: "success logging in" })
);
router.put("/:id/edit", (req, res, next) =>
  res.json({ message: "success editting" })
);
router.get("/:id/subscribers", (req, res, next) =>
  res.json({ message: "success getting subscribers" })
);

module.exports = router;
