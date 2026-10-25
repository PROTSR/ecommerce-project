const express = require('express')
const {UserRegister,UserLogin,ResetPasswordMail,verifyOtp,ChangePassword, UserData, UpdateData, UserLogout}=require('../controllers/userController')
const authMiddleware = require('../middleware/authmiddleware')
const Router = express.Router()

Router.post('/register',UserRegister)
Router.post('/login',UserLogin)
Router.post('/forgotpassword',ResetPasswordMail)
Router.post('/otp-verify',verifyOtp)
Router.post('/changepassword',ChangePassword)
Router.get('/profile',authMiddleware,UserData)
Router.put('/updateprofile',authMiddleware,UpdateData)
Router.post('/logout',UserLogout)

module.exports = Router