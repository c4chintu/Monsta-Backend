let mongoose = require("mongoose");

let colerSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "color minimamm length 2 is required"],
    maxLength: [15, "color maximam length 15 is reqired"],
    unique: true, 
    required: [true, "coler name is require"],
  
  },
  code: {
    type: String,
    required: [true, "code name is required"],
    minLength: [2, "code minimam length 2 is require"],
    unique: true, 
    maxLength: [15, "code maximam length 15 is require"],
  },
  order: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let ColerModel = mongoose.model("coler", colerSchema);

module.exports = ColerModel;
