const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const todoRoute = require("../routes/Todo.routes")

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());


// routes
app.use("/api/todos", todoRoute)

module.exports.handler = serverless(app);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Databse Got Connected");
    app.listen(5000, () => {
      console.log("🚀 Server is running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log("❌ Error Connecting to Database:", error);
  });
