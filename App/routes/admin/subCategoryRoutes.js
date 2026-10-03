let express = require("express");

let subCategoryRoutes = express.Router();
const {
  subcategoryChangeStatus,
  subcategoryEdit,
  subcategoryMultiDelete,
  subcategoryDelete,
  subcategoryUpdate,
  subcategoryCreate,
  subcategoryView,
  subCatParent,
} = require("../../controllers/admin/subCategoryControler");

const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/subcategory");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

subCategoryRoutes.get("/view", subcategoryView);

// single view data
// subCategoryRoutes.get("/view/:id", );

subCategoryRoutes.post("/create", upload.single("image"), subcategoryCreate);

subCategoryRoutes.put("/update/:id",upload.single("image"), subcategoryUpdate);

subCategoryRoutes.delete("/delete/:id", subcategoryDelete);

subCategoryRoutes.post("/multidelete", subcategoryMultiDelete);

subCategoryRoutes.get("/getEdit/:id",upload.single("image"), subcategoryEdit);

subCategoryRoutes.post("/changeStatus/", subcategoryChangeStatus);

subCategoryRoutes.get("/parent", subCatParent);

module.exports = subCategoryRoutes;
