const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const User = require("./models/user");

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:1234", "http://127.0.0.1:1234"];
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const helmet = require("helmet");

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginOpenerPolicy: false,
}));

const authRouter = require("./routes/auth");
const devRouter = require("./routes/dev");

app.use("/", authRouter);
app.use("/", devRouter);

connectDB()
  .then(async () => {
    try {
      await User.syncIndexes();
    } catch (err) {
      console.error("Index sync failed:", err.message);
    }

    console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
      console.log(`Server is successfully listening on port ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err.message);
  });
