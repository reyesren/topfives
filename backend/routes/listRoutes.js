const express = require("express");
const listController = require("../controllers/listController");

const router = express.Router();

// get route to retrieve all lists
// can be used with query parameters
router.get("/", (req, res, next) =>
  res.json({ message: "success retrieving all lists" })
);

// create a new list
router.post("/", (req, res, next) =>
  res.json({ message: "Success creating a new list" })
);

// get the entires of a list
router.get("/:id", (req, res, next) =>
  res.json({ message: "success retrieving list data" })
);

// modify existing list (whether titles or entries)
router.patch("/:id", (req, res, next) =>
  res.json({ message: "success editting" })
);

// delete a list
router.delete("/:id", (req, res, next) =>
  res.json({ message: "success deleting list" })
);

module.exports = router;
