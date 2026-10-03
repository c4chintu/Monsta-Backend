const { Collection } = require("mongoose");
const ColerModel = require("../../models/colerModel");

let ColerCreate = async (req, res) => {
  // fornted se data aa raha
  let coloerObj = req.body;

  // data ko macth krna
  try {
    let coloercheckName = await ColerModel.findOne({ name: coloerObj.name });

    if (coloercheckName) {
      res.send({
        status: false,
        message: "Error to color creation",
        error: {
          name: "color name all ready exited...",
        },
      });
    } else {
      let coloerInsertedObj = {
        name: coloerObj.name,
        code: coloerObj.code,
        order: coloerObj.order,
      };
      // database ko data dene kai liya
      let ColderInDatabase = await ColerModel.insertOne(coloerInsertedObj);
      res.send({
        status: true,
        message: "coler create a success",
        data: ColderInDatabase,
      });
    }
  } catch (err) {
    let error = {};

    for (let erroekey in err.errors) {
      error[erroekey] = err.errors[erroekey].message;
    }

    res.send({ status: false, message: "Error to color creation", error });
  }
};

let ColerView = async (req, res) => {
  let { name, order, code } = req.query;
  let orCondition = [];
  if (name) {
     orCondition.push({ name:new RegExp(name,"i") });   //RegExp ka singel letter search mai use hota hai...
  }
  if (order) {
    orCondition.push({order});
  }
  if (code) {
    orCondition.push({ code });
  }

  try {
    let filter = {};
    if (orCondition.length >= 1) {
      filter.$or = orCondition;
    }
    let data = await ColerModel.find(filter);
    let obj = {
      status: true,
      message: "coler view",
      data,
    };
    res.send(obj);
  } catch (err) {
    let error = {};
    for (let errorKey in err.errors) {
      error[errorKey] = err.errors[errorKey].message;
    }
    res.send({
      status: false,
      message: "Erro to Found color",
      error,
    });
  }
};

let ColerDelete = async (req, res) => {
  let { id } = req.params;

  let deleteData = await ColerModel.deleteOne({ _id: id });

  let obj = {
    status: true,
    message: "coler delete a success",
    deleteData,
  };
  res.send(obj);
};

let colormultidelete = async (req, res) => {
  let { ids } = req.body;
  let deletMany = await ColerModel.deleteMany({ _id: ids });

  let obj = {
    status: true,
    message: "Your choose data deleted...",
    deletMany,
  };
  res.send(obj);
};

let ColerUpdata = async (req, res) => {
  let { id } = req.params;

  let coloerObj = req.body;

  try {
    let coloercheckName = await ColerModel.findOne({ name: coloerObj.name });

    if (coloercheckName) {
      res.send({
        status: false,
        message: "Error to color creation",
        error: {
          name: "color name all ready exited...",
        },
      });
    } else {
      let coloerInsertedObj = {
        name: coloerObj.name,
        code: coloerObj.code,
        order: coloerObj.order,
      };
      let UpadteData = await ColerModel.updateOne(
        { _id: id },
        {
          $set: coloerObj,
        },
      );
      let obj = {
        status: true,
        message: "coler updata a success",
        UpadteData,
      };
      res.send(obj);
    }
  } catch (err) {
    let error = {};

    for (let erroekey in err.errors) {
      error[erroekey] = err.errors[erroekey].message;
    }

    res.send({ status: false, message: "Error to color creation", error });
  }
};
let colorchangeStatus = async (req, res) => {
  let { ids } = req.body;
  for (let v of ids) {
    let { status } = await ColerModel.findOne({ _id: v });
    await ColerModel.updateOne(
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

let coloreditData = async (req, res) => {
  let { id } = req.params;
  let data = await ColerModel.findOne({ _id: id }).select([
    "name",
    "code",
    "order",
  ]);

  res.send({
    status: true,
    message: "Color edit sucess...",
    data,
  });
};
module.exports = {
  ColerCreate,
  ColerDelete,
  ColerUpdata,
  ColerView,
  colormultidelete,
  colorchangeStatus,
  coloreditData,
};
