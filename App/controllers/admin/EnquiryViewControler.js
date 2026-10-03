const contectModel = require("../../models/contactModel");

let enquiryView = async (req, res) => {
  let data = await contectModel.find();
  let obj = {
    status: true,
    message: "Enquiry view fonud",
    data
  };
  res.send(obj)
};

module.exports=enquiryView