const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    lists: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    password: { type: String, required: true },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  },
  { timestamps: true } // creates 'createdAt' and 'updatedAt' field for us);
);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
