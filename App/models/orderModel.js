let mongoose = require("mongoose");

let orerderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    shippingAddress: {
      type: Object,
      
    },
    paymentMethod:{
        type:String,
        enum:["cod","online"]
    },
    razorpayPaymentId:{
        type:String
    },
    razorOrderId:{
        type:String
    },
    item: [],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus:{
      type:String,
      enum:["pending", "success", "cancelled"]
    }
  },
  { timestamps: true },
);

let orderModel = mongoose.model("order", orerderSchema);

module.exports = orderModel;
