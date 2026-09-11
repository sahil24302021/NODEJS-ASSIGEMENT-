const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");

const app = express();
const PORT = 5000;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/assignment8")
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("MongoDB connection failed", error.message));

app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
