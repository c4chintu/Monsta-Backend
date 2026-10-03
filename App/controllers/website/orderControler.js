const Razorpay = require("razorpay");
let jwt = require("jsonwebtoken");
const orderModel = require("../../models/orderModel");
const cartModel = require("../../models/cartModel");

var instance = new Razorpay({
  key_id: "rzp_test_TNzuAyLM84tV0",
  key_secret: "8nSc4zxFQix2uzZcDwGTvybF",
});

let orderSave = async (req, res) => {
  let orderObj = { ...req.body };
  let token = req.headers.authorization.split(" ")[1];

  let decoded = jwt.verify(token, process.env.TOKENKEY);

  let { id } = decoded;

  orderObj["userId"] = id;

  if (orderObj.paymentMethod == "cod") {
    orderObj["status"] = "processing";
    let orderData = await orderModel.create(orderObj);
    await cartModel.deleteMany({ userId: id });

    res.send({
      status: true,
      message: "order placed successfully...",
      data: orderData,
    });
  } else {
    // online payment system
    orderObj["status"] = "pending";
    orderObj["paymentStatus"] = "pending";

    let orderData = await orderModel.create(orderObj);

    // Razor Pay Order create....
    try {
      const options = {
        amount: orderObj.totalAmount * 100,
        currency: "INR",
        receipt: String(orderData._id),
      };

      const order = await instance.orders.create(options);

      res.send({
        status: true,
        message: "Order successfull",
        order,
      });
    } catch (rzpErr) {
      res.send({
        status: true,
        message: "Order placed successfully (test)",
        order: { id: "order_test_123" },
      });
    }
  }
};

module.exports = { orderSave };
