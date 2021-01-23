const User = require("../models/user");
const Image = require("../models/image");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const signup = async (req, res, next) => {
  let password = req.body.password;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let password = hash;
      const {
        firstName,
        lastName,
        username,
        email,
        bio = "",
        subscriptions = [],
        lists = [],
      } = req.body;

      // create default image
      let image;
      try {
        image = await Image.findById("6009ede342d4b9bd664dfa20");
      } catch (err) {
        return next(new Error("Sorry, something went wrong!"));
      }
      const createdUser = new User({
        firstName,
        lastName,
        password,
        email,
        username,
        bio,
        subscriptions,
        lists,
        image,
      });

      let existingUser;
      try {
        existingUser = await User.findOne({
          email: { $regex: new RegExp("^" + email.toLowerCase(), "i") },
        });
      } catch (err) {
        return next(new Error("Sorry, something went wrong!"));
      }
      if (existingUser) {
        return next(
          new Error("That email is already in use! Please try another one.")
        );
      }
      try {
        existingUser = await User.findOne({ username: username });
      } catch (err) {
        return next(new Error("Something went wrong!"));
      }
      if (existingUser) {
        console.log(existingUser.username);
        return next(
          new Error("That username is already in use! Please try another one.")
        );
      }

      try {
        await createdUser.save();
      } catch (err) {
        return next(err);
      }
      console.log(createdUser);

      res.json({
        name: `${createdUser.firstName} ${createdUser.lastName}`,
        username: createdUser.username,
        _id: createdUser._id,
      });
    });
  });
};

const login = async (req, res, next) => {
  let inputPassword = req.body.password;
  let existingUser;
  let accessToken;

  try {
    existingUser = await User.findOne({
      username: req.body.username,
    });
  } catch (err) {
    return next(new Error("Sorry, something went wrong!"));
  }

  if (!existingUser) {
    return next(new Error("There is no account with that username."));
  } else {
    bcrypt.compare(inputPassword, existingUser.password, (err, result) => {
      if (result) {
        console.log(existingUser._id);
        accessToken = jwt.sign(
          { id: existingUser._id },
          process.env.TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: 3600,
          }
        );
        res.json({
          _id: existingUser._id,
          username: existingUser.username,
          name: `${existingUser.firstName} ${existingUser.lastName}`,
          accessToken: accessToken,
        });
      } else {
        return next(new Error("Your password is incorrect. Please try again."));
      }
    });
  }
};

const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(
      req.params.id,
      "firstName lastName username email lists subscribers bio image"
    ).populate("image");
  } catch (err) {
    return next(new Error("Sorry, something went wrong!"));
  }
  res.json(user);
};

module.exports = {
  signup: signup,
  login: login,
  getUser: getUser,
};
