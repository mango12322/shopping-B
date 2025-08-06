const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// 회원가입
router.post("/", userController.createUser);
// 토큰 값을 받는데 (header)
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
