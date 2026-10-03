let mongoose = require("mongoose");

let CountrySchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "country manimam length is 2"],
    maxLength: [15, "country maximam length is 15"],
    required: [true, "country name is require.."],
  },
  order: {
    type: Number,
    default:0,
    required: [true, "country c is require.."],
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

let countryModel=mongoose.model("country",CountrySchema)

module.exports=countryModel
