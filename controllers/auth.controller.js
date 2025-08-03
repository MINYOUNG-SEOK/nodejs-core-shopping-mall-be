const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("로그인 시도:", email);

    let user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // token 만들어주기
        const token = await user.generateToken();
        console.log("로그인 성공:", email);
        return res.status(200).json({
          status: "성공",
          user,
          token,
          message: "로그인 완료",
        });
      }
    }
    console.log("로그인 실패:", email);
    throw new Error("invalid email or password");
  } catch (error) {
    console.log("로그인 에러:", error.message);
    res.status(401).json({
      status: "실패",
      error: "이메일 또는 비밀번호 오류",
    });
  }
};

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      console.log("토큰 없음");
      throw new Error("Token not found");
    }
    const token = tokenString.replace("Bearer ", "");

    const payload = await jwt.verify(token, JWT_SECRET_KEY);
    req.userId = payload._id;
    console.log("토큰 검증 성공:", payload._id);
    next();
  } catch (error) {
    console.log("토큰 검증 에러:", error.message);
    res.status(401).json({ status: "실패", error: "토큰 오류" });
  }
};

authController.checkAdminPermission = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (user.level !== "admin") throw new Error("no permission");
    next();
  } catch (error) {
    res.status(400).json({ status: "실패", error: error.message });
  }
};

module.exports = authController;
