const { error } = require("cros/common/logger");
const { transporter } = require("../../config/helper");
const userModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const saltRounds = 10;

let Register = async (req, res) => {
  let { name, email, password } = req.body;

  let checkEmail = await userModel.findOne({ email });
  if (checkEmail) {
    res.send({
      status: false,
      message: "email Id Allready exited...",
      error: {
        name: "change to email same email is not allowed...",
      },
    });
  } else {
    try {
      let hashPassword = bcrypt.hashSync(password, saltRounds);

      let InsertObj = {
        name,
        email,
        password,
      };
      transporter.sendMail({
        from: '"Monsta furniture" <officalchintu318@gmail.com>', // sender address
        to: email, // list of recipients
        subject: "Furniture | Registration", // subject line
        text: "Furniture Monsta | Registration",
        html: `
<html>
<head>
<meta charset="UTF-8">
<title>Welcome to Monsta Furniture</title>
</head>

<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f5f5f5">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="margin:40px 0;border-radius:10px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td align="center" bgcolor="#8B5E3C" style="padding:35px;">
            <h1 style="margin:0;color:#ffffff;font-size:30px;">
                Monsta Furniture
            </h1>
            <p style="margin-top:10px;color:#f3e7de;font-size:16px;">
                Welcome to Our Family
            </p>
        </td>
    </tr>

    <!-- Welcome Section -->
    <tr>
        <td align="center" style="padding:50px 40px;">

            <div style="font-size:60px;">🎉</div>

            <h2 style="color:#333;font-size:30px;margin:20px 0 10px;">
                Registration Successful!
            </h2>

            <p style="font-size:16px;color:#666;line-height:28px;">
                Hello <strong>${req.body.name}</strong>,
            </p>

            <p style="font-size:16px;color:#666;line-height:28px;">
                Thank you for creating your account with
                <strong>Monsta Furniture</strong>.
                We're excited to have you with us!
            </p>

            <p style="font-size:16px;color:#777;line-height:28px;margin-top:25px;">
                Your account has been created successfully.
                You can now explore our latest furniture collection,
                manage your profile, and place orders easily.
            </p>

            <a href="http://localhost:3000/"
               style="display:inline-block;margin-top:25px;padding:15px 35px;background:#8B5E3C;color:#ffffff;text-decoration:none;border-radius:5px;font-weight:bold;">
                Explore Our Store
            </a>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td align="center" bgcolor="#fafafa" style="padding:25px;">

            <p style="margin:0;color:#555;font-size:18px;font-weight:bold;">
                Monsta Furniture
            </p>

            <p style="margin:10px 0 0;color:#777;font-size:14px;">
                Thank you for joining our community ❤️
            </p>

            <p style="margin-top:15px;color:#999;font-size:12px;">
                © 2026 Monsta Furniture. All Rights Reserved.
            </p>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
      });

      let dataRes = await userModel.insertOne(InsertObj);
      let current = dataRes._id;
      let updataRes = await userModel.updateOne(
        {
          _id: current,
        },
        {
          $set: { password: hashPassword },
        },
      );
      res.send({
        status: true,
        message: "User registerd successfully",
        data: dataRes,
      });
    } catch (err) {
      let error = {};
      for (let errorKeys in err.errors) {
        error[errorKeys] = err.errors[errorKeys].message;
      }
      res.send({
        status: false,
        message: "Error to registration",
        error,
      });
    }
  }
};

// login api

let LogIn = async (req, res) => {
  let { email, password } = req.body;

  let checkEmail = await userModel.findOne({ email });
  if (!checkEmail) {
    res.send({
      status: false,
      message: "Email not Found....",
    });
  } else {
    let dbpassword = checkEmail.password; // hash password
    let checkPassword = bcrypt.compareSync(password, dbpassword);
    if (checkPassword) {
      let token = jwt.sign({ id: checkEmail._id }, process.env.TOKENKEY);
      res.send({
        status: true,
        message: "Login Successfully",
        data: checkEmail,
        token,
      });
    } else {
      res.send({
        status: false,
        message: "password not match",
      });
    }
  }
};

// chaneg password

let changePassword = async (req, res) => {
  let { oldpassword, newpassword, confirmpassword } = req.body;
  let token = req.headers.authorization.split(" ")[1];

  let decoded = jwt.verify(token, process.env.TOKENKEY);

  let { id } = decoded;

  let userData = await userModel.findOne({ _id: id });
  let dbpassword = userData.password;
  try {
    let checkPassword = bcrypt.compareSync(oldpassword, dbpassword);
    if (checkPassword) {
      if (newpassword == confirmpassword) {
        let hashpassword = bcrypt.hashSync(newpassword, saltRounds);
        await userModel.updateOne(
          { _id: id },
          {
            $set: {
              password: hashpassword,
            },
          },
        );
        res.send({
          status: true,
          message: "password change successfully....",
        });
      } else {
        res.send({
          status: false,
          message: "new password and confim password not match",
          error: error.message,
        });
      }
    } else {
      res.send({
        status: false,
        message: "Invaild old password..",
        error: error.message,
      });
    }
  } catch (err) {
    let error = {};
    for (let Errorkeys in err.errors) {
      error[Errorkeys] = err.errors[Errorkeys].message;
    }
    res.send({ status: false, message: "Error to password changing." });
  }
};

let updateProfile = async (req, res) => {
  let { address, phone, name } = req.body;

  let token = req.headers.authorization.split(" ")[1];

  let decoded = jwt.verify(token, process.env.TOKENKEY);
  let { id } = decoded;
  let updateObj = {
    address,
    phone,
    name,
  };
  if (req.file) {
    if (req.file.filename) {
      updateObj["image"] = req.file.filename;
    }
  }

  await userModel.updateOne(
    { _id: id },
    {
      $set: updateObj,
    },
  );

  res.send({
    status: true,
    message: "Profile update successfully",
  });
};

let getProfile = async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    let decoded = jwt.verify(token, process.env.TOKENKEY);

    let { id } = decoded;

    let userData = await userModel.findOne({ _id: id });
    if (!userData) {
      res.send({ status: false, message: "user Not found" });
    } else {
      res.send({
        status: true,
        message: "Profile found",
        data: userData,
        path: process.env.USERPATH,
      });
    }
  } catch (error) {
    res.send({
      status: false,
      message: "unable to fetch profile",
      error: error.message,
    });
  }
};

let forgetPassword = async (req, res) => {
  let { email } = req.body;
  let emailCheckEd = await userModel.findOne({ email });
  if (emailCheckEd) {
    // http://localhost:3000/rest-pass

    await transporter.sendMail({
      from: "Furniture Store <officalchintu318@gmail.com>",
      to: email,
      subject: "Resest your password",
      html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset Password</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
        <td align="center">

            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:10px;overflow:hidden;">

                <!-- Header -->
                <tr>
                    <td align="center" style="background:#b3805b;padding:30px;">
                        <h1 style="margin:0;color:#ffffff;font-size:28px;">
                            Reset Your Password
                        </h1>
                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td style="padding:40px;">

                        <h2 style="margin-top:0;color:#222222;">
                            Hello,
                        </h2>

                        <p style="color:#555555;font-size:16px;line-height:28px;">
                            We received a request to reset your password.
                            Click the button below to create a new password.
                        </p>

                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td align="center" style="padding:30px 0;">
                                <button->
                                    <a href="${process.env.APPURL}rest-pass/${emailCheckEd._id}"
                                       style="background:#b3805b;
                                              color:#ffffff;
                                              text-decoration:none;
                                              padding:14px 35px;
                                              border-radius:6px;
                                              display:inline-block;
                                              font-size:16px;
                                              font-weight:bold;">
                                        Reset Password
                                    </a>
                                    </button>
                                </td>
                            </tr>
                        </table>

                        <p style="color:#555555;font-size:15px;line-height:26px;">
                            If the button doesn't work, copy and paste this link into your browser:
                        </p>

                        <p style="word-break:break-all;">
                            <a href="${process.env.APPURL}rest-pass/${emailCheckEd._id}" style="color:#b3805b;text-decoration:none;">
                                {${process.env.APPURL}rest-pass/${emailCheckEd._id}}
                            </a>
                        </p>

                        <p style="color:#555555;font-size:15px;line-height:26px;">
                            This password reset link will expire in <strong>30 minutes</strong>.
                        </p>

                        <p style="color:#555555;font-size:15px;line-height:26px;">
                            If you didn't request a password reset, you can safely ignore this email.
                        </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center"
                        style="background:#f8f8f8;padding:20px;color:#777777;font-size:13px;">
                        © 2026 Monsta furniture store. All Rights Reserved.
                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>`,
    })
    res.send({
      status:true,
      message:"Reset password link send your email.."
    })
  } else {
    res.send({ status: false, message: "Email not found..." });
  }
};

let restPassword=async(req,res)=>{
  let {id}=req.params;
  let {newpassword,confirempassword}=req.body;

  if (newpassword == confirempassword) {
        let hashpassword = bcrypt.hashSync(newpassword, saltRounds);
        await userModel.updateOne(
          { _id: id },
          {
            $set: {
              password: hashpassword,
            },
          },
        );
        res.send({
          status: true,
          message: "password change successfully....",
        });

      } else {
        res.send({
          status: false,
          message: "new password and confim password not match",
          
        });
      }


}

module.exports = {
  Register,
  LogIn,
  changePassword,
  updateProfile,
  getProfile,
  forgetPassword,restPassword
};
