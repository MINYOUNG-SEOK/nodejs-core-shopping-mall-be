const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

// 회원가입
router.post("/", userController.createUser);
router.get("/me", authController.authenticate, userController.getUser); // 토큰이 유효한지, 토큰 값 가지고 유저 찾아서 리턴

module.exports = router;
