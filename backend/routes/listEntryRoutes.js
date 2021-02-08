const express = require("express");
const listEntryController = require("../controllers/listEntryController");

const router = express.Router();

router.get("/:listId", listEntryController.getListEntries);
// create a new list
router.put("/", listEntryController.editEntry);

// modify existing list (whether titles or entries)
router.post("/", listEntryController.addEntry);

// delete a list
router.delete("/", listEntryController.deleteEntry);

module.exports = router;
