const express = require("express");
const { register, login,findall,getperson,updateuser,logout } = require("../controller/user.controller");


const router = express.Router();


router.post("/register", register);

router.post("/login", login);
router.get("/getall",findall)
router.get("/getperson",getperson)
router.put("/updateuser/:id",updateuser)
router.post("/logout", logout);

module.exports = router;
