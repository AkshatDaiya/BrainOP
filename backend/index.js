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

app.use(cors({
  origin: 'https://brain-op-front.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  res.send('Server is started...');
});

app.use(cookieParser());
app.use("/api", Router);
app.use(express.static("public"));
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port no. ${process.env.PORT}`)
);
