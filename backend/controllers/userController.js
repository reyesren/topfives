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

  try {
    await createdUser.save();
  } catch (err) {
    res.json(err);
  }

  res.json(createdUser);
};

exports.signup = signup;
