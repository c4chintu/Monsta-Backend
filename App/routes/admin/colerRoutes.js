let express = require("express");
// let mongoose=require("mongoose")
const {
  ColerCreate,
  ColerView,
  ColerDelete,
  ColerUpdata,
  colormultidelete,
  colorchangeStatus,
  coloreditData,
} = require("../../controllers/admin/colerControler");

let colerRoute = express.Router();
colerRoute.post("/create", ColerCreate);

// view on browers data api
colerRoute.get("/view", ColerView);

// api data delete
colerRoute.delete("/delete/:id", ColerDelete);

colerRoute.post("/multidelete", colormultidelete);

colerRoute.put("/update/:id", ColerUpdata);

colerRoute.post("/changeStatus/",colorchangeStatus)

colerRoute.get("/getEdit/:id",coloreditData)

module.exports = colerRoute;
