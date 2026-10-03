let express = require("express");
const contectRoute = require("./website/contectRoute");
const authRoutes = require("./website/authRoute");
const homeRoutes = require("./website/homeRoutes");
const cartRoutes = require("./website/CartRoutes");
const orderRoutes = require("./website/orderRotues");

let webRoutes=express.Router()


webRoutes.use("/contect",contectRoute)
webRoutes.use("/auth",authRoutes)
webRoutes.use("/home",homeRoutes)
webRoutes.use("/cart",cartRoutes)
webRoutes.use("/order",orderRoutes)

module.exports=webRoutes