const userModel = require('../Models/user.js');
const { default: mongoose } = require('mongoose');
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/auth.js");

const createUser = async(req,res) => {
   //add a new user to the database with 
   //Username, Name, Email, Password, DateOfBirth, Type
   const salt = await bcrypt.genSalt();
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

   const newUser= new userModel({
    Username: req.body.username,
    Name: req.body.name,
    Email: req.body.email,
    Password: hashedPassword,
    DateOfBirth: req.body.dateOfBirth,
    Type:req.body.type
   });
   newUser.save().catch(err => console.log(err));
   res.status(200).send("created");
}

const getUsers = async (req, res) => {
   //retrieve all users from the database
   const users= await userModel.find({});
   console.log(users);
   res.status(200).send(users);
  }

const updateUser = async (req, res) => {
   //update a user in the database
   const salt = await bcrypt.genSalt();
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
   var Username= req.body.username;
   var Name= req.body.name;
   var Email= req.body.email;
   var Password= hashedPassword;
   var DateOfBirth= req.body.dateOfBirth;
   var Type= req.body.type;

   userModel.findOneAndUpdate({Username:Username},{Name:Name, Email:Email, Password:Password,
     DateOfBirth:DateOfBirth, Type:Type }).catch(err=> console.log(err));
   res.status(200).send("Updated");

  }

const deleteUser = async (req, res) => {
   //delete a user from the database
   var Username= req.body.username;
   await userModel.deleteOne({Username:Username});
   res.status(200).send("Deleted");
  }

  
  const login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = createToken(user._id);
      const maxAge = 3 * 24 * 60 * 60;
  
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const logout = (req, res) => {
    // Clear the JWT cookie to log the user out
    res.clearCookie("jwt"); 
    res.status(200).json({ message: "Logged out successfully" });
  };
  


module.exports = {createUser, getUsers, updateUser, deleteUser, login, logout};