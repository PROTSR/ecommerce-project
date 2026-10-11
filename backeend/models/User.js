const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["MALE", "FEMALE"]
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    resetotp: { type: String },
    expiryotp: { type: Date }
}, { timestamps: true })

module.exports = mongoose.model('User', User)