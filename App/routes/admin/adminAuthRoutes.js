let express=require("express")
const AdminLongIn = require("../../controllers/admin/adminConterler")

let AdmindAuthRoutes=express.Router()


AdmindAuthRoutes.post("/adminLogIn",AdminLongIn)

module.exports=AdmindAuthRoutes