const express = require("express");
const router = express.Router();

const authContorller = require("../controllers/authController");

router.post("/login", authContorller.loginWithEmail);

module.exports = router;
