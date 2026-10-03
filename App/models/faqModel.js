let mongoose = require("mongoose");

let faqSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "faq manimam length is 2"],
    maxLength: [50, "faq maximam length is 50"],
    required: [true, "faq name is require.."],
  },
  answer: {
    type: String,
    minLength: [2, "faq manimam length is 2"],
    maxLength: [100, "faq maximam length is 100"],
    required: [true, "faq name is require.."],
  },
  order: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

let faqModel = mongoose.model("faq", faqSchema);

module.exports = faqModel;
