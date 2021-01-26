const mongoose = require("mongoose");
const List = require("../models/list");
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
  // console.log(listItems);
  try {
    // existingList = await List.find({ listTitle: listTitle });
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
    } catch (err) {}
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    let response = await createdList.save({ session: sess });
    // console.log(response);
    listItems.forEach(async (item) => {
      let listEntry = new ListEntry({
        ...item,
        list: response._id,
      });
      let responseTwo = await listEntry.save();

      createdList.entries.push(responseTwo);
      // console.log(createdList.entries);
      // let responseThree = await createdList.save();
      let responseThree = await List.updateOne(
        { _id: createdList._id },
        { entries: createdList.entries }
      );
      //console.log(listEntry);
      // console.log(responseThree);
    });

    /*listItems.forEach(async (entry) => {
      let listEntry = new ListEntry({
        ...entry,
      });
      if (!listEntry) {
        return next(new Error("Something went wrong. Please try again"));
      }
      try {
        await listEntry.save();
      } catch (err) {
        return next(new Error("Something went wrong here. Please try again"));
      }
    });*/
    await sess.commitTransaction(); // only @ this point are the changes actually saved. if one thing fails, all operations are rolled back
  } catch (err) {
    return next(err);
  }
  res.json({ message: "success.." });
};

module.exports = {
  createList: createList,
};
