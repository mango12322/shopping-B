const express = require("express");
const router = express.Router();

const userApi = require("./userApi");
const authApi = require("./authApi");
const productApi = require("./productApi");

router.use("/user", userApi);
router.use("/auth", authApi);
router.use("/product", productApi);
module.exports = router;
