const sliderModel = require("../../models/sliderModel");

let sliderCreate = async (req, res) => {
  try {
    let { title, subTitle, order } = req.body;
    let insertObj = {
      title: title || "",
      subTitle: subTitle || "",
      order: order ? Number(order) : 0,
    };

    if (req.file) {
      insertObj["image"] = req.file.filename;
    } else {
      return res.send({ status: false, message: "Please upload an image" });
    }

    let result = await sliderModel.create(insertObj);
    res.send({
      status: true,
      message: "Slider added successfully",
      data: result,
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message || "Error creating slider",
    });
  }
};

let sliderView = async (req, res) => {
  try {
    let data = await sliderModel.find().sort({ order: 1, createdAt: -1 });
    let path = process.env.SLIDER;
    res.send({
      status: true,
      message: "Slider view data",
      data,
      path,
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message || "Error fetching sliders",
    });
  }
};

let sliderDelete = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await sliderModel.findByIdAndDelete(id);
    res.send({
      status: true,
      message: "Slider deleted successfully",
      data,
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message || "Error deleting slider",
    });
  }
};

let sliderChangeStatus = async (req, res) => {
  try {
    let { id } = req.body;
    let item = await sliderModel.findById(id);
    if (item) {
      item.status = !item.status;
      await item.save();
    }
    res.send({
      status: true,
      message: "Slider status updated",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message || "Error updating status",
    });
  }
};

module.exports = {
  sliderCreate,
  sliderView,
  sliderDelete,
  sliderChangeStatus,
};
