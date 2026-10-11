const express = require('express')
const { AdminRegister, AdminLogin,AdminResetPasswordMail,verifyOtp,ChangePassword,AdminData }=require('../controllers/adminuserController')
const Router = express.Router()


Router.post('/register',AdminRegister)
Router.post('/login',AdminLogin)
Router.post('/forgot-password',AdminResetPasswordMail)
Router.post('/otpverify',verifyOtp)
Router.post('/change-password',ChangePassword)
Router.post('/adminprofile',AdminData)


module.exports = Router