const express = require("express");
const bcrypt = require("bcrypt");

const Student = require("../model/studentModel");

const router = express.Router();

// POST /student/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course, age } = req.body;

    // Basic validation
    if (!name || !email || !password || !course || !age) {
      return res.status(400).json({
        success: false,
        message: "All student fields are required",
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      course,
      age,
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        age: student.age,
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