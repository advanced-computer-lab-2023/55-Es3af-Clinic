const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");


const auth = (req, res, next) => {

const token = req.cookies.jwt;
console.log("Token from Request:", token);
  
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        console.log("Error in JWT verification:", err);
        res.status(401).json({ message: "You are not logged in." });
      } else {
        console.log("Decoded Token:", decodedToken);
        next();
      }
    });    
  } else {
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