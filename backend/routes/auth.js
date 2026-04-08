const express = require("express");
const { googleAuth, signup, login, logout } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/auth/google", googleAuth);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

module.exports = authRouter;
