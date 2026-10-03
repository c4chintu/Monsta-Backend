let express = require("express");
const enquiryView = require("../../controllers/admin/EnquiryViewControler");

let EnquiryViewRoutes=express.Router()

EnquiryViewRoutes.get("/view",enquiryView)

module.exports=EnquiryViewRoutes