const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
async function userRegister(req, res) {
  const {
    email,
    fullname: { firstname, lastname },
    password,
  } = req.body;

  const existUser = await userModel.findOne({ email });

  if (existUser) {
    return res.status(409).json({ msg: "user already exists" });
  }
  const hashPW = await bcrypt.hash(password, 11);
  const user = await userModel.create({
    email,
    fullname: {
      firstname,
      lastname,
    },
    password: hashPW,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, { httpOnly: true });
  // console.log(token);

  return res.status(200).json({
    msg: "user registered successfully",
    user: {
      email: user.email,
      id: user._id,
      fullname: user.fullname,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "not registered" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, { httpOnly: true });
  // console.log(token);

  return res.status(200).json({
    msg: "user logged in successfully",
    user: {
      email: user.email,
      id: user._id,
      fullname: user.fullname,
    },
  });
}

// Add logout function
async function logoutUser(req, res) {
  try {
    // Clear token cookie
    res.clearCookie("token");
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Logout failed" });
  }
}

// Update exports
module.exports = { userRegister, loginUser, logoutUser };
