const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Teacher name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Teacher email is required"],
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
      required: [true, "Teacher password is required"],
      minlength: [6, "Password must contain at least 6 characters"],
    },

    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = teacherSchema;