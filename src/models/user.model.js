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
},
{timestamps:true});

const userModel = mongoose.model("Users", userSchema)
module.exports = userModel
