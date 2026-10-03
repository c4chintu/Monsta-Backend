let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    required: [true,"Plese enter the emai id"],
  },
  phone: {
    type: String,
  },
  image: String,
  address: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: function (value) {
        // Requires at least one uppercase letter, one lowercase letter, and one number
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    },
  },
});

let userModel = mongoose.model("user", userSchema);
module.exports = userModel;
