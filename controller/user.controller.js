const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../utilis/jwt.utils");
const User = require("../models/user");


const register = async (req, res) => {
  try {
    const { username, email, mobile,password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email,mobile, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: "User registration failed", error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;

    
    const user = await User.findOne({ where: { username }});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id, email: user.email });
     req.session.token=token;  
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getperson=async(req,res)=>{
const tokens=req.session.tokens;
const authheader=req.headers.authorization;
     if(!authheader || !authheader.startsWith("Bearer")){
    return res.status(401).json({message:"unathorized"});
  }
  const token=authheader.split(" ")[1];
  const run=verifyToken(token);
  if(!run){
    return res.status(401).json({message:"Invalid token"});
  }
  try{
    const user=await User.findByPk(run.id);
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    res.json({user});
  }catch(error){
    res.status(500).json({message:"internal server error",error});
  }
};
const updateuser = async (req, res) => {
  const { id } = req.params; 
  const { username, email, password } = req.body; 

  try {
    
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send("User not found"); 
    }

   
    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); 
      user.password = hashedPassword;
    }

    await user.save(); 

    res.status(200).send("User updated successfully"); 
  } catch (error) {
    console.error(error); 
    res.status(500).send("An error occurred while updating the user"); 
  }
};
const deleteuser = async (req, res) => {
  const { id } = req.params;

  try {
    
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" }); 
    }

  
    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" }); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "An error occurred while deleting the user", error: error.message }); 
  }
};


 const findall=async(req,res)=>{
  try{
    const users=await User.findAll();
    res.json({users})
  }catch(err){
    res.status(404).json({message:"error"})
  }
};

  
  module.exports = { register, login, findall, getperson, updateuser,deleteuser };
  
