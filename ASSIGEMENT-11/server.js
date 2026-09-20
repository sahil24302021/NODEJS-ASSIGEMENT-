const express = require("express");
const mongoose = require("mongoose");

const teacherRouter = require("./router/teacherRouter");
const studentRouter = require("./router/studentRouter");

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/assignment11")
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });

// Routes
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Assignment 11 API is running",
  });
});