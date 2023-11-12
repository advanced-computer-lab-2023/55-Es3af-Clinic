const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");


const auth = (req, res, next) => {
    
  const token = req.cookies.jwt;
  
  // check json web token exists & is verified
  
  if (token) {
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You are not logged in." });
        // res.redirect('/login');
      } else {
       
        next();
      }
    });
  } else {
    console.log("i am here");
    res.status(401).json({ message: "You are not logged in." });
  }
};



const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
  return jwt.sign({ name }, "supersecret", {
    expiresIn: maxAge,
  });
};

module.exports = { auth, createToken };