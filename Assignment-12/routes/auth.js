const express = require("express");

const {
  register,
  login
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to your private profile",
    user: {
      id: req.user.userId,
      email: req.user.email
    }
  });
});

module.exports = router;