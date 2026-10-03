let mongoose= require("mongoose");

let CategorySchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Category minimamm length 2 is required"],
    maxLength: [50, "Category maximam length 50 is reqired"],
    required: [true, "coler name is require"],
  },
  order: {
    type: Number,
    default: 0,
  },
  slug:{
    type:String,
    minLength:[2,"category minimam length 2"]
  },
  image: {
    type: String,
    minLength: [2, "Category minimamm length 2 is required"],
    maxLength: [150, "Category maximum length 150 is reqired"],
    required: [true, "plese upload an image"],
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

let categoryModel=mongoose.model("category",CategorySchema)

module.exports=categoryModel