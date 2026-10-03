const mongoose = require("mongoose");
const productModel = require("../../models/productModel");
require("../../models/categoryModel");
require("../../models/colerModel");
require("../../models/materialModel");

let ProductTabs = async (req, res) => {
  try {
    let dataPro = await productModel
      .find({ status: true })
      .select(["image", "name", "price", "parent", "productType"])
      .populate("parent", "name");

    let path = process.env.PRODUCT || "http://localhost:8000/uploads/product/";
    res.send({ status: true, message: "product view", data: dataPro, path });
  } catch (err) {
    res.send({ status: false, message: err.message });
  }
};

let getAllProducts = async (req, res) => {
  try {
    let products = await productModel
      .find({ status: true })
      .populate("parent", "name");
    let path = process.env.PRODUCT || "http://localhost:8000/uploads/product/";
    res.send({ status: true, message: "All products", data: products, path });
  } catch (err) {
    res.send({ status: false, message: err.message });
  }
};

let getProductDetail = async (req, res) => {
  try {
    let { id } = req.params;
    let query = { status: true };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query._id = id;
    } else {
      query.slug = id;
    }
    let product = await productModel
      .findOne(query)
      .populate("parent", "name")
      .populate("color", "name")
      .populate("material", "name");
    let path = process.env.PRODUCT || "http://localhost:8000/uploads/product/";
    res.send({ status: true, message: "Product detail", data: product, path });
  } catch (err) {
    res.send({ status: false, message: err.message });
  }
};

const sliderModel = require("../../models/sliderModel");

let getHomeSliders = async (req, res) => {
  try {
    let sliders = await sliderModel.find({ status: true }).sort({ order: 1 });
    let path = process.env.SLIDER || "http://localhost:8000/uploads/slider/";
    res.send({ status: true, message: "Sliders data", data: sliders, path });
  } catch (err) {
    res.send({ status: false, message: err.message });
  }
};

module.exports = { ProductTabs, getAllProducts, getProductDetail, getHomeSliders };
