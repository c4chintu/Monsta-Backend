let express = require("express");
const {
  ProductTabs,
  getAllProducts,
  getProductDetail,
  getHomeSliders,
} = require("../../controllers/website/homeConterler");

let homeRoutes = express.Router();

homeRoutes.get("/products", ProductTabs);
homeRoutes.get("/all-products", getAllProducts);
homeRoutes.get("/product-details/:id", getProductDetail);
homeRoutes.get("/sliders", getHomeSliders);

module.exports = homeRoutes;