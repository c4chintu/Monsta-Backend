let mongoose = require("mongoose");

let contecntSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "contact minimamm name length 2 is required"],
    maxLength: [50, "contact maximam name length 50 is reqired"],
    required: [true, "contact name is require"],
  },
  email: {
    type: String,
    minLength: [2, "contact minimamm mail length 2 is required"],
    maxLength: [50, "contact maximam mail length 50 is reqired"],

    required: [true, "contact name is require"],
  },
  message: {
    type: String,
    minLength: [2, "contact minimamm message length 2 is required"],
   
    required: [true, "contact name is require"],
  },
  phone: {
    type: String,
    default: 0,
  },
  date:{
    type:Date,
    default:Date.now
  }
});

let contectModel = mongoose.model("contact", contecntSchema);
module.exports = contectModel;
