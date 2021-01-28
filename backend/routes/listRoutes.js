const express = require("express");
const listController = require("../controllers/listController");

const router = express.Router();

// get route to retrieve all lists
// can be used with query parameters
router.get("/", listController.getLists);

// create a new list
router.post("/", listController.createList);

// get the entires of a list
router.get("/:id", listController.getList);

// modify existing list (whether titles or entries)
router.put("/:id", listController.editList);

// delete a list
router.delete("/", listController.deleteList);

module.exports = router;
