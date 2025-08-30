const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    firstname: {
      type: String,
      required: true,
    },
     lastname: {
      type: String,

    },
  },
  password: {
    type: String,
    required: true,
  },
  tokenLimit: {
    type: Number,
    default: 30,
  },
  tokenResetAt: {
    type: Date,
    default: () => new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  },
},
{timestamps:true});

const userModel = mongoose.model("Users", userSchema)
module.exports = userModel