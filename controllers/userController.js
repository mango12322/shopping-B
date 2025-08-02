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

module.exports = userController;
