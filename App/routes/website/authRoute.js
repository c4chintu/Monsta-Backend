let express=require("express")
const { Register, LogIn, changePassword, updateProfile, getProfile, forgetPassword, restPassword } = require("../../controllers/website/authControler")

let authRoutes=express.Router()

const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ file.originalname);
  },
});

const upload = multer({ storage: storage });

authRoutes.post("/register",Register)
authRoutes.post("/login",LogIn)
authRoutes.post("/changepassword",changePassword)
authRoutes.post("/updateprofile",upload.single("image")  ,updateProfile)
authRoutes.get("/profile",  getProfile)
authRoutes.post("/forget-password",forgetPassword)
authRoutes.post("/rest-pass/:id",restPassword)
module.exports=authRoutes