const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    receivers: {
      type: [mongoose.Types.ObjectId],
      ref: "user",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const notification = mongoose.model("notification", notificationSchema);
module.exports = notification;
