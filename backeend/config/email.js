require('dotenv').config()
const nodemailer = require('nodemailer')

const Transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

const generateOtp = Math.floor(100000 * Math.random() * 900000).toString()

module.exports = {generateOtp,Transporter}