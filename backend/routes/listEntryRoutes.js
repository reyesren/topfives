const express = require("express");
const listEntryController = require("../controllers/listEntryController");

const router = express.Router();

// get route to retrieve all lists
// can be used with query parameters
/*router.get("/:id", (req, res, next) =>
  res.json({ message: "success retrieving all lists" })
);*/

// create a new list
router.put("/", listEntryController.editEntry);

// modify existing list (whether titles or entries)
router.post("/", listEntryController.addEntry);

// delete a list
// router.delete("/", listControllerEntry.deleteList);

module.exports = router;
