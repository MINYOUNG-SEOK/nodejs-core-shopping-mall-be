const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userController = {};

userController.createUser = async (req, res) => {
  try {
    let { email, password, name, level } = req.body;
    console.log("회원가입 시도:", email);

    const user = await User.findOne({ email });
    if (user) {
      console.log("이미 있는 이메일:", email);
      throw new Error("User already exist");
    }
    const salt = await bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password,
      name,
      level: level ? level : "customer",
    });
    await newUser.save();
    console.log("회원가입 성공:", email);
    return res.status(201).json({ status: "성공", message: "회원가입 완료" });
  } catch (error) {
    console.log("회원가입 에러:", error.message);
    res.status(400).json({ status: "실패", error: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    console.log("사용자 정보 조회:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("사용자 없음:", userId);
      return res.status(404).json({ status: "실패", error: "사용자 없음" });
    }
    console.log("사용자 정보 조회 성공:", user.email);
    res.status(200).json({ status: "성공", user });
  } catch (error) {
    console.log("사용자 조회 에러:", error.message);
    res.status(400).json({ status: "실패", error: error.message });
  }
};

module.exports = userController;
