let express = require("express");
const {
  categoryParent,
  subcatparent,
  colorget,
  materialget,
  productUpdate,
  productView,
  productCreate,
  productDelete,
  productMultiDelete,
  productEdit,
  productChangeStatus,
  subsubparent,
  productDetails,
} = require("../../controllers/admin/productControler");

let productRoutes = express.Router();
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// single view data
// subSubCatRoutes.get("/view/:id", );

productRoutes.post(
  "/create",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 20,
    },
  ]),
  productCreate,
);

productRoutes.get("/view", productView);

productRoutes.get("/details/:id", productDetails);

productRoutes.put(
  "/update/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 20,
    },
  ]),
  productUpdate,
);

productRoutes.delete("/delete/:id", productDelete);

productRoutes.post("/multidelete", productMultiDelete);

productRoutes.get("/getEdit/:id", upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 20,
    },
  ]), productEdit);

productRoutes.post("/changeStatus/", productChangeStatus);

productRoutes.get("/parent", categoryParent);

productRoutes.get("/subparent/:parentid", subcatparent);

productRoutes.get("/subsubcategoryparent/:subcatId", subsubparent);

productRoutes.get("/colors", colorget);

productRoutes.get("/materials", materialget);

module.exports = productRoutes;
