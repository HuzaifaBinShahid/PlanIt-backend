const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRoute = require("../routes/Todo.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/todos", todoRoute);

// Database connection
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;

  // Validate MONGODB_URL exists
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set in the environment variables.");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

// Root route for healthcheck
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

// Handle all requests
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectToDatabase();
  }
  next();
});

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for Vercel
module.exports = app;