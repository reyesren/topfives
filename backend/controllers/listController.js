const mongoose = require("mongoose");
const List = require("../models/list");
const User = require("../models/user");
const ListEntry = require("../models/listEntry");

/*
// Inputs: listTItle, listType, entries, id

// If a LIST with that listTitle already exists, return error saying a list with that title already exists.
// Otherwise create an object containing the necessary properties
    // listTitle: listTitle, listType: listType, id: req.params.id, entries: []
// if(entries.length === 0)
    // create new list.
// else
    // create a session
        // start transaction
        // create a new List aka createdList. returns the ID
        // go find the List
        // loop through entries array. for each,
            // create a new listItem object aka name, resource, resourceOrigin, etc
            // modify the entries property on List. push it. save.
            // create new ListItem.save().

*/

const getList = async (req, res, next) => {};

const createList = async (req, res, next) => {
  // console.log("hi");
  const { listTitle, listType, creator, listItems } = req.body;
  let existingList;
  let existingUser;
  let final;

  try {
    existingUser = await User.findById(creator, "-password");
  } catch (err) {
    return next(new Error("Something went wrong"));
  }
  if (!existingUser) {
    return next(new Error("User doesn't exist"));
  }
  try {
    existingList = await List.findOne({ listTitle: listTitle });
  } catch (err) {
    return next(new Error("Something went wrong"));
  }
  if (existingList) {
    return next(new Error("This list already exists"));
  }

  let createdList = new List({
    listTitle: listTitle,
    listType: listType,
    creator: creator,
    entries: [],
  });
  if (listItems.length === 0) {
    try {
      await createdList.save();
      res.json({ message: "did it" });
    } catch (err) {
      return next(new Error("Something went wrong"));
    }
  }
  // await createdList.save();

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    for (let item of listItems) {
      let listEntry = new ListEntry({
        ...item,
        list: createdList._id,
      });
      let responseTwo = await listEntry.save({ session: sess });
      createdList.entries.push(responseTwo);
    }
    createdList = await createdList.save({ session: sess });

    existingUser.lists.push(createdList);
    await existingUser.save({ session: sess });

    await sess.commitTransaction(); // only @ this point are the changes actually saved. if one thing fails, all operations are rolled back
  } catch (err) {
    return next(err);
  }
  /*final = await List.findById(createdList._id);
  console.log(final);*/

  res.json(createdList);
};

module.exports = {
  createList: createList,
};
