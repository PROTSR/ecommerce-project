require('dotenv').config()
const mongoose = require('mongoose')
const UserModel = require('../models/User')
const Bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { generateOtp, Transporter } = require("../config/email")

const UserRegister = async (req, res) => {
    try {
        // 1. Include 'address' from req.body
        const { name, gender, address, email, password } = req.body

        // Basic validation check before querying DB
        if (!name || !gender || !address || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, gender, address, email, password) are required"
            })
        }

        const normalizedEmail = email.trim().toLowerCase()
        const existingUser = await UserModel.findOne({ email: normalizedEmail })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const salt = await Bcrypt.genSalt(10)
        const hashPassword = await Bcrypt.hash(password.trim(), salt)

        // 2. Pass 'address' into User.create()
        const newUser = await UserModel.create({
            name: name.trim(),
            gender,
            address: address.trim(),
            email: normalizedEmail,
            password: hashPassword
        })

        if (newUser) {
            return res.status(201).json({
                success: true,
                message: "User created",
                data: newUser
            })
        }
    } catch (e) {
        // Log the error to your terminal so you can inspect future issues
        console.error("UserRegister Error:", e)

        return res.status(500).json({
            success: false,
            message: e.message || "Something went wrong"
        })
    }
}

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }

        const normalizedEmail = email.trim().toLowerCase()
        const user = await UserModel.findOne({ email: normalizedEmail })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const checkPassword = await Bcrypt.compare(password.trim(), user.password)

        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const AccessToken = JWT.sign(
            {
                userId: user._id,
                userEmail: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '1h'
            }
        )
        // res.cookie('token', AccessToken)

        return res.status(200).json({
            success: true,
            message: "User logged in...",
            AccessToken
        })
    } catch (e) {
        console.error("UserLogin Error:", e)

        return res.status(500).json({
            success: false,
            message: e.message || "Something went wrong"
        })
    }
}

const ResetPasswordMail = async (req, res) => {
    try {
        const { email } = req.body
        const User = await UserModel.findOne({ email })

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

        return res.status(200).json({ message: "otP sent successfully" })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "something went wrong" })
    }


}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const User = await UserModel.findOne({ email })

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
        const User = await UserModel.findOne({ email })

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

const UserData = async (req, res) => {
    try {
        const { userId } = req.userInfo
        const user = await UserModel.findById( userId ).select('-password')

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        return res.status(200).json({
            data: user
        })
    } catch (error) {
        console.error("Error fetching user data:", error)
    
    // Handle invalid Mongoose ObjectId format specifically
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid user ID format" })
    }

    return res.status(500).json({ message: "Internal Server Error" })
    }

}

const UpdateData = async (req, res) => {
    try {
        const { userId } = req.userInfo
        const { password, _id, ...updatedData } = req.body


        const user = await UserModel.findByIdAndUpdate(userId, { $set: updatedData }, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        return res.status(200).json({ message: 'Data updated...' })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "error occured updating details"
        })
    }

}

module.exports = { UserRegister, UserLogin, ResetPasswordMail, verifyOtp, ChangePassword, UpdateData, UserData }