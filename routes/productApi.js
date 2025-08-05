const express = require("express");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const router = express.Router();

// 상품 생성
router.post(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  productController.createProduct
);

module.exports = router;
