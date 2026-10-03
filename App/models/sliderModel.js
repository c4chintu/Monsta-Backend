let mongoose = require("mongoose");

let sliderSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: [true, "Slider image is required"],
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let sliderModel = mongoose.model("slider", sliderSchema);

module.exports = sliderModel;
