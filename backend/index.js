const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(`${process.env.DB_URL}`);

const Router = require("./router/user.router.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://brain-op-front.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is started...");
});

app.use("/api", Router);
app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port no. ${process.env.PORT}`);
});
