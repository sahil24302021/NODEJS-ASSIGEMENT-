const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Student email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Student password is required"],
      minlength: [6, "Password must contain at least 6 characters"],
    },

    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be greater than 0"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = studentSchema;