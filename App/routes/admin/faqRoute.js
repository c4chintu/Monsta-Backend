let express=require("express")
const { faqCreate, faqView, faqUpdate, faqMultiDelete, faqDelete } = require("../../controllers/admin/faqControler")

let FaqRoute=express.Router()

FaqRoute.post("/create",faqCreate)
FaqRoute.get("/view",faqView)
FaqRoute.put("/update/:id",faqUpdate)
FaqRoute.delete("/delete/:id",faqDelete)
FaqRoute.post("/multidelete",faqMultiDelete)
module.exports=FaqRoute