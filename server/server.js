import express from "express";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";

const morgan = require("morgan");
require("dotenv").config();

const csrfProtection = csrf({ cookie: true });

// db
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB error => ", err);
  });

// create express app
const app = express();

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// route
fs.readdirSync("./routes").map((element) => {
  app.use("/api", require(`./routes/${element}`));
});

// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
