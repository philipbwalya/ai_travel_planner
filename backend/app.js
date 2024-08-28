const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const tripRouter = require("./routes/tripRoute");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/trips", tripRouter);

module.exports = app;
