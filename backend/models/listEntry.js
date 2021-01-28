const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const listEntrySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rank: { type: Number, required: true },
  resource: { type: String, required: true, ref: "Image" },
  resourceOrigin: { type: String },
  resourceType: { type: String, required: true },
  list: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "List" },
});

listEntrySchema.plugin(uniqueValidator);

module.exports = mongoose.model("ListEntry", listEntrySchema);
