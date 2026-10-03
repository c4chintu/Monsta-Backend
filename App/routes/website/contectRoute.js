let express=require("express")
const { enquireySave } = require("../../controllers/website/contectControler")


let contectRoute=express.Router()

contectRoute.post("/enquiry",enquireySave)


module.exports=contectRoute