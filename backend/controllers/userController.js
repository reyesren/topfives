const User = require("../models/user");
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
        bio,
        subscriptions,
        lists,
        image,
      } = req.body;
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
      // console.log(`first existing user: ${existingUser}`);
      if (existingUser) {
        console.log(existingUser.username);
        return next(
          new Error("That email is already in use! Please try another one.")
        );
      }
      try {
        existingUser = await User.findOne({ username: username });
      } catch (err) {
        return next(new Error("Something went wrong!"));
      }
      // console.log(`second existing user: ${existingUser}`);
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

      res.json(createdUser);
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
        accessToken = jwt.sign(
          { username: existingUser.username },
          process.env.TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: 3600,
          }
        );
        res.send(accessToken);
      } else {
        return next(new Error("Your password is incorrect. Please try again."));
      }
    });
  }
};

module.exports = {
  signup: signup,
  login: login,
};
