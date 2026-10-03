const categoryModel = require("../../models/categoryModel");

let categoryCreate = async (req, res) => {
  let categoryObj = req.body;
  // console.log(req.file);
  try {
    let CategoryInsObj = {
      name: categoryObj.name,
      image: categoryObj.image,
      order: categoryObj.order,
    };
    let categoryCheck = await categoryModel.findOne({ name: categoryObj.name });
    if (categoryCheck) {
      res.send({
        status: false,
        message: "error to category creation...",
        error: {
          name: "category name All ready exited..",
        },
      });
    } else {
      if (req.file) {
        if (req.file.filename) {
          CategoryInsObj["image"] = req.file.filename;
        }
      }
      let CategoryInsertData = await categoryModel.insertOne(CategoryInsObj);
      res.send({
        status: true,
        message: "Categorty create to succes",
        data: CategoryInsertData,
      });
    }
  } catch (err) {
    let error = {};
    for (let ErrorKey in err.errors) {
      error[ErrorKey] = err.errors[ErrorKey].message;
    }
    res.send({
      status: false,
      message: "error to category creation...",
      error,
    });
  }
};

// view category
let categoryView = async (req, res) => {
  try {
    let path = process.env.CATEGORYIMGURL;

    let ViewData = await categoryModel.find();
    res.send({
      status: true,
      message: "category found",
      path,
      data: ViewData,
    });
  } catch (err) {
    let error = {};

    for (let errorKey in err.errors) {
      error[errorKey] = err.errorKey[errorKey].message;
    }
    res.send({ status: false, message: "error to view category", error });
  }
};

let singelView = async (req, res) => {
  let { id } = req.params;
  let SingleData = await categoryModel.findOne({ _id: id });
  let obj = {
    status: true,
    message: "single Category found",
    data: SingleData,
  };
  res.send(obj);
};
// category  update
let categoryUpdate = async (req, res) => {
  let { id } = req.params;

  if (req.file) {
    if (req.file.filename) {
      req.body.image = req.file.filename;
    }
  }

  // let obj = {
  //   name,
  //   image,
  //   order,
  // };

  let UpateData = await categoryModel.updateOne(
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
// category delete
let categoryDelete = async (req, res) => {
  let { id } = req.params;

  let deleteData = await categoryModel.deleteOne({ _id: id });
  res.send({
    status: true,
    message: "category delete",
    data: deleteData,
  });
};
// catory multi delete
let categoryMultiDelete = async (req, res) => {
  let { ids } = req.body;

  let multidelete = await categoryModel.deleteMany({ _id: ids });
  res.send({
    status: true,
    message: "category delete",
    data: multidelete,
  });
};

let categoryEdit = async (req, res) => {
  let { id } = req.params;
  let data = await categoryModel
    .findOne({ _id: id })
    .select(["name", "image", "order"]);

  res.send({
    status: true,
    message: "Color Updated...",
    data,
  });
};

let categoryChangeStatus = async (req, res) => {
  let { ids } = req.body;
  for (let v of ids) {
    let { status } = await categoryModel.findOne({ _id: v });
    await categoryModel.updateOne(
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

module.exports = {
  categoryCreate,
  categoryDelete,
  categoryMultiDelete,
  categoryUpdate,
  categoryView,
  singelView,
  categoryEdit,
  categoryChangeStatus,
};
