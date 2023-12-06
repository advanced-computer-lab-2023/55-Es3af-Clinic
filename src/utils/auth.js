const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "supersecret", (err, decodedToken) => {
      if (err) {
        console.log("Error in JWT verification:", err);
        res.status(401).json({ message: "You are not logged in." });
      } else {
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
