const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const listSchema = new Schema({
  listTitle: { type: String, required: true },
  listType: { type: String, required: true },
  entries: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "ListEntry" },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

listSchema.plugin(uniqueValidator);

module.exports = mongoose.model("List", listSchema);
