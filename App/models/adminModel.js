let mongoose = require("mongoose");

let adminSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  mapurl: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;
