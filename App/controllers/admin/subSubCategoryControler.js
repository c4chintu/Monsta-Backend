const { error } = require("cros/common/logger");

const categoryModel = require("../../models/categoryModel");
const subCategoryModel = require("../../models/subCategoryModel");
const subSubCatModel = require("../../models/subSubCategoryModel");
const { sulgCreate } = require("../../config/helper");

let subSubcategoryCreate = async (req, res) => {
  let { name, order, parent, subparent } = req.body;

  let Insertobj = {
    name,
    order,
    parent,
    subparent,

    slug: sulgCreate(name),
  };
  try {
    let chececkSubScat = await subSubCatModel.findOne({ name });
    if (chececkSubScat) {
      res.send({
        status: false,
        message: "Error to create subsubcategory",
        error: {
          name: "SubSubCategory All ready exited...",
        },
      });
    } else {
      if (req.file) {
        if (req.file.filename) {
          Insertobj["image"] = req.file.filename;
        }
      }
      let viewdata = await subSubCatModel.insertOne(Insertobj);

      res.send({
        status: true,
        message: "SubSubCategory create data",
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
      message: "error to create subsubcategory",
      error,
    });
  }
};

let subsubcategoryView = async (req, res) => {
  let path = process.env.SUBSUBCATEGORY;

  let dataview = await subSubCatModel
    .find()
    .populate("parent", "name")
    .populate("subparent", "name");
  res.send({
    status: true,
    message: "SUBSUBCATEGORY FOUND",
    path,
    data: dataview,
  });
};

let subSubcategoryUpdate = async (req, res) => {
  let { id } = req.params;

  if (req.file) {
    if (req.file.filename) {
      req.body.image = req.file.filename;
    }
  }

  let UpateData = await subSubCatModel.updateOne(
    { _id: id },
    {
      $set: req.body,
    },
  );
  res.send({
    status: true,
    message: "category update ",
    data: UpateData,
  });
};

let subSubcategoryDelete = async (req, res) => {
  let { id } = req.params;
  let data = await subSubCatModel
    .findOne({ _id: id })
    .select(["name", "code", "order"]);

  res.send({
    status: true,
    message: "subsubcategory Updated...",
    data,
  });
};

let subSubcategoryMultiDelete = async (req, res) => {
  let { ids } = req.body;
  let deleteMulti = await subSubCatModel.deleteMany({ _id: ids });
  res.send({
    status: true,
    message: "Your choose data deleted...",
    data: deleteMulti,
  });
};

let subSubcategoryEdit = async (req, res) => {
  let { id } = req.params;
  let data = await subSubCatModel
    .findOne({ _id: id })
    .select(["name", "image", "order"]);

  res.send({
    status: true,
    message: "Color Updated...",
    data,
  });
};

let subSubcategoryChangeStatus = async (req, res) => {
  let { ids } = req.body;
  for (let v of ids) {
    let { status } = await subSubCatModel.findOne({ _id: v });
    await subSubCatModel.updateOne(
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
    message: "SubSubCategory status update",
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

module.exports = {
  subSubcategoryCreate,
  subsubcategoryView,
  subSubcategoryUpdate,
  subSubcategoryDelete,
  subSubcategoryMultiDelete,
  subSubcategoryEdit,
  subSubcategoryChangeStatus,
  categoryParent,
  subcatparent,
};
