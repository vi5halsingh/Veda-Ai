const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

async function authUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(500).json("unauthoqized user");
  }
  try {
    const decode = await jwt.decode(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decode.id);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized" });
  }
}

module.exports = {authUser}