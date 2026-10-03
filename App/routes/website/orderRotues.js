let express = require("express");
const { orderSave } = require("../../controllers/website/orderControler");

let orderRoutes = express.Router();

orderRoutes.post("/save-order", orderSave);

module.exports = orderRoutes;