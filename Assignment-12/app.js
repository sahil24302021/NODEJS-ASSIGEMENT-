const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");

app.use("/", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Authentication API is running"
  });
});

module.exports = app;