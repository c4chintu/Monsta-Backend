let mongoose = require("mongoose");

let cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  productId:{
    type:String
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  qty: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
