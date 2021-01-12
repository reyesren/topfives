const User = require("../models/user");
const bcrypt = require("bcrypt");
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
    });
  });
};

exports.signup = signup;
