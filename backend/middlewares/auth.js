const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not configured");
    }

    const { token } = req.cookies;

    if (!token) {
      throw new Error("Authentication token missing");
    }

    const decodedObj = jwt.verify(token, jwtSecret);
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};