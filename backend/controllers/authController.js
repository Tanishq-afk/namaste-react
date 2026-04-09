const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const {
  validateSignUpData,
  validateLogin,
  validateGoogleAuthBody,
} = require("../utils/validation");
const bcrypt = require("bcrypt");

const DUPLICATE_KEY_ERROR_CODE = 11000;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getDuplicateUserErrorMessage = (err) => {
  if (err?.code !== DUPLICATE_KEY_ERROR_CODE) {
    return null;
  }

  const duplicateField =
    Object.keys(err?.keyPattern || {})[0] ||
    Object.keys(err?.keyValue || {})[0];

  if (duplicateField === "emailId") {
    return "User with this email already exists. Please login instead.";
  }
  if (duplicateField === "googleId") {
    return "This Google account is already linked with another user.";
  }

  return "Duplicate user data found.";
};

const splitNameForSchema = (fullName = "") => {
  const cleaned = fullName.trim();
  if (!cleaned) return { firstName: "GoogleUser", lastName: "User" };

  const parts = cleaned.split(/\s+/);
  const first = parts.shift() || "GoogleUser";
  const firstName = first.length >= 4 ? first : `${first}User`;
  const lastName = parts.join(" ") || "User";

  return {
    firstName: firstName.slice(0, 50),
    lastName: lastName.slice(0, 50),
  };
};

const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const buildAuthResponse = (user, message, token) => ({
  message,
  user: {
    name: `${user.firstName} ${user.lastName}`,
    email: user.emailId,
  },
  token,
});

const googleAuth = async (req, res) => {
  try {
    validateGoogleAuthBody(req);
    const { idToken } = req.body;

    if (!process.env.GOOGLE_CLIENT_ID) {
      throw new Error("GOOGLE_CLIENT_ID is not configured");
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleId = payload?.sub;
    const emailId = payload?.email?.toLowerCase();
    const emailVerified = payload?.email_verified;
    const fullName = payload?.name || "";

    if (!googleId || !emailId || !emailVerified) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.findOne({ emailId });

      if (user) {
        if (user.googleId && user.googleId !== googleId) {
          return res.status(409).json({
            message: "This email is already linked with another Google account.",
          });
        }
        user.googleId = googleId;
        await user.save();
      } else {
        const { firstName, lastName } = splitNameForSchema(fullName);
        user = new User({
          firstName,
          lastName,
          emailId,
          googleId,
        });
        await user.save();
      }
    }

    const token = await user.getJWT();
    res.cookie("token", token, getCookieOptions());

    return res.json(buildAuthResponse(user, "Google login successful", token));
  } catch (err) {
    const duplicateMessage = getDuplicateUserErrorMessage(err);
    if (duplicateMessage) {
      return res.status(409).json({ message: duplicateMessage });
    }
    return res.status(400).send("ERROR: " + err.message);
  }
};

const signup = async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      if (existingUser.googleId && !existingUser.password) {
        return res.status(409).json({
          message:
            "This email is already registered with Google. Please use Google login.",
        });
      }

      return res.status(409).json({
        message: "User with this email already exists. Please login instead.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    const token = await user.getJWT();
    return res.json(buildAuthResponse(user, "User Added successfully!", token));
  } catch (err) {
    const duplicateMessage = getDuplicateUserErrorMessage(err);
    if (duplicateMessage) {
      return res.status(409).json({ message: duplicateMessage });
    }
    return res.status(400).send("ERROR: " + err.message);
  }
};

const login = async (req, res) => {
  try {
    validateLogin(req);
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (!user.password) {
      return res
        .status(400)
        .json({ message: "Use Google login for this account." });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = await user.getJWT();
    res.cookie("token", token, getCookieOptions());

    return res.json(buildAuthResponse(user, "Login Successful!!!", token));
  } catch (err) {
    return res.status(400).send("ERROR: " + err.message);
  }
};

const logout = async (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successfully!!!" });
};

const profile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);

    res.json({
      user: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailId,
      },
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  googleAuth,
  signup,
  login,
  logout,
  profile,
};
