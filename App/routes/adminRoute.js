let express = require("express");
// let mongoose=require("mongoose")
const colerRoute = require("./admin/colerRoutes");
const materailRoute = require("./admin/materailRoutes");
const FaqRoute = require("./admin/faqRoute");
const CountryRoutes = require("./admin/CountryRoutes");
const CategoryRoutes = require("./admin/categoryRoutes");
const subCategoryRoutes = require("./admin/subCategoryRoutes");
const subSubCatRoutes = require("./admin/subSubCategoryRoutes");
const productRoutes = require("./admin/productRoutes");
const EnquiryViewRoutes = require("./admin/EnquiryViewRoutes");
const AdmindAuthRoutes = require("./admin/adminAuthRoutes");

let adminRoutes = express.Router();

adminRoutes.use("/color", colerRoute);

adminRoutes.use("/materail", materailRoute);

adminRoutes.use("/faq", FaqRoute);

adminRoutes.use("/country", CountryRoutes);

adminRoutes.use("/category", CategoryRoutes);

adminRoutes.use("/subcategory", subCategoryRoutes);

adminRoutes.use("/subsubcategory",subSubCatRoutes)

adminRoutes.use("/product",productRoutes)

adminRoutes.use("/enquiry",EnquiryViewRoutes)

adminRoutes.use("/authAdmin",AdmindAuthRoutes)

const sliderRoutes = require("./admin/sliderRoutes");
adminRoutes.use("/slider", sliderRoutes);

module.exports = adminRoutes;

