const { transporter } = require("../../config/helper");
const contectModel = require("../../models/contactModel");

let enquireySave = async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: '"Monsta furniture" <officalchintu318@gmail.com>', // sender address
      to: "rdkanwa24@gmail.com", // list of recipients
      subject: "Furniture | contect Enquiry", // subject line
      text: "Furniture | contect Enquiry", // plain text body
      html: `
<html>
<head>
<meta charset="UTF-8">
<title>Thank You</title>
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
        </td>
    </tr>

    <!-- Thank You -->
    <tr>
        <td align="center" style="padding:50px 40px;">

            <div style="font-size:60px;">🎉</div>

            <h2 style="color:#333;font-size:30px;margin:20px 0 10px;">
                Thank You!
            </h2>

                <div style="background:#f8f8f8;padding:20px;border-radius:8px;line-height:28px;font-family:Arial,sans-serif;">

                     <p><strong>Name:</strong> ${req.body.name}</p>

                     <p><strong>Email:</strong> ${req.body.email}</p>

                     <p><strong>Phone:</strong> ${req.body.phone}</p>

                    <p>
                      <strong>Message:</strong><br>
                        ${req.body.message}
                     </p>

                </div>

            <p style="font-size:16px;color:#777;line-height:28px;margin-top:20px;">
                Thank you for shopping with <strong>Monsta Furniture</strong>.
                Your order has been received successfully and our team is preparing it.
            </p>

            <p style="font-size:16px;color:#777;line-height:28px;">
                We appreciate your trust and can't wait for you to enjoy your new furniture.
            </p>

            <a href="http://localhost:3000/"
               style="display:inline-block;margin-top:20px;padding:15px 35px;background:#8B5E3C;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold;">
                Visit Our Store
            </a>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td align="center" bgcolor="#fafafa" style="padding:25px;">

            <p style="margin:0;color:#555;font-size:16px;">
                Monsta Furniture
            </p>

            <p style="margin:10px 0 0;color:#999;font-size:13px;">
                Thank you for choosing us ❤️
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
      `, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }

  let contactRes = await contectModel.insertOne(req.body);
  let obj = {
    status: true,
    message: "Enquiry saved successfully",
    data: contactRes,
  };
  res.send(obj);
};
module.exports = { enquireySave };
