let mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "subsubcategory minimamm length 2 is required"],
    maxLength: [150, "subsubcategory maximam length 150 is reqired"],
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
  gallery:Array,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subparent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
  },
  subsubparent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subsubcategory",
  },
  color: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coler",
    },
  ],
  material: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "material",
    },
  ],
  price: {
    type: Number,
  },
  productType: {
    type: Number,
    enum: [1, 2, 3],
  },
  shortdescription: String,
  longdescription: String,
  status: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let productModel = mongoose.model("product", productSchema);

module.exports = productModel;
