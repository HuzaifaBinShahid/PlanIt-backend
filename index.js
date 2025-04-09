const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRoute = require("./routes/Todo.routes");

const app = express();

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;

  if (!process.env.MONGODB_URL) {
    console.error("MONGODB_URL is not set in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to MongoDB");
    isConnected = true;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


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

// Routes
app.use("/api/todos", todoRoute);

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;