let mongoose = require("mongoose");

let subsubcatSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "subsubcategory minimamm length 2 is required"],
    maxLength: [50, "subsubcategory maximam length 15 is reqired"],
    required: [true, "Name is require"],
  },
  order: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    minLength: [2, "category minimam length 2"],
  },
  image: {
    type: String,
    minLength: [2, "subsubcategory minimamm length 2 is required"],
    maxLength: [150, "subsubcategory maximam length 150 is reqired"],
    required: [true, "plese upload an image"],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subparent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
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

let subSubCatModel = mongoose.model("subsubcategory", subsubcatSchema);
module.exports = subSubCatModel;
