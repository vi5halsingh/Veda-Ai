const express = require('express')
const  router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware");
const authController =require("../controllers/auth.controller")
router.post('/register',authController.userRegister)
router.post('/login',authController.loginUser)
// Add logout route
router.post('/logout',authMiddleware.authUser, authController.logoutUser);

 module.exports  = router