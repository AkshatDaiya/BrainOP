const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(`${process.env.DB_URL}`);
const Router = require("./router/user.router.js");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api", Router);
app.use(express.static("public"));
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port no. ${process.env.PORT}`)
);
