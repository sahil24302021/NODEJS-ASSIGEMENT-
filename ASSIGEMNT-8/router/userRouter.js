const express = require("express");
const User = require("../model/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: "User added successfully", user });
    } catch (error) {
        res.status(500).json({ message: "User not added", error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Users not found", error: error.message });
    }
});

module.exports = router;
