import express from "express";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";

const morgan = require("morgan");
require("dotenv").config();

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
app.use(morgan("dev"));

// route
fs.readdirSync("./routes").map((element) => {
  app.use("/api", require(`./routes/${element}`));
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
