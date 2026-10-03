const log = require("cros/common/logger");

const categoryModel = require("../../models/categoryModel");
const ColerModel = require("../../models/colerModel");
const MaterialModel = require("../../models/materialModel");
const productModel = require("../../models/productModel");
const subCategoryModel = require("../../models/subCategoryModel");
const subSubCatModel = require("../../models/subSubCategoryModel");
const { sulgCreate } = require("../../config/helper");

let productCreate = async (req, res) => {
  let {
    name,
    order,
    parent,
    subparent,
    subsubparent,
    color,
    material,
    price,
  
    productType,
    shortdescription,
    longdescription,
  } = req.body;

  let Insertobj = {
    name,
    order,
    parent,
    subparent,
    subsubparent,
    longdescription,
    shortdescription,
    productType,
    price,
    material: JSON.parse(material),
    color: JSON.parse(color),
    slug: sulgCreate(name),
  };

  try {
    let chececkSubScat = await productModel.findOne({ name });
    if (chececkSubScat) {
      res.send({
        status: false,
        message: "Error to create product",
        error: {
          name: "product All ready exited...",
        },
      });
    } else {
      if (req.files.image) {
        Insertobj["image"] = req.files.image[0].filename;
      }

      if (req.files.gallery) {
        Insertobj["gallery"] = req.files.gallery.map((obj) => obj.filename);
      }
      console.log(Insertobj);

      let viewdata = await productModel.insertOne(Insertobj);

      res.send({
        status: true,
        message: "product create data",
        data: viewdata,
      });
    }
  } catch (err) {
    let error = {};
    for (let errorKeys in err.errors) {
      error[errorKeys] = err.errors[errorKeys].message;
    }
    res.send({
      status: false,
      message: "error to create product",
      error,
    });
  }
};

let productView = async (req, res) => {
  let path = process.env.PRODUCT;

  let dataview = await productModel
    .find()
    .populate("parent", "name")
    .populate("subparent", "name")
    .populate("subsubparent", "name")
    .populate("color", "name")
    .populate("material", "name");
  res.send({
    status: true,
    message: "product FOUND",
    path,
    data: dataview,
  });
};

let productUpdate = async (req, res) => {
  let { id } = req.params;

  if (req.files.image) {
    if (req.files.filename) {
      req.body.image = req.files.filename;
      
    }
  }
  
  if (req.files.gallery) {
    if (req.files.filename) {
      req.body.gallery = req.files.filename;
      
    }
  }

  let UpateData = await productModel.updateOne(
    { _id: id },
    {
      $set: req.body,
    },
  );
  res.send({
    status: true,
    message: "product update ",
    data: UpateData,
  });

};

let productDelete = async (req, res) => {
  let { id } = req.params;
  let data = await productModel
    .findOne({ _id: id })
    .select(["name", "code", "order"]);

  res.send({
    status: true,
    message: "product Updated...",
    data,
  });
};
let productMultiDelete = async (req, res) => {
  let { ids } = req.body;
  let deleteMulti = await productModel.deleteMany({ _id: ids });
  res.send({
    status: true,
    message: "Your choose data deleted...",
    data: deleteMulti,
  });
};

let productEdit = async (req, res) => {
  let { id } = req.params;
  let data = await productModel
    .findOne({ _id: id })
    .select(["name", "image", "order"]);

  res.send({
    status: true,
    message: "product Updated...",
    data,
  });
};

let productChangeStatus = async (req, res) => {
  let { ids } = req.body;
  for (let v of ids) {
    let { status } = await productModel.findOne({ _id: v });
    await productModel.updateOne(
      {
        _id: v,
      },
      {
        $set: {
          status: !status,
        },
      },
    );
  }
  res.send({
    status: true,
    message: "product status update",
  });
};

let categoryParent = (req, res) => {
  categoryModel
    .find({ status: true })
    .select("name")
    .then((data) => {
      res.send({ status: true, message: "parent found", data });
    })
    .catch((err) => {
      res.send({ status: false, message: "not found parent" });
    });
};
let subcatparent = (req, res) => {
  let { parentid } = req.params;
  subCategoryModel
    .find({ parent: parentid })
    .select("name")
    .then((data) => {
      res.send({ status: true, message: "sub category parent found", data });
    })
    .catch((err) => {
      res.send({
        status: false,
        message: "not found sub parent",
      });
    });
};

let subsubparent = (req, res) => {
  let { subcatId } = req.params;
  subSubCatModel
    .find({ subparent: subcatId })
    .select("name")
    .then((data) => {
      res.send({ status: true, message: "subsubparent found", data });
    })
    .catch((err) => {
      res.send({ status: false, message: "subsubparent found error " });
    });
};

let colorget = async (req, res) => {
  try {
    let getcolordata = await ColerModel.find({ status: true }).select("name");
    res.send({
      status: true,
      message: "colors found",
      data: getcolordata,
    });
  } catch (err) {
    res.send({
      status: false,
      message: "colors not found",
    });
  }
};

let materialget = async (req, res) => {
  try {
    let getmaterialdata = await MaterialModel.find({ status: true }).select(
      "name",
    );
    res.send({
      status: true,
      message: "materials found",
      data: getmaterialdata,
    });
  } catch (err) {
    res.send({
      status: false,
      message: "materials not found",
    });
  }
};

let productDetails = async (req, res) => {
  let path = process.env.PRODUCT;
  let { id } = req.params;

  let dataview = await productModel
    .findOne({ _id: id })
    .populate("parent", "name")
    .populate("subparent", "name")
    .populate("subsubparent", "name")
    .populate("color", "name")
    .populate("material", "name");
  res.send({
    status: true,
    message: "product details..",
    path,
    data: dataview,
  });
};

module.exports = {
  productCreate,
  productView,
  productUpdate,
  productDelete,
  productMultiDelete,
  productEdit,
  productChangeStatus,
  categoryParent,
  subcatparent,
  subsubparent,
  colorget,
  materialget,
  productDetails,
};
