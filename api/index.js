const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const serverless = require("serverless-http");

const todoRoute = require("../routes/Todo.routes");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/todos", todoRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Database Connected");
  })
  .catch((error) => {
    console.error("❌ Error connecting to database:", error);
  });

module.exports.handler = serverless(app);
