let express = require("express");

let subSubCatRoutes = express.Router();


const {
  subSubcategoryCreate,
  subsubcategoryView,
  subSubcategoryUpdate,
  subSubcategoryDelete,
  subSubcategoryMultiDelete,
  subSubcategoryEdit,
  subSubcategoryChangeStatus,
  subcatparent,
  categoryParent,
} = require("../../controllers/admin/subSubCategoryControler");

const multer = require("multer");
 

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/subsubcategory");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ file.originalname);
  },
});

const upload = multer({ storage: storage });


// single view data
// subSubCatRoutes.get("/view/:id", );

subSubCatRoutes.post("/create", upload.single("image"), subSubcategoryCreate);

subSubCatRoutes.get("/view", subsubcategoryView);

subSubCatRoutes.put("/update/:id", subSubcategoryUpdate);

subSubCatRoutes.delete("/delete/:id", subSubcategoryDelete);

subSubCatRoutes.post("/multidelete", subSubcategoryMultiDelete);

subSubCatRoutes.get("/getEdit/:id", subSubcategoryEdit);

subSubCatRoutes.post("/changeStatus/", subSubcategoryChangeStatus);

subSubCatRoutes.get("/parent", categoryParent);

subSubCatRoutes.get("/subparent/:parentid",subcatparent)

module.exports = subSubCatRoutes;
