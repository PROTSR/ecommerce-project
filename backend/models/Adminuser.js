const mongoose = require('mongoose')


const AdminUser = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    employee_code:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        enum:["MALE","FEMALE"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    resetotp:{type:String},
    expiryotp:{type:Date}
},{ timestamps: true })

module.exports=mongoose.model('Admin_user',AdminUser)
