const mongoose = require('mongoose')

async function connectDB() {
   await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
  console.log("database connected successfully")
    }).catch((e)=>{
        console.log("error while connecting databse",e)
    })
}

module.exports = connectDB