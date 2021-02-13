const mongoose = require("mongoose");
const List = require("../models/list");
const User = require("../models/user");
const ListEntry = require("../models/listEntry");

const getListEntries = async (req, res, next) => {
  let listId = req.params.listId;
  let existingList;

  try {
    existingList = await List.findById(listId).populate("entries");
  } catch (err) {
    console.log(err);
  }
  if (!existingList) {
    return next(new Error("This list doesn't exist"));
  }
  existingList.entries.sort(function (a, b) {
    return a.rank - b.rank;
  });
  let entries = [...existingList.entries];
  res.json(entries);
};
const addEntry = async (req, res, next) => {
  const {
    resource,
    resourceOrigin,
    resourceType,
    rank,
    description,
    list,
    name,
  } = req.body;
  let existingEntry;
  let parentList;
  let createdEntry;

  try {
    parentList = await List.findById(list).populate("entries");
  } catch (err) {
    return next(new Error("Something went wrong. Please try again later"));
  }
  if (!parentList) {
    return next(new Error("A parent list with this ID does not exist"));
  }
  if (parentList.entries === 5) {
    return next(new Error("Sorry, this already has your top fives"));
  }
  for (siblingEntry of parentList.entries) {
    if (siblingEntry.name === name) {
      return next(new Error("Sorry, that name is taken."));
    }
    if (siblingEntry.rank === rank) {
      return next(new Error("Sorry, that rank is taken"));
    }
  }
  let entry = new ListEntry({
    name,
    resource,
    resourceType,
    resourceOrigin,
    rank,
    description,
    name,
    list,
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    createdEntry = await entry.save({ session: sess });
    parentList.entries.push(createdEntry);
    await parentList.save({ session: sess });
    await sess.commitTransaction(); // only @ this point are the changes actually saved. if one thing fails, all operations are rolled back
  } catch (err) {
    console.log(err);
    return next(new Error("Sorry, something went wrong. Try again later."));
  }
  res.json(createdEntry);
};
const editEntry = async (req, res, next) => {
  const {
    _id: entryId,
    resource,
    resourceType,
    resourceOrigin,
    rank,
    description,
    list,
    name,
  } = req.body;
  let existingEntry;
  try {
    existingEntry = await ListEntry.findById(entryId);
  } catch (err) {
    return next(new Error("Something went wrong here."));
  }
  if (!existingEntry) {
    return next(new Error("An entry with thise ID does not exist"));
  }
  if (existingEntry.rank !== rank) {
    let list;
    try {
      list = await List.findById(existingEntry.list);
    } catch (err) {
      return next(new Error("Something went wrong. Please try again later"));
    }
    for (entry of list.entries) {
      try {
        let siblingEntry = await ListEntry.findById(entry);
        if (siblingEntry.rank === rank) {
          return next(new Error("Sorry, that rank is taken."));
        }
      } catch (err) {
        return next(new Error("Something went wrong"));
      }
    }
    existingEntry.rank = rank;
  }
  if (existingEntry.resource !== resource) {
    existingEntry.resource = resource;
  }
  if (existingEntry.resourceType !== resourceType) {
    existingEntry.resourceType = resourceType;
  }
  if (existingEntry.resourceOrigin) {
    if (existingEntry.resourceOrigin !== resourceOrigin) {
      existingEntry.resourceOrigin = resourceOrigin;
    }
  }
  if (existingEntry.name !== name) {
    existingEntry.name = name;
  }
  if (existingEntry.description !== description) {
    existingEntry.description = description;
  }
  try {
    await existingEntry.save();
  } catch (err) {
    return next(new Error("Something went wrong"));
  }
  res.json(existingEntry);
};

const deleteEntry = async (req, res, next) => {
  const { _id: entryId, list } = req.body;
  let existingEntry;
  let parentList;
  try {
    existingEntry = await ListEntry.findById(entryId);
  } catch (err) {
    return next(new Error("Something went wrong here."));
  }
  if (!existingEntry) {
    return next(new Error("An entry with thise ID does not exist"));
  }
  try {
    parentList = await List.findById(list);
  } catch (err) {
    return next(new Error("Something went wrong. Please try again later"));
  }
  if (!parentList) {
    return next(new Error("A parent list with this ID does not exist"));
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await existingEntry.remove({ session: sess });
    parentList.entries.pull(existingEntry._id);
    await parentList.save({ session: sess });
    await sess.commitTransaction(); // only @ this point are the changes actually saved. if one thing fails, all operations are rolled back
  } catch (err) {
    console.log(err);
    return next(new Error("Sorry, something went wrong. Try again later."));
  }
  res.json({ message: "deleted" });
};

module.exports = {
  getListEntries,
  addEntry,
  editEntry,
  deleteEntry,
};
