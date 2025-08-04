const User = require("../models/User");
const bcrypt = require("bcrypt");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    let { email, password, name, level } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("유저 이미 존재합니다.");
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

    return res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "실패", error: err.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    // 해당 ID의 유저가 DB에 없을 경우
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

module.exports = userController;
