const faqModel = require("../../models/faqModel");

let faqCreate = async (req, res) => {
  let faqObj = req.body;

  let FaqInsertObj = {
    name: faqObj.name,
    answer: faqObj.answer,
    order: faqObj.order,
  };
  let checkCounry = await faqModel.findOne({ name: faqObj.name });

  try {
    if (checkCounry) {
      res.send({
        status: false,
        message: "Error to faq create",
        error: {
          name: "faq is all ready exited...",
        },
      });
    } else {
      let FaqInsertObj = {
        name: faqObj.name,
        answer: faqObj.answer,
        order: faqObj.order,
      };
      let faqCreatedata = await faqModel.insertOne(FaqInsertObj);
      let obj = {
        status: true,
        message: "Faq is create succes",
        data: faqCreatedata,
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
      message: "errot to faq creation....",
      error,
    });
  }
};
let faqView = async (req, res) => {
  let faqView = await faqModel.find();
  let obj = {
    status: true,
    message: "Faq Found view ",
    data: faqView,
  };
  res.send(obj);
};
let faqUpdate = async(req, res) => {
  let { id } = req.params;
   let faqObj = req.body;

  let FaqInsertObj = {
    name: faqObj.name,
    answer: faqObj.answer,
    order: faqObj.order,
  };
let update =await faqModel.updateOne({_id:id},{$set:FaqInsertObj})
  let obj = {
    status: true,
    message: "Faq update is succes",
    data:update
  };
  res.send(obj);
};
let faqDelete =async (req, res) => {
  let {id}=req.params
  let DeleteData=await faqModel.deleteOne({_id:id})
  let obj = {
    status: true,
    message: "Faq delete is succesfully",
    data:DeleteData
  };
  res.send(obj);
};
let faqMultiDelete = async(req, res) => {
  let {id}=req.body

  try{
  let ManyDelete=await faqModel.deleteMany({_id:id})
  let obj = {
    status: true,
    message: "Your choose data deleted....",
    data:ManyDelete
  };
  res.send(obj);
}catch(error){
  console.log(error)
}
};


module.exports = { faqCreate, faqDelete, faqMultiDelete, faqUpdate, faqView };
