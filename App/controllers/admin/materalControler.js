const MaterialModel = require("../../models/materialModel");

let materailCreate = async (req, res) => {
  let materailObj = req.body;
  try {
    let matreaicheck = await MaterialModel.findOne({ name: materailObj.name });
    if (matreaicheck) {
      res.send({
        status: false,
        message: "ERROR materail not create",
        Error: {
          name: "materiel name all Ready exit...",
        },
      });
    } else {
      let MateraiInsertObj = {
        name: materailObj.name,
        order: materailObj.order,
      };

      let materilData = await MaterialModel.insertOne(MateraiInsertObj);

      let obj = {
        status: true,
        message: "Materail create to succesfull",
      };
      res.send(obj);
    }
  } catch (err) {
    let error = {};
    for (let errorKey in err.errors) {
      error[errorKey] = err.errors[errorKey].message;
    }
    res.send({
      status: false,
      message: "ERROR materail not create",
      error,
    });
  }
};

let materailView = async (req, res) => {
  let materailData = await MaterialModel.find();
  let obj = {
    status: true,
    message: "materail found",
    data: materailData,
  };
  res.send(obj);
};

let materailDelete = async (req, res) => {
  let { id } = req.params;
  let DeletMaterail = await MaterialModel.deleteOne({ _id: id });
  let obj = {
    status: true,
    message: "materail delete succusfully",
    data: DeletMaterail,
  };
  res.send(obj);
};

let materailUpdate = async (req, res) => {
  let { id } = req.params;
  let materailObj = req.body;
  let MateraiInsertObj = {
    name: materailObj.name,
    order: materailObj.order,
  };

  let UpdateData = await MaterialModel.updateOne(
    { _id: id },
    { $set: MateraiInsertObj },
  );
  let obj = {
    status: true,
    message: "materail update succusfully ",
    data: UpdateData,
  };
  res.send(obj);
};
let materailmultidelete = async (req, res) => {
  let { id } = req.body;
  let mutliDelete = await MaterialModel.deleteMany({ _id: id });

  let obj = {
    status: true,
    message: "Your choose data is delete",
    data: mutliDelete,
  };
  res.send(obj);
};

let materailchangeStatus = async (req, res) => {
  let { ids } = req.body;
  for (let v of ids) {
    let {status} = await MaterialModel.findOne({ _id: v });
    await MaterialModel.updateOne({
      _id:v
    },
  {
    $set:{
      status:!status
    }
  })
  }
  res.send({
    status:true,
    message:"material Update",
    
  })
};
module.exports = {
  materailCreate,
  materailDelete,
  materailUpdate,
  materailView,
  materailmultidelete,
  materailchangeStatus,
};
