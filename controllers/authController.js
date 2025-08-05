const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authContorller = {};

authContorller.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = await user.generateToken();
        return res.status(200).json({ status: "성공", user, token });
      }
    }

    throw new Error("이메일 또는 패스워드가 틀렸습니다!");
  } catch (error) {
    res.status(400).json({ status: "실패", error: error.message });
  }
};

authContorller.authenticate = async (req, res, next) => {
  try {
    // 헤더에서 토큰 가져오기
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("토큰이 없습니다.");
    }

    // 토큰이 있으면
    const token = tokenString.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    req.userId = payload._id;
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

authContorller.checkAdminPermission = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findbyId(userId);
    if (user.level !== "admin") throw new Error("권한이 없습니다.");
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = authContorller;
