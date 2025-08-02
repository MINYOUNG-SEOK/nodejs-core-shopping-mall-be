const bcrypt = require("bcryptjs");
const User = require("../models/User");

const authController = {};

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // token 만들어주기
        const token = await user.generateToken();
        return res.status(200).json({ status: "성공", user, token });
      }
    }
    throw new Error("invalid email or password");
  } catch (error) {
    res.status(400).json({ status: "실패", error: error.message });
  }
};

module.exports = authController;
