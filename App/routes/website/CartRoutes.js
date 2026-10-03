let express=require("express")
const { addToCart, viewCart, deletecart, changeQty } = require("../../controllers/website/CartControler")




let cartRoutes=express.Router()

cartRoutes.post("/add-to-cart",addToCart)
cartRoutes.get("/view-cart",viewCart)
cartRoutes.delete("/remove-cart/:id",deletecart)
cartRoutes.put("/changeQty/:id",changeQty)


module.exports=cartRoutes