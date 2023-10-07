const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    type: {
      type: String,
      enum: ["administrator", "doctor", "patient"],
      required: true,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
