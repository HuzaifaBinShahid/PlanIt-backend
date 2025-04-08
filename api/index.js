const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const serverless = require("serverless-http");

const todoRoute = require("../routes/Todo.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/todos", todoRoute);

// Validate MONGODB_URL exists
if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not set in the environment variables.");
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Database Connected");
  })
  .catch((error) => {
    console.error("❌ Error connecting to database:", error);
  });

// Export the serverless handler
module.exports.handler = serverless(app);
