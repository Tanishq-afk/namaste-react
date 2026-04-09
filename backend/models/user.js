const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address " + value);
        }
        return true;
      },
    },
    googleId: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // only required if not Google login
      },
      validate(value) {
        if (value == null) return true;

        const isBcryptHash =
          value.startsWith("$2a$") ||
          value.startsWith("$2b$") ||
          value.startsWith("$2y$");

        if (isBcryptHash) return true;

        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password");
        }
        return true;
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index(
  { googleId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      googleId: { $exists: true, $type: "string" },
    },
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
