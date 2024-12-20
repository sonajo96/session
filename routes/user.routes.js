const express = require("express");
const { register, login,findall,getperson,updateuser,deleteuser} = require("../controller/user.controller");


const router = express.Router();


router.post("/register", register);

router.post("/login", login);
router.get("/getall",findall)
router.get("/getperson",getperson)
router.put("/updateuser/:id",updateuser)
router.delete('/deleteuser/:id',deleteuser)


module.exports = router;
