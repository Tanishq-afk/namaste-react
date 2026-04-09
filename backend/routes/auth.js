const express = require("express");
const {
  googleAuth,
  signup,
  login,
  logout,
  profile,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/auth/google", googleAuth);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/profile", profile);

module.exports = authRouter;
