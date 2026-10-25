const express = require('express')
const { AdminRegister, AdminLogin,AdminResetPasswordMail,verifyOtp,ChangePassword,AdminData, AdminLogout }=require('../controllers/adminuserController')
const AdminMiddleware =require('../middleware/AdminMiddleware')
const Router = express.Router()


Router.post('/register',AdminRegister)
Router.post('/login',AdminLogin)
Router.post('/forgot-password',AdminResetPasswordMail)
Router.post('/otpverify',verifyOtp)
Router.post('/change-password',AdminMiddleware,ChangePassword)
Router.post('/adminprofile',AdminMiddleware,AdminData)
Router.post('/admin-logout',AdminLogout)


module.exports = Router