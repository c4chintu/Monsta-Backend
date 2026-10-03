let jwt = require("jsonwebtoken");
const cartModel = require("../../models/cartModel");

// cart data add
let addToCart = async (req, res) => {
  let cartObj = { ...req.body };
  let token = req.headers.authorization.split(" ")[1];

  let decoded = jwt.verify(token, process.env.TOKENKEY);

  let { id } = decoded;

  cartObj["userId"] = id;

  let result = await cartModel.insertOne(cartObj);
  res.send({ status: true, message: "cart added... ", data: result });
};

// cart data view
let viewCart = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];

  let decoded = jwt.verify(token, process.env.TOKENKEY);

  let { id } = decoded;

  let data = await cartModel.find({ userId: id });
  res.send({ status: true, message: "cart data view", data });
};

let deletecart = async (req, res) => {
  let { id } = req.params;

  let deletCart = await cartModel.deleteOne({ _id: id });

  res.send({
    status: true,
    message: "Cart item deleted...",
    data: deletCart,
  });
};

let changeQty = async (req, res) => {
  let { id } = req.params;
  let { qty } = req.body;

  let change = await cartModel.updateOne({ _id: id }, { $set: { qty } });

  res.send({
    status:true,
    message:"cart item qty updated..",
    data:change
  })
};

module.exports = { addToCart, viewCart, deletecart,changeQty };
