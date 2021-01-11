const User = require("../models/user");

const signup = async (req, res, next) => {
  const {
    name,
    username,
    password,
    email,
    bio,
    subscriptions,
    lists,
    image,
  } = req.body;
  const createdUser = new User({
    name,
    password,
    email,
    username,
    bio,
    subscriptions,
    lists,
    image,
  });
  // console.log(username);
  let existingUser;
  try {
    existingUser = await User.find({
      email: { $regex: new RegExp("^" + email.toLowerCase(), "i") },
    });
  } catch (err) {
    return next(new Error("Sorry, something went wrong!"));
  }
  // console.log(`first existing user: ${existingUser}`);
  if (existingUser.length > 0) {
    return next(
      new Error("That email is already in use! Please try another one.")
    );
  }
  try {
    existingUser = await User.find({ username: username });
  } catch (err) {
    return next(new Error("Something went wrong!"));
  }
  // console.log(`second existing user: ${existingUser}`);
  if (existingUser.length > 0) {
    return next(
      new Error("That username is already in use! Please try another one.")
    );
  }

  try {
    await createdUser.save();
  } catch (err) {
    return next(err);
  }

  res.json(createdUser);
};

exports.signup = signup;
