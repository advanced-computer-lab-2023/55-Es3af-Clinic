const userModel = require("../Models/user.js");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/auth.js");
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const createUser = async (req, res) => {
  //add a new user to the database with
  //Username, Name, Email, Password, DateOfBirth, Type
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new userModel({
    Username: req.body.username,
    Name: req.body.name,
    Email: req.body.email,
    Password: hashedPassword,
    DateOfBirth: req.body.dateOfBirth,
    Type: req.body.type,
  });
  newUser.save().catch((err) => console.log(err));
  res.status(200).send("created");
};

const getUsers = async (req, res) => {
  //retrieve all users from the database
  const users = await userModel.find({});
  console.log(users);
  res.status(200).send(users);
};

const updateUser = async (req, res) => {
  //update a user in the database
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  var Username = req.body.username;
  var Name = req.body.name;
  var Email = req.body.email;
  var Password = hashedPassword;
  var DateOfBirth = req.body.dateOfBirth;
  var Type = req.body.tyoe;

  userModel
    .findOneAndUpdate(
      { Username: Username },
      {
        Name: Name,
        Email: Email,
        Password: Password,
        DateOfBirth: DateOfBirth,
        Type: Type,
      }
    )
    .catch((err) => console.log(err));
  res.status(200).send("Updated");
};

const deleteUser = async (req, res) => {
  //delete a user from the database
  var Username = req.body.username;
  await userModel.deleteOne({ Username: Username });
  res.status(200).send("Deleted");
};

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

const forgetPassword = async (req, res) => {
  const { username, email } = req.body;

  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash("55Es3afACL", salt);
  // var newPassword = hashedPassword;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "55es3afclinicpharmacy@gmail.com",
      pass: "itqq jnfy kirk druf",
    },
  });

  const user = await userModel.findOne({ username: username, email: email });

  if (!user) res.status(200).send("username or email is wrong");
  else {
    // await userModel.findByIdAndUpdate(user._id.valueOf(), {
    //   password: newPassword,
    // });
    const info = await transporter.sendMail({
      from: '"Clinic" <55es3afclinicpharmacy@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Password Reset", // Subject line
      text: "Click on this link to reset your password", // plain text body
      html: `<b>Click on this <a href = "http://localhost:3000/resetPassword/${user._id.valueOf()}">link</a> to reset your password</b>`, // html body
    });
    res.status(200).send("an email has been sent");
  }
};

const resetPassword = async(req, res) => {
  const { password } = req.body;
  const id = req.params.id

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  var newPassword = hashedPassword;

  const user = await userModel.findById(id);

  if(!user) res.status(200).send('Username is incorrect')
  else{
    await userModel.findByIdAndUpdate(id, {
      password: newPassword,
    });
    res.status(200).send("Password updated successfully!");
  }
}

async function getPassword(id, password){
  var user = await userModel.findById(id)

  console.log(`user password: ${user.password}`)
  console.log(`old password: ${password}`)

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(isPasswordValid) return true
  else return false
}

const changePassword = async (req, res) => {
  //const currPassword = req.body.password
  const token = req.cookies.jwt;
  var id = ''
  jwt.verify(token, "supersecret", (err, decodedToken) => {
    if (err) {
      console.log('You are not logged in.');
      // res send status 401 you are not logged in
      res.status(401).json({ message: "You are not logged in." });
      // res.redirect('/login');
    } else {
      id = decodedToken.name;
      console.log('got the id')
    }
  });

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
  var newPassword = hashedPassword;

  console.log(`current password: ${req.body.oldPassword}`)

  var message = ''

  var correct = await getPassword(id, req.body.oldPassword)

  if(correct) {
    console.log('correct current password')
    const isPasswordValid = await bcrypt.compare(req.body.oldPassword, req.body.newPassword);
    if(isPasswordValid) {
      console.log('same same')
      message = 'new password is the same as the current'
    }
    else{
      try {
        await userModel.findByIdAndUpdate(id, { password: newPassword });
        message = "Password updated successfully"
      } catch (err) {
        console.error(err);
      }
    }
  }
  else {
    console.log('wrong current password')
    message = 'wrong current password'
  }

  res.status(200).send(message)
};



module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  login,
  logout,
  forgetPassword,
  changePassword,
  resetPassword,
};
