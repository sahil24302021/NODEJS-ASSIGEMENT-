const express = require("express");
const bcrypt = require("bcrypt");

const Teacher = require("../model/teacherModel");

const router = express.Router();

// POST /teacher/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, subject } = req.body;

    // Basic validation
    if (!name || !email || !password || !subject) {
      return res.status(400).json({
        success: false,
        message: "All teacher fields are required",
      });
    }

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create teacher
    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      subject,
    });

    res.status(201).json({
      success: true,
      message: "Teacher registered successfully",
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject,
      },
    });
  } catch (error) {
    console.log(error);

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;