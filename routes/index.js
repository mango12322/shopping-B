const express = require("express");
const router = express.Router();

const userApi = require("./userApi");
const authApi = require("./authApi");

router.use("/user", userApi);
router.use("/auth", authApi);

module.exports = router;
