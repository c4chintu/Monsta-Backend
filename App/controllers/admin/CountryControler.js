const countryModel = require("../../models/CountryModel");

let CountryCreate = async (req, res) => {
  let CountryObj = req.body;
  try {
    let checkCounryname = await countryModel.findOne({ name: CountryObj.name });
    if (checkCounryname) {
      res.send({
        status: false,
        message: "Erro to country creation",
        error: {
          name: "Country name is All ready Exited...",
        },
      });
    } else {
      let objCountryInsert = {
        name: CountryObj.name,
        order: CountryObj.order,
      };
      let CreateCountry = await countryModel.insertOne(objCountryInsert);
      res.send({
        status: true,
        message: "Country created successfully...",
        CreateCountry,
      });
    }
  } catch (err) {
    let error = {};
    for (let erroKey in err.errors) {
      error[erroKey] = err.errors[erroKey].message;
    }
    res.send({
      status: false,
      message: "Erro to country creation",
      error,
    });
  }
};

let CountryView = async (req, res) => {
  let ViewCoun = await countryModel.find();
  let obj = {
    status: true,
    message: "country Found",
    data: ViewCoun,
  };
  res.send(obj);
};

let CountryUpdate = async (req, res) => {
  let { id } = req.params;
  let objInsert = req.body;

  let InsertObj = {
    name: objInsert.name,
    order: objInsert.order,
  };
  let updateCOuntry = await countryModel.updateOne(
    { _id: id },
    {
      $set: InsertObj,
    },
  );
  let obj = {
    status: true,
    message: "country update succes",
    data: updateCOuntry,
  };
  res.send(obj);
};

let Countrydelete = async (req, res) => {
  let { id } = req.params;
  let CountryObj = req.body;
  let delteData = await countryModel.deleteOne({ _id: id });
  let obj = {
    status: true,
    message: "country delete Succes",
    data: delteData,
  };
  res.send(obj);
};

let CountryMultiDelete = (req, res) => {
  let obj = {
    status: true,
    message: "Your choose country deleted...",
  };
  res.send(obj);
};

module.exports = {
  CountryCreate,
  CountryUpdate,
  CountryMultiDelete,
  CountryView,
  Countrydelete,
};
