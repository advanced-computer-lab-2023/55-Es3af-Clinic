const userModel = require('../Models/user.js');
const { default: mongoose } = require('mongoose');

const createUser = async(req,res) => {
   //add a new user to the database with 
   //Username, Name, Email, Password, DateOfBirth, Type
   const newUser= new userModel({
    Username: req.body.username,
    Name: req.body.name,
    Email: req.body.email,
    Password: req.body.password,
    DateOfBirth: req.body.dateOfBirth,
    Type:req.body.dateOfBirth
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
   var Username= req.body.username;
   var Name= req.body.name;
   var Email= req.body.email;
   var Password= req.body.password;
   var DateOfBirth= req.body.dateOfBirth;
   var Type= req.body.tyoe;

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


module.exports = {createUser, getUsers, updateUser, deleteUser};