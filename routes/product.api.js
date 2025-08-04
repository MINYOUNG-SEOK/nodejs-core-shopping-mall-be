const express = require("express");
const authController = require("../controllers/auth.controller");
const productController = require("../controllers/product.controller");
const router = express.Router();

// 상품 등록하기
router.post(
  "/",
  authController.authenticate,
  authController.checkAdminPermission,
  productController.createProduct
);

// 상품 읽어오기
router.get("/", productController.getProducts);

module.exports = router;
