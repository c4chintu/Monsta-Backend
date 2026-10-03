const log = require("cros/common/logger");

const subCategoryModel = require("../../models/subCategoryModel");
const categoryModel = require("../../models/categoryModel");
const { sulgCreate } = require("../../config/helper");

let subcategoryCreate = async (req, res) => {
  let { name, order, parent } = req.body;

  let subInsertObj = {
    name,
    order,
    parent,
    slug: sulgCreate(name),
  };

  try {
    let checkSubcategory = await subCategoryModel.findOne({ name });
    if (checkSubcategory) {
      res.send({
        status: false,
        message: "error to category creation...",
        error: {
          name: "sub category name All ready exited..",
        },
      });
    } else {
      if (req.file) {
        if (req.file.filename) {
          subInsertObj["image"] = req.file.filename;
        }
      }
      let subdata = await subCategoryModel.insertOne(subInsertObj);
      res.send({
        status: true,
        message: "subcatgory found",
        data: subdata,
      });
    }
  } catch (err) {
    let error = {};
    for (let ErrorKey in err.errors) {
      error[ErrorKey] = err.errors[ErrorKey].message;
    }
    res.send({
      status: false,
      message: "error to sub category creation...",
      error,
    });
  }
};

let subcategoryView = async (req, res) => {
  let path = process.env.SUBCATEGORY;

  let ViewData = await subCategoryModel.find().populate("parent", "name");
  res.send({
    status: true,
    message: "subcategory found",
    path,
    data: ViewData,
  });
};

let subcategoryUpdate = async (req, res) => {
  let { id } = req.params;

  if (req.file) {
    if (req.file.filename) {
      req.body.image = req.file.filename;
    }
  }

  let UpateData = await subCategoryModel.updateOne(
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

let subcategoryDelete = async (req, res) => {
  let { id } = req.params;
  let data = await subCategoryModel
    .findOne({ _id: id })
    .select(["name", "code", "order"]);

  res.send({
    status: true,
    message: "subcategory Updated...",
    data,
  });
};

let subcategoryMultiDelete = async (req, res) => {
  let { ids } = req.body;

  let multidelete = await subCategoryModel.deleteMany({ _id: ids });
  res.send({
    status: true,
    message: "Sub Category Delete",
    data: multidelete,
  });
};

let subcategoryEdit = async (req, res) => {
  let { id } = req.params;
  let data = await subCategoryModel
    .findOne({ _id: id })
    .select(["name", "image", "order"]);

  res.send({
    status: true,
    message: "Color Updated...",
    data,
  });
};

let subcategoryChangeStatus = async (req, res) => {
  let { ids } = req.body;
  for (let v of ids) {
    let { status } = await subCategoryModel.findOne({ _id: v });
    await subCategoryModel.updateOne(
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
    message: "Your choose status update",
  });
};

let subCatParent = (req, res) => {
  categoryModel
    .find({ status: true })
    .select("name")
    .then((data) => {
      res.send({ status: true, message: "parent category", data });
    })
    .catch((err) => {
      res.send({ status: false, message: "Not found parent" });
    });
};

module.exports = {
  subcategoryChangeStatus,
  subcategoryCreate,
  subcategoryDelete,
  subCatParent,
  subcategoryDelete,
  subcategoryEdit,
  subcategoryMultiDelete,
  subcategoryUpdate,
  subcategoryView,
};
