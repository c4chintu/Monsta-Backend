let express = require("express");
const {
  categoryView,
  categoryCreate,
  categoryUpdate,
  categoryDelete,
  categoryMultiDelete,
  singelView,
  categoryEdit,
  categoryChangeStatus
} = require("../../controllers/admin/CategoryControler");

// images ko backed mai add kran ka pageck
const multer = require("multer");

// url create and contions
let CategoryRoutes = express.Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/category");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ file.originalname);
  },
});

const upload = multer({ storage: storage });

CategoryRoutes.get("/view", categoryView);

// single view data
// CategoryRoutes.get("/view/:id", );

CategoryRoutes.post("/create", upload.single("image"), categoryCreate);

CategoryRoutes.put("/update/:id", upload.single("image"), categoryUpdate);

CategoryRoutes.delete("/delete/:id", categoryDelete);

CategoryRoutes.post("/multidelete", categoryMultiDelete);

CategoryRoutes.get("/getEdit/:id", upload.single("image"),categoryEdit)

CategoryRoutes.post("/changeStatus/",categoryChangeStatus)

module.exports = CategoryRoutes;
