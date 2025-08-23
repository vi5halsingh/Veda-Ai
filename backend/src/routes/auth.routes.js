const express = require('express')
const  router = express.Router()
const authController =require("../controllers/auth.controller")
router.post('/register',authController.userRegister)
router.post('/login',authController.loginUser)


 module.exports  = router