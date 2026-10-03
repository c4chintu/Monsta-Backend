let express = require("express");
const {
  sliderCreate,
  sliderView,
  sliderDelete,
  sliderChangeStatus,
} = require("../../controllers/admin/sliderControler");
const multer = require("multer");

let sliderRoutes = express.Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/slider");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

sliderRoutes.post("/create", upload.single("image"), sliderCreate);
sliderRoutes.get("/view", sliderView);
sliderRoutes.delete("/delete/:id", sliderDelete);
sliderRoutes.post("/changeStatus", sliderChangeStatus);

module.exports = sliderRoutes;
