const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
const router = require("./routers/api.js");
require("dotenv").config();
app.use(cors());
const port = process.env.PORT || 80;
const mongodb = process.env.MONGODB_URL || "";
const hostname = process.env.HOST_NAME || "localhost";

async function connect() {
  try {
    await mongoose.connect(mongodb);
    console.log("connect thành công");
  } catch (error) {
    console.log("connect không thành công");
  }
}
connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`server running on http://${hostname}:${port}/api`);
});
