const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema();

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  lists: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  password: { type: String, required: true, minLength: 6 },
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  bio: { type: String, required: true },
  timestamps: true, // creates 'createdAt' and 'updatedAt' field for us
});

UserSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

export default User;
