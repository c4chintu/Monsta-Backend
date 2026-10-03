let mongoose = require("mongoose");

let SubCategorySchmea = mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "subcategory minimamm length 2 is required"],
    maxLength: [50, "subcategory maximam length 15 is reqired"],
    required: [true, "coler name is require"],
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
    minLength: [2, "subcategory minimamm length 2 is required"],
    maxLength: [150, "subcategory maximam length 150 is reqired"],
    required: [true, "plese upload an image"],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"category"
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

let subCategoryModel = mongoose.model("subcategory", SubCategorySchmea);

module.exports = subCategoryModel;
