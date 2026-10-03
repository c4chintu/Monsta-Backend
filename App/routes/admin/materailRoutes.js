let express = require("express");
const {
  materailCreate,
  materailView,
  materailUpdate,
  materailDelete,
  materailmultidelete,
  materailchangeStatus
  
} = require("../../controllers/admin/materalControler");
const { changeStatus } = require("../../controllers/admin/colerControler");

let materailRoute = express.Router();

materailRoute.post("/create", materailCreate);

materailRoute.get("/view", materailView);

materailRoute.put("/update/:id", materailUpdate);

materailRoute.delete("/delete/:id", materailDelete);

materailRoute.post("/multidelete",materailmultidelete)

materailRoute.post("/changeStatus",materailchangeStatus)

module.exports = materailRoute;
