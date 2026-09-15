const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./router/userRouter");

const app = express();


// Middleware
app.use(express.json());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/assignment8")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// Routes
app.use("/", userRouter);


// Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});