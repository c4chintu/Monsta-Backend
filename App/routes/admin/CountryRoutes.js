let express = require("express");
const {
  CountryCreate,
  CountryView,
  CountryUpdate,
  Countrydelete,
  CountryMultiDelete,
} = require("../../controllers/admin/CountryControler");

let CountryRoutes = express.Router();

CountryRoutes.post("/create", CountryCreate);

CountryRoutes.get("/view", CountryView);

CountryRoutes.put("/update/:id", CountryUpdate);

CountryRoutes.delete("/delete/:id", Countrydelete);

CountryRoutes.post("/multidelete", CountryMultiDelete);

module.exports=CountryRoutes