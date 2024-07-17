const mongoose = require("mongoose");
const List = require("../models/list");
const User = require("../models/user");
const ListEntry = require("../models/listEntry");
const list = require("../models/list");

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

const getList = async (req, res, next) => {
  let listId = req.params.id;
  let existingList;

  try {
    existingList = await List.findById(listId).populate("entries");
  } catch (err) {
    console.log(err);
  }
  if (!existingList) {
    return next(new Error("This list doesn't exist"));
  }

  res.json(existingList);
};

const getLists = async (req, res, next) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  const listTitle = req.query.listTitle
    ? {
        listTitle: {
          $regex: req.query.listTitle, // this allows us to search without being exactly correct .iph will give us iphone results
          $options: "i", // case insensitive
        },
      }
    : {};
  let users = [];
  const count = await List.countDocuments({ ...listTitle });
  try {
    lists = await List.find({ ...listTitle })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  } catch (err) {
    return next(new Error("Something unexpected happened. Try again later."));
  }
  if (lists.length === 0) {
    return next(new Error("There are no lists with that title"));
  }
  res.json({ lists, page, pages: Math.ceil(count / pageSize) });
};

const createList = async (req, res, next) => {
  const { listTitle, listType, description, listItems } = req.body;
  let existingList;
  let existingUser;

  try {
    existingUser = await User.findById(req.userId, "-password");
  } catch (err) {
    return next(new Error("Something went wrong"));
  }
  if (!existingUser) {
    return next(new Error("User doesn't exist"));
  }

  let createdList = new List({
    listTitle: listTitle,
    listType: "default",
    creator: req.userId,
    description: description,
    entries: [],
  });
  createdList = await createdList.save();
  await User.findByIdAndUpdate(
    req.userId,
    { $push: { lists: createdList._id } },
    { new: true }
  );
  res.status(201).json(createdList);
  // if (listItems.length === 0) {
  //   try {
  //     await createdList.save();
  //     res.json({ message: "did it" });
  //   } catch (err) {
  //     return next(new Error("Something went wrong"));
  //   }
  // }
  // await createdList.save();

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();

  //   for (let item of listItems) {
  //     let listEntry = new ListEntry({
  //       ...item,
  //       list: createdList._id,
  //     });
  //     let responseTwo = await listEntry.save({ session: sess });
  //     createdList.entries.push(responseTwo);
  //   }
  //   createdList = await createdList.save({ session: sess });

  //   existingUser.lists.push(createdList);
  //   await existingUser.save({ session: sess });

  //   await sess.commitTransaction(); // only @ this point are the changes actually saved. if one thing fails, all operations are rolled back
  // } catch (err) {
  //   return next(err);
  // }
  // /*final = await List.findById(createdList._id);
  // console.log(final);*/
};

const editList = async (req, res, next) => {
  let listId = req.params.id;
  let existingList;
  const { listTitle, listType, listItems } = req.body;

  try {
    existingList = await List.findById(listId);
  } catch (err) {
    console.log(err);
  }
  if (!existingList) {
    return next(new Error("This list doesn't exist"));
  }
  console.log(listItems);
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    for (let item of listItems) {
      let entry = await ListEntry.findOne({ list: listId, name: item.label });
      entry.name = item.label;
      entry.rank = Number(item.value);
      await entry.save({ session: sess });
    }
    existingList.listTitle = listTitle;
    existingList.listType = listType;
    await existingList.save({ session: sess });

    await sess.commitTransaction(); // only @ this point are the changes actually saved. if one thing fails, all operations are rolled back
  } catch (err) {
    console.log(err);
    return next(new Error("Something went wrong"));
  }

  res.json(existingList);
};

const deleteList = async (req, res, next) => {
  let { _id: listId, creator } = req.body;
  console.log(listId);
  let existingList;
  let existingUser;

  try {
    existingUser = await User.findById(creator, "-password");
  } catch (err) {
    return next(new Error("Something went wrong"));
  }
  if (!existingUser) {
    return next(new Error("User doesn't exist"));
  }

  try {
    existingList = await List.findById(listId);
  } catch (err) {
    console.log(err);
  }
  if (!existingList) {
    return next(new Error("This list doesn't exist"));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    for (let item of existingList.entries) {
      let listEntry = await ListEntry.findById(item);
      await listEntry.remove();
    }
    await existingUser.lists.pull(listId);
    await existingUser.save({ session: sess });
    await existingList.remove({ session: sess });

    await sess.commitTransaction(); // only @ this point are the changes actually saved. if one thing fails, all operations are rolled back
  } catch (err) {
    return next(err);
  }
  res.json({ message: "deleted" });
};
module.exports = {
  getLists,
  createList,
  getList,
  editList,
  deleteList,
};
