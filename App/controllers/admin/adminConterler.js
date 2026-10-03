const adminModel = require("../../models/adminModel");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const saltRounds = 10;

let AdminLongIn = async (req, res) => {
  let { email, password } = req.body;
  try {
    let CheckEmailDB = await adminModel.findOne({ email: email });
    if (CheckEmailDB) {
      let dbpassword = CheckEmailDB.password;
      let checkPassword = bcrypt.compareSync(password, dbpassword);
      if (checkPassword) {
        let token = jwt.sign(
          { id: CheckEmailDB._id },
          process.env.TOKENKEY || "444444"
        );
        return res.send({
          status: true,
          message: "Login Successfully",
          data: CheckEmailDB,
          token,
        });
      } else {
        return res.send({
          status: false,
          message: "Password does not match",
        });
      }
    } else {
      return res.send({
        status: false,
        message: "Email not found in database",
      });
    }
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).send({
      status: false,
      message: "Server error during admin login",
    });
  }
};

module.exports = AdminLongIn;
