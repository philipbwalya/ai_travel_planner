const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const loanRouter = require("./routes/loanRoute");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/loans", loanRouter);

module.exports = app;
