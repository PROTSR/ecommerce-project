require('dotenv').config()
const mongoose = require('mongoose')
const AdminUser = require('../models/Adminuser')
const Bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { generateOtp, Transporter } = require("../config/email")


const AdminRegister = async (req, res) => {
    try {
        const { name, gender, email, password, employee_code } = req.body
        const existingUser = await AdminUser.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }

        const salt = await Bcrypt.genSalt(10)
        const hashPassword = await Bcrypt.hash(password, salt)

        const newUser = await AdminUser.create({
            name,
            employee_code,
            gender,
            email,
            password: hashPassword
        })

        if (newUser) {
           return res.status(201).json({
                success: true,
                message: "user created",
                data: newUser
            })
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }

}

const AdminLogin = async (req, res) => {
    try {
        const { email, password, employee_code } = req.body
        const user = await AdminUser.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        const checkPassword = await Bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "invalid Credential"
            })
        }

        const AccessToken = await JWT.sign(
            {
                adminId: user._id,
                adminEmail: user.email,
                employee_code: user.employee_code
            },
            process.env.ADMIN_JWT_SECRET_KEY,
            {
                expiresIn: '7d'
            }
        )

        res.cookie('token', AccessToken)

       return res.status(201).json({
            success: true,
            mesage: "user logged in..",
             AccessToken
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }



}

const AdminResetPasswordMail = async (req, res) => {
    try {
        const { email } = req.body
        const User = await AdminUser.findOne({  email })

        if (!User) {
           return res.status(404).json({
                message: "user not found, try another email"
            })
        }

        const Otp = generateOtp

        const mail = {
            from: process.env.EMAIL,
            to: User.email,
            subject: "OTP FOR RESET PASSWORD",
            text: `Your OTP for reset password is ${Otp}`

        }


        await Transporter.sendMail(mail)
        User.resetotp = Otp
        User.expiryotp = Date.now() + 5 * 60 * 1000

        await User.save()

        return res.status(200).json({message:"otP sent successfully"})
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "something went wrong" })
    }


}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const User = await AdminUser.findOne({ email })

        if (!User) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        if (!otp || otp !== User.resetotp || User.expiryotp < Date.now()) {
            return res.status(400).json({ message: "invalid OTP or OTP has expired" })
        }

        return res.status(200).json({ message: "otp verified successfully" })

        
    } catch (e) {
       return res.status(500).json({ mesage: "something went wrong" })
    }


}

const ChangePassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body
        const User = await AdminUser.findOne({ email })

        if (!User) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        if (!otp || otp !== User.resetotp || User.expiryotp < Date.now()) {
            return res.status(400).json({ message: "invalid otp or otp has expired" })
        }

        const hashPassword = await Bcrypt.hash(password, 10)

        User.password = hashPassword
        User.resetotp = null
        User.expiryotp = null

        await User.save()
       return res.status(200).json({ message: "password changed successfully" })
    } catch (error) {
       return res.status(500).json({ mesage: "something went wrong" })
    }

}

const AdminData = async (req,res)=>{
    const {email}=req.body
    const user = await AdminUser.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    return res.status(200).json({
        data:user
    })
}


module.exports = { AdminRegister, AdminLogin,AdminResetPasswordMail,verifyOtp,ChangePassword,AdminData }