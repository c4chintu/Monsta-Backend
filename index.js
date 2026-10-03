require("dotenv").config();
let express = require("express");
// let mongoose = require("mongoose");
let cors = require("cors");
const adminRoutes = require("./App/routes/adminRoute");
const dbconntiion = require("./App/config/dbconnetion");
const webRoutes = require("./App/routes/webRoute");
const adminModel = require("./App/models/adminModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

let server = express();

server.use(express.json());
server.use(cors());
server.use("/uploads/category", express.static("uploads/category"));
server.use("/uploads/subcategory", express.static("uploads/subcategory"));
server.use("/uploads/subsubcategory", express.static("uploads/subsubcategory"));
server.use("/uploads/product", express.static("uploads/product"));
server.use("/uploads/user", express.static("uploads/user"));
server.use("/uploads/slider", express.static("uploads/slider"));

server.use("/admin", adminRoutes);
server.use("/web", webRoutes);

server.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Furniture Monsta Backend API is running successfully",
    routes: {
      admin: "/admin",
      web: "/web",
    },
  });
});

server.listen(process.env.PORT || 8000, async () => {
  try {
    await dbconntiion();

    const adminEmail = process.env.ADMINEMAIL || "officalchintu318@gmail.com";
    const adminPassword = process.env.ADMINPASSWORD || "qwertyuiop";
    const hashPassword = bcrypt.hashSync(adminPassword, saltRounds);

    let chackAdmin = await adminModel.findOne({ email: adminEmail });
    if (!chackAdmin) {
      await adminModel.create({
        name: "Admin",
        email: adminEmail,
        password: hashPassword,
      });
      console.log("Admin account created successfully:", adminEmail);
    } else {
      if (!bcrypt.compareSync(adminPassword, chackAdmin.password)) {
        chackAdmin.password = hashPassword;
        await chackAdmin.save();
        console.log("Admin password updated to match .env config:", adminEmail);
      } else {
        console.log("Admin account verified:", adminEmail);
      }
    }
  } catch (err) {
    console.error("Server init error:", err.message);
  }

  console.log("server start furniture api on port", process.env.PORT || 8000);
});
