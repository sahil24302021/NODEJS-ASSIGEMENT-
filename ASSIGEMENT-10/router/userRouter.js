const express = require("express");

const router = express.Router();

const db = require("../config/firebase");
const userSchema = require("../schema/userSchema");


// POST - Create User
router.post("/api/users", async (req, res) => {
    try {

        // Validate request data
        const { error, value } = userSchema.validate(req.body, {
            abortEarly: false
        });

        if (error) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.details.map((detail) => detail.message)
            });
        }

        // Store user in Firestore
        const docRef = await db.collection("users").add({
            name: value.name,
            email: value.email,
            age: value.age,
            course: value.course
        });

        res.status(201).json({
            message: "User stored successfully",
            userId: docRef.id
        });

    } catch (error) {

        console.error("Database Error:", error);

        res.status(500).json({
            message: "Database error",
            error: error.message
        });
    }
});


module.exports = router;