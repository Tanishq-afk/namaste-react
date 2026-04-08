const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

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
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port 4000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err.message);
  });
