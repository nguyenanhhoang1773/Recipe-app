const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
var cors = require("cors");
app.use(cors());

const router = require("./routers/api.js");
const port = process.env.PORT || 80;
const mongodb = process.env.MONGODB_URL || "";
const hostname = process.env.HOST_NAME || "localhost";

async function connect() {
  try {
    await mongoose.connect(mongodb);
    console.log("connect thành công");
  } catch (error) {
    console.log("connect không thành công");
    console.log(error);
  }
}
connect();

app.use("/api", router);

app.listen(port, () => {
  console.log(`server running on http://${hostname}:${port}/api`);
});
