const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userOptions={
  discriminationKey:'usertype',
  collection:'users'
};
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
    // name: {
    //   type: String,
    // },
    // email: {
    //   type: String,
    // },
    // dateOfBirth: {
    //   type: Date,
    // },
    // type: {
    //   type: String,
    //   enum: ["administrator", "doctor", "patient"],
    //   required: true,
    // },
  },
  { timestamps: true },
  userOptions,
);

const user = mongoose.model("user", userSchema);
module.exports = user;

